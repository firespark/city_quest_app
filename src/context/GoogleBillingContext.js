import { createContext, useCallback, useContext, useEffect, useRef } from 'react'
import { useIAP, getAvailablePurchases, ErrorCode } from 'expo-iap'
import { MainContext } from './mainContext'
import { BILLING_PRODUCTS } from '../config/billing'
import { Http } from '../scripts/http'
import { ensureStoreBilling } from '../scripts/billing'

const GoogleBillingContext = createContext(null)
const PRODUCT_IDS = Object.values(BILLING_PRODUCTS.google).filter(Boolean)

export const GoogleBillingProvider = ({ children }) => {
    const { token } = useContext(MainContext)
    const tokenRef = useRef(token)
    const pendingPurchase = useRef(null)
    const startingPurchase = useRef(false)
    const inFlight = useRef(new Map())
    const finished = useRef(new Set())
    useEffect(() => { tokenRef.current = token }, [token])

    const { connected, products, fetchProducts, requestPurchase, finishTransaction } = useIAP({
        onPurchaseSuccess: purchase => {
            const pending = pendingPurchase.current
            const profile = purchase.obfuscatedProfileIdAndroid
            const matches = pending && pending.productId === purchase.productId && (!profile || profile === pending.intentId)
            if (purchase.purchaseState !== 'purchased') {
                if (matches && purchase.purchaseState === 'pending') {
                    pendingPurchase.current = null
                    pending.reject(new Error('Платёж ожидает подтверждения Google Play. Покупка появится после подтверждения.'))
                }
                return
            }
            void completePurchase(purchase, matches ? pending : null).then(output => {
                if (matches && pendingPurchase.current === pending) {
                    pendingPurchase.current = null
                    pending.resolve(output)
                }
            }).catch(error => {
                if (matches && pendingPurchase.current === pending) {
                    pendingPurchase.current = null
                    pending.reject(error)
                } else console.warn('Google Play: незавершённая покупка будет проверена повторно')
            })
        },
        onPurchaseError: error => {
            const pending = pendingPurchase.current
            if (pending) { pendingPurchase.current = null; pending.reject(error) }
        },
        onError: error => {
            const pending = pendingPurchase.current
            if (pending) { pendingPurchase.current = null; pending.reject(error) }
        },
    })

    // The server grants access before consumption. Failed consumption can safely retry:
    // the server records each receipt once, and Play retains unfinished purchases.
    const completePurchase = useCallback((purchase, pending = null) => {
        const purchaseToken = purchase.purchaseToken
        if (!purchaseToken || purchase.purchaseState !== 'purchased') return Promise.reject(new Error('Покупка ещё не подтверждена'))
        if (finished.current.has(purchaseToken)) return Promise.resolve(null)
        if (inFlight.current.has(purchaseToken)) return inFlight.current.get(purchaseToken)
        const intentId = purchase.obfuscatedProfileIdAndroid || pending?.intentId
        const authToken = pending?.token || tokenRef.current
        if (!intentId || !authToken) return Promise.reject(new Error('Войди в аккаунт, в котором была начата покупка'))
        const promise = (async () => {
            const output = await Http.post(`${process.env.EXPO_PUBLIC_API_URL}/payments/google/complete`, {
                purchase_token: purchaseToken, intent_id: intentId,
            }, authToken)
            if (output.success !== 1) throw new Error(output.error || 'Не удалось подтвердить покупку. Попробуй снова.')
            try {
                await finishTransaction({ purchase, isConsumable: true })
                finished.current.add(purchaseToken)
            } catch {
                console.warn('Google Play: доступ выдан, завершение транзакции будет повторено')
            }
            return output
        })().finally(() => { inFlight.current.delete(purchaseToken) })
        inFlight.current.set(purchaseToken, promise)
        return promise
    }, [finishTransaction])

    const restorePurchases = useCallback(async (failOnError = false) => {
        const purchases = await getAvailablePurchases()
        const restored = []
        for (const purchase of purchases) {
            if (purchase.purchaseState !== 'purchased' || !PRODUCT_IDS.includes(purchase.productId)) continue
            try {
                const output = await completePurchase(purchase)
                if (output) restored.push(output)
            } catch (error) {
                if (failOnError) throw error
                console.warn('Google Play: покупка сохранена для повторной проверки')
            }
        }
        return restored
    }, [completePurchase])

    useEffect(() => {
        if (!connected || !token) return
        let active = true
        void (async () => {
            const status = await Http.get(`${process.env.EXPO_PUBLIC_API_URL}/payments/status`, token)
            if (!active || status.success !== 1 || status.data?.google !== true) return
            await fetchProducts({ skus: PRODUCT_IDS, type: 'in-app' })
            if (active) await restorePurchases()
        })().catch(() => { console.warn('Google Play: не удалось загрузить покупки') })
        return () => { active = false }
    }, [connected, token, fetchProducts, restorePurchases])

    useEffect(() => () => {
        const pending = pendingPurchase.current
        if (pending) { pendingPurchase.current = null; pending.reject({ code: ErrorCode.UserCancelled }) }
    }, [])

    const buyProduct = useCallback(async (purpose, targetId, authToken) => {
        if (startingPurchase.current || pendingPurchase.current) throw new Error('Другая покупка уже выполняется')
        startingPurchase.current = true
        try {
            if (!connected) throw new Error('Google Play Billing ещё не подключён')
            await ensureStoreBilling('google', authToken)
            const restored = await restorePurchases(true)
            const existing = restored.find(item => item.purchase_context?.purpose === purpose && Number(item.purchase_context?.target_id) === Number(targetId))
            if (existing) return existing
            const productId = BILLING_PRODUCTS.google[purpose]
            if (!productId || !products.some(product => product.id === productId)) throw new Error('Товар не найден в Google Play')
            const output = await Http.post(`${process.env.EXPO_PUBLIC_API_URL}/payments/google/intent`, {
                purpose, target_id: targetId,
            }, authToken)
            const intent = output.data
            if (output.success !== 1) throw new Error(output.error || 'Не удалось подготовить покупку')
            if (intent?.product_id !== productId || !intent?.intent_id || !intent?.account_id) throw new Error('Настройки товара в приложении и на сервере не совпадают')
            return await new Promise((resolve, reject) => {
                pendingPurchase.current = { productId, intentId: intent.intent_id, token: authToken, resolve, reject }
                requestPurchase({ request: { google: {
                    skus: [productId], obfuscatedAccountId: intent.account_id, obfuscatedProfileId: intent.intent_id,
                } }, type: 'in-app' }).catch(error => {
                    if (pendingPurchase.current?.intentId === intent.intent_id) pendingPurchase.current = null
                    reject(error)
                })
            })
        } finally { startingPurchase.current = false }
    }, [connected, products, requestPurchase, restorePurchases])

    return <GoogleBillingContext.Provider value={{ connected, products, buyProduct }}>{children}</GoogleBillingContext.Provider>
}

export const useGoogleBilling = () => {
    const context = useContext(GoogleBillingContext)
    if (!context) throw new Error('useGoogleBilling используется вне GoogleBillingProvider')
    return context
}

export { ErrorCode }
