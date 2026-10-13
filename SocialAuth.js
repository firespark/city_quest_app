const fs = require('fs');
const path = require('path');
const {
    withAppBuildGradle,
    withDangerousMod,
    withMainApplication,
    withProjectBuildGradle,
} = require('expo/config-plugins');

const VK_ID_SDK_VERSION = '2.7.2';
const YANDEX_LOGIN_SDK_VERSION = '3.1.3';

const VK_MAVEN_REPOSITORIES = [
    'https://artifactory-external.vkpartner.ru/artifactory/vkid-sdk-android/',
    'https://artifactory-external.vkpartner.ru/artifactory/maven/',
    'https://artifactory-external.vkpartner.ru/artifactory/vk-id-captcha/android/',
];

const RUSTORE_MAVEN_REPOSITORY =
    'https://artifactory-external.vkpartner.ru/artifactory/maven-rustore-exposed/';

const addVkRepositories = contents => {
    if (VK_MAVEN_REPOSITORIES.every(url => contents.includes(url))) return contents;

    const hasRuStoreRepository = contents.includes(RUSTORE_MAVEN_REPOSITORY);
    let result = contents.replace(
        /\s*maven\s*\{\s*url\s*=\s*uri\("https:\/\/artifactory-external\.vkpartner\.ru\/artifactory\/maven-rustore-exposed\/"\)\s*\}/,
        ''
    );

    const repositoryUrls = hasRuStoreRepository
        ? [RUSTORE_MAVEN_REPOSITORY, ...VK_MAVEN_REPOSITORIES]
        : VK_MAVEN_REPOSITORIES;
    const repositories = repositoryUrls.filter(url => !result.includes(url))
        .map(url => `        maven { url = uri("${url}") }`)
        .join('\n');

    result = result.replace(
        /(allprojects\s*\{\s*repositories\s*\{)/,
        `$1\n${repositories}`
    );

    if (!VK_MAVEN_REPOSITORIES.every(url => result.includes(url))) {
        throw new Error('SocialAuth could not locate allprojects.repositories in project build.gradle');
    }

    return result;
};

const addNativeDependenciesAndConfig = contents => {
    let result = contents;

    for (const [dependency, version] of [
        ['com.vk.id:vkid', VK_ID_SDK_VERSION],
        ['com.yandex.android:authsdk', YANDEX_LOGIN_SDK_VERSION],
    ]) {
        if (!result.includes(`${dependency}:`)) {
            result = result.replace(/dependencies\s*\{/, `dependencies {\n    implementation("${dependency}:${version}")`);
        }
    }

    if (!result.includes('SOCIAL_AUTH_ANDROID_CONFIG')) {
        const buildConfig = `// SOCIAL_AUTH_ANDROID_CONFIG
def socialAuthBuildValue = { String name ->
    def value = project.findProperty(name) ?: System.getenv(name)
    if (value == null || value.toString().trim().isEmpty()) {
        throw new GradleException("Missing Android build value: " + name)
    }
    return value.toString().trim()
}

def vkClientId = socialAuthBuildValue("VK_CLIENT_ID")
def vkClientSecret = socialAuthBuildValue("VK_CLIENT_SECRET")
def yandexClientId = socialAuthBuildValue("YANDEX_CLIENT_ID")

`;

        result = result.replace(/android\s*\{/, `${buildConfig}android {`);
        result = result.replace(
            /defaultConfig\s*\{/,
            `defaultConfig {
        manifestPlaceholders["VKIDClientID"] = vkClientId
        manifestPlaceholders["VKIDClientSecret"] = vkClientSecret
        manifestPlaceholders["VKIDRedirectHost"] = "vk.ru"
        manifestPlaceholders["VKIDRedirectScheme"] = "vk" + vkClientId
        manifestPlaceholders["YANDEX_CLIENT_ID"] = yandexClientId`
        );
    }

    for (const marker of ['com.vk.id:vkid:', 'com.yandex.android:authsdk:',
        'def socialAuthBuildValue', 'manifestPlaceholders["VKIDClientID"]',
        'manifestPlaceholders["VKIDClientSecret"]', 'manifestPlaceholders["YANDEX_CLIENT_ID"]']) {
        if (!result.includes(marker)) throw new Error(`SocialAuth could not configure app build.gradle: ${marker}`);
    }
    return result;
};

const configureMainApplication = (contents, packageName) => {
    let result = contents;
    const packageImport = `${packageName}.socialauth.SocialAuthPackage`;

    if (!result.includes(packageImport)) {
        result = result.replace(
            /(package .*?\n)/,
            `$1\nimport ${packageImport}\n`
        );
    }

    if (!result.includes('import com.vk.id.VKID')) {
        result = result.replace(/(package .*?\n)/, '$1\nimport com.vk.id.VKID\n');
    }

    if (!result.includes('packages.add(SocialAuthPackage())')) {
        result = result.replace(
            /val packages = PackageList\(this\)\.packages/,
            `val packages = PackageList(this).packages\n            packages.add(SocialAuthPackage())`
        );
    }

    if (!result.includes('VKID.init(this)')) {
        result = result.replace(
            /super\.onCreate\(\)/,
            `super.onCreate()\n    VKID.init(this)`
        );
    }

    for (const marker of [packageImport, 'import com.vk.id.VKID', 'packages.add(SocialAuthPackage())', 'VKID.init(this)']) {
        if (!result.includes(marker)) throw new Error(`SocialAuth could not configure MainApplication: ${marker}`);
    }
    return result;
};

const copyNativeSources = (projectRoot, packageName) => {
    const sourceDirectory = path.join(projectRoot, 'plugins', 'social-auth', 'native');
    const destinationDirectory = path.join(
        projectRoot,
        'android',
        'app',
        'src',
        'main',
        'java',
        ...packageName.split('.'),
        'socialauth'
    );

    fs.mkdirSync(destinationDirectory, { recursive: true });

    for (const fileName of ['SocialAuthModule.kt', 'SocialAuthPackage.kt', 'YandexAuthFragment.kt']) {
        const source = fs
            .readFileSync(path.join(sourceDirectory, fileName), 'utf8')
            .replaceAll('__APP_PACKAGE__', packageName);

        fs.writeFileSync(path.join(destinationDirectory, fileName), source);
    }
};

const withSocialAuth = config => {
    const packageName = config.android?.package;
    if (!packageName) {
        throw new Error('SocialAuth requires expo.android.package');
    }

    config = withProjectBuildGradle(config, modConfig => {
        modConfig.modResults.contents = addVkRepositories(modConfig.modResults.contents);
        return modConfig;
    });

    config = withAppBuildGradle(config, modConfig => {
        modConfig.modResults.contents = addNativeDependenciesAndConfig(modConfig.modResults.contents);
        return modConfig;
    });

    config = withMainApplication(config, modConfig => {
        modConfig.modResults.contents = configureMainApplication(
            modConfig.modResults.contents,
            packageName
        );
        return modConfig;
    });

    config = withDangerousMod(config, [
        'android',
        async modConfig => {
            copyNativeSources(modConfig.modRequest.projectRoot, packageName);
            return modConfig;
        },
    ]);

    return config;
};

module.exports = withSocialAuth;
