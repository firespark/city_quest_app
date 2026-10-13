const {
    withProjectBuildGradle,
    withAppBuildGradle,
    withAndroidManifest,
    withMainActivity,
    withMainApplication,
    withStringsXml
} = require('expo/config-plugins');

const withRuStore = (config, { scheme, appId }) => {

    config = withProjectBuildGradle(config, async config => {
        if (!config.modResults.contents.includes('maven-rustore-exposed')) {
            config.modResults.contents = config.modResults.contents.replace(
                /(allprojects\s*\{\s*repositories\s*\{[\s\S]*?)(\s*\})/,
                `$1\n        maven { url = uri("https://artifactory-external.vkpartner.ru/artifactory/maven-rustore-exposed/") }$2`
            );
        }
        return config;
    });

    config = withAppBuildGradle(config, async config => {
        let contents = config.modResults.contents;

        if (!contents.includes('ru.rustore.sdk-wrapper.react-native:pay')) {
            contents = contents.replace(
                /dependencies\s*\{/,
                `dependencies {\n    implementation("ru.rustore.sdk-wrapper.react-native:pay:10.3.1")`
            );
        }

        if (!contents.includes('-Xskip-metadata-version-check')) {
            contents += `\n\ntasks.withType(org.jetbrains.kotlin.gradle.tasks.KotlinCompile).configureEach {\n    kotlinOptions {\n        freeCompilerArgs += ["-Xskip-metadata-version-check"]\n    }\n}\n`;
        }

        config.modResults.contents = contents;
        return config;
    });

    config = withStringsXml(config, async config => {
        const strings = config.modResults.resources.string || [];
        if (!strings.some(s => s['$'].name === 'CONSOLE_APPLICATION_ID')) {
            strings.push({ '$': { name: 'CONSOLE_APPLICATION_ID' }, '_': String(appId) });
        }
        config.modResults.resources.string = strings;
        return config;
    });

    config = withAndroidManifest(config, async config => {
        const manifest = config.modResults.manifest;
        const app = manifest.application[0];

        app['meta-data'] = app['meta-data'] || [];
        if (!app['meta-data'].some(m => m['$']['android:name'] === 'sdk_pay_scheme_value')) {
            app['meta-data'].push({ '$': { 'android:name': 'sdk_pay_scheme_value', 'android:value': scheme } });
            app['meta-data'].push({ '$': { 'android:name': 'console_app_id_value', 'android:value': '@string/CONSOLE_APPLICATION_ID' } });
        }

        app.activity = app.activity || [];

        const mainActivity = app.activity.find(a => a['$']['android:name'] === '.MainActivity');
        if (mainActivity) {
            mainActivity['$']['android:launchMode'] = 'singleTop';

            mainActivity['intent-filter'] = mainActivity['intent-filter'] || [];
            const hasScheme = mainActivity['intent-filter'].some(filter =>
                filter.data && filter.data.some(d => d['$']['android:scheme'] === scheme)
            );

            if (!hasScheme) {
                mainActivity['intent-filter'].push({
                    action: [{ '$': { 'android:name': 'android.intent.action.VIEW' } }],
                    category: [
                        { '$': { 'android:name': 'android.intent.category.DEFAULT' } },
                        { '$': { 'android:name': 'android.intent.category.BROWSABLE' } }
                    ],
                    data: [{ '$': { 'android:scheme': scheme } }]
                });
            }
        }

        return config;
    });

    config = withMainApplication(config, async config => {
        let contents = config.modResults.contents;
        if (!contents.includes('RuStoreReactPayPackage')) {
            contents = contents.replace(
                /(package .*?\n)/,
                `$1\nimport ru.rustore.react.pay.RuStoreReactPayPackage\n`
            );

            contents = contents.replace(
                /val packages = PackageList\(this\)\.packages/,
                `val packages = PackageList(this).packages\n            packages.add(RuStoreReactPayPackage())`
            );
        }
        config.modResults.contents = contents;
        return config;
    });

    config = withMainActivity(config, async config => {
        let contents = config.modResults.contents;
        if (!contents.includes('RuStoreReactPayModule')) {
            contents = contents.replace(
                /(package .*?\n)/,
                `$1\nimport ru.rustore.react.pay.RuStoreReactPayModule\nimport android.content.Intent\n`
            );

            contents = contents.replace(
                /super\.onCreate\(null\)/,
                `super.onCreate(null)\n    if (savedInstanceState == null) {\n      handleIntent(intent)\n    }`
            );

            contents = contents.replace(
                /\}\s*$/,
                `\n  override fun onNewIntent(intent: Intent) {\n    super.onNewIntent(intent)\n    handleIntent(intent)\n  }\n\n  private fun handleIntent(intent: Intent?) {\n    intent?.let {\n      RuStoreReactPayModule.processIntent(it)\n    }\n  }\n}`
            );
        }
        config.modResults.contents = contents;
        return config;
    });

    return config;
};

module.exports = withRuStore;