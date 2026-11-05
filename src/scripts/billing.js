import { Http } from './http'

export const ensureStoreBilling = async (store, token) => {
    const output = await Http.get(`${process.env.EXPO_PUBLIC_API_URL}/payments/status`, token)
    if (output.success !== 1 || output.data?.[store] !== true) {
        throw new Error(store === 'google'
            ? 'Покупки через Google Play пока не настроены'
            : 'Покупки через RuStore пока недоступны')
    }
}
