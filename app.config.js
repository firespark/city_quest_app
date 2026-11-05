const base = require('./app.json').expo
const googleClientId = process.env.EXPO_PUBLIC_WEBCLIENT_ID?.trim() || ''
const iosUrlScheme = process.env.GOOGLE_IOS_URL_SCHEME?.trim() || (googleClientId ? 'com.googleusercontent.apps.' + googleClientId.replace(/\.apps\.googleusercontent\.com$/, '') : '')
module.exports = {
    ...base,
    android: { ...base.android, package: process.env.EXPO_PUBLIC_ANDROID_PACKAGE?.trim() || '' },
    extra: { ...base.extra, eas: { projectId: process.env.EXPO_PUBLIC_EAS_PROJECT_ID?.trim() || '' } },
    plugins: [
        ...base.plugins,
        ['@react-native-google-signin/google-signin', iosUrlScheme ? { iosUrlScheme } : {}],
        './SocialAuth.js',
        ['expo-build-properties', { android: { kotlinVersion: '1.9.25', compileSdkVersion: 34 } }],
        ['./RuStore.js', { appId: process.env.RUSTORE_APP_ID?.trim() || '', scheme: process.env.RUSTORE_SCHEME?.trim() || '' }],
    ],
}
