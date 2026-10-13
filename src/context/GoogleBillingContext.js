import { createContext, useCallback, useContext, useEffect, useRef } from 'react'
import { useIAP, ErrorCode } from 'expo-iap'

const GoogleBillingContext = createContext(null)

const PRODUCT_IDS = [
    'quest_ticket',
    'hints_pack_3',
    'skips_pack_3',
]

export const GoogleBillingProvider = ({ children }) => {
    const pendingPurchase = useRef(null)

    const {
        connected,
        products,
        fetchProducts,
        requestPurchase,
        finishTransaction,
    } = useIAP({
        onPurchaseSuccess: (purchase) => {
            const pending = pendingPurchase.current

            if (!pending) {
                console.warn('Google Play: пришла покупка без ожидающего запроса', purchase)
                return
            }

            if (pending.productId !== purchase.productId) {
                console.warn(
                    'Google Play: ожидался товар',
                    pending.productId,
                    'а пришёл',
                    purchase.productId
                )
                return
            }

            pendingPurchase.current = null
            pending.resolve(purchase)
        },

        onPurchaseError: (error) => {
            const pending = pendingPurchase.current

            if (!pending) return

            pendingPurchase.current = null
            pending.reject(error)
        },

        onError: (error) => {
            console.error('Google Play Billing:', error)
        },
    })

    useEffect(() => {
        if (!connected) return

        fetchProducts({
            skus: PRODUCT_IDS,
            type: 'in-app',
        }).catch((error) => {
            console.error('Не удалось получить товары Google Play:', error)
        })
    }, [connected, fetchProducts])

    const buyProduct = useCallback((productId) => {
        return new Promise((resolve, reject) => {
            if (!connected) {
                reject(new Error('Google Play Billing ещё не подключён'))
                return
            }

            const productExists = products.some((product) => product.id === productId)

            if (!productExists) {
                reject(new Error(`Товар ${productId} не найден в Google Play`))
                return
            }

            if (pendingPurchase.current) {
                reject(new Error('Другая покупка уже выполняется'))
                return
            }

            pendingPurchase.current = {
                productId,
                resolve,
                reject,
            }

            requestPurchase({
                request: {
                    google: {
                        skus: [productId],
                    },
                },
                type: 'in-app',
            }).catch((error) => {
                if (pendingPurchase.current?.productId === productId) {
                    pendingPurchase.current = null
                }

                reject(error)
            })
        })
    }, [connected, products, requestPurchase])

    const finishConsumable = useCallback(async (purchase) => {
        await finishTransaction({
            purchase,
            isConsumable: true,
        })
    }, [finishTransaction])

    return (
        <GoogleBillingContext.Provider
            value={{
                connected,
                products,
                buyProduct,
                finishConsumable,
            }}
        >
            {children}
        </GoogleBillingContext.Provider>
    )
}

export const useGoogleBilling = () => {
    const context = useContext(GoogleBillingContext)

    if (!context) {
        throw new Error('useGoogleBilling используется вне GoogleBillingProvider')
    }

    return context
}

export { ErrorCode }