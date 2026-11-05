export const BILLING_PRODUCTS = {
    google: {
        quest: process.env.EXPO_PUBLIC_GOOGLE_QUEST_PRODUCT_ID?.trim() || '',
        hints: process.env.EXPO_PUBLIC_GOOGLE_HINTS_PRODUCT_ID?.trim() || '',
        skips: process.env.EXPO_PUBLIC_GOOGLE_SKIPS_PRODUCT_ID?.trim() || '',
    },
    rustore: {
        quest: process.env.EXPO_PUBLIC_RUSTORE_QUEST_PRODUCT_ID?.trim() || '',
        hints: process.env.EXPO_PUBLIC_RUSTORE_HINTS_PRODUCT_ID?.trim() || '',
        skips: process.env.EXPO_PUBLIC_RUSTORE_SKIPS_PRODUCT_ID?.trim() || '',
    },
}
