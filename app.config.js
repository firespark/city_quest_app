// EAS disables Expo's automatic dotenv loading while reading this config.
require('dotenv').config({ path: require('node:path').join(__dirname, '.env') })

const base = require('./app.json').expo
const googleClientId = process.env.EXPO_PUBLIC_WEBCLIENT_ID?.trim() || ''
const iosUrlScheme = process.env.GOOGLE_IOS_URL_SCHEME?.trim() || (googleClientId ? 'com.googleusercontent.apps.' + googleClientId.replace(/\.apps\.googleusercontent\.com$/, '') : '')
module.exports = {
    ...base,
    android: {
        ...base.android,
        package: process.env.EXPO_PUBLIC_ANDROID_PACKAGE?.trim() || '',
        permissions: [...(base.android.permissions || []), 'android.permission.HIGH_SAMPLING_RATE_SENSORS'],
        blockedPermissions: [...(base.android.blockedPermissions || []), 'android.permission.RECORD_AUDIO'],
    },
    extra: { ...base.extra, eas: { projectId: process.env.EXPO_PUBLIC_EAS_PROJECT_ID?.trim() || '' } },
    plugins: [
        ...base.plugins,
        ['expo-camera', { cameraPermission: 'Разреши доступ к камере для поиска AR-надписей.', microphonePermission: false, recordAudioAndroid: false }],
        ['expo-sensors', { motionPermission: 'Разреши доступ к датчикам движения для AR-режима.' }],
        ['expo-location', { locationWhenInUsePermission: 'Разреши доступ к местоположению для поиска AR-точек.', locationAlwaysPermission: false, locationAlwaysAndWhenInUsePermission: false, isAndroidBackgroundLocationEnabled: false, isAndroidForegroundServiceEnabled: false }],
        ['@react-native-google-signin/google-signin', iosUrlScheme ? { iosUrlScheme } : {}],
        './SocialAuth.js',
        ['expo-build-properties', { android: { kotlinVersion: '1.9.25', compileSdkVersion: 34 } }],
        ['./RuStore.js', { appId: process.env.RUSTORE_APP_ID?.trim() || '', scheme: process.env.RUSTORE_SCHEME?.trim() || '' }],
    ],
}
