export const SOCIAL_AUTH = {
    google: process.env.EXPO_PUBLIC_WEBCLIENT_ID?.trim() || '',
    vk: process.env.EXPO_PUBLIC_VK_CLIENT_ID?.trim() || '',
    yandex: process.env.EXPO_PUBLIC_YANDEX_CLIENT_ID?.trim() || '',
}
