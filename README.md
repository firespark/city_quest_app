# Test Reality City Quest Application (Source Code)

## Requirements

* npm 8x

## Description

Source Code for Test Reality City Quest Application. 

It is interactive game, where players need to read riddles, recognise sightseeings and walk city tour. 

Done with React Native.

Android version only.


## Changelog

### 1.0
* Released: November 16, 2022

### 2.0
* Released: July 22, 2023

### 3.0
* Released: December 12, 2024

## Ветки и покупки

`master` повторяет `google-play`: Google Billing (квест, три подсказки, три пропуска). `rus` использует RuStore Pay и не показывает Instagram/Facebook. Общие экраны, исправления, Google/VK/Яндекс и изображения синхронизированы. SDK Expo в русской версии остаётся 52, в Google-версии — 54.

Сайт и приложение используют одинаковые официальные PNG Google, VK и Яндекса в `assets/img`. Кнопки входа сохранены; для VK и Яндекса добавлены изображения.

## Настройка входа и оплаты

Скопируй `.env.example` в `.env`, сохранив действующие значения. `EXPO_PUBLIC_API_URL` указывает на API Laravel. `EXPO_PUBLIC_WEBCLIENT_ID` — Google OAuth Web Client ID; `EXPO_PUBLIC_VK_CLIENT_ID` и `EXPO_PUBLIC_YANDEX_CLIENT_ID` — ID нативных Android-приложений. Их значения должны совпадать с `GOOGLE_WEB_CLIENT_ID`, `VK_CLIENT_ID`, `YANDEX_CLIENT_ID` в Laravel; серверный `AZP_KEY` для Android Google сохрани. `VK_CLIENT_SECRET` используется только нативной сборкой и не имеет префикса EXPO_PUBLIC_. OAuth IDs публичны; секрет VK по требованиям SDK попадает в Android manifest, поэтому APK не является хранилищем серверных секретов.

Ключи VK/Яндекса пока не найдены в локальной конфигурации: кнопки без ID отключены. Зарегистрируй Android package `com.gagara.quest`, SHA-отпечатки подписей и redirect URI, требуемые кабинетами провайдеров. После изменения нативных параметров пересобери Android-приложение; Expo Go не содержит эти нативные SDK. Значения для EAS сборки также добавь в окружение EAS. `app.config.js` читает настройки из окружения; `SocialAuth.js` переносит нативные параметры в генерируемые Gradle properties. Секретные значения не коммить.

RuStore: `RUSTORE_APP_ID` и `RUSTORE_SCHEME` задаются в `.env` приложения. Приватный ключ и key ID находятся только в Laravel: `RUSTORE_KEY_ID`, `RUSTORE_PRIVATE_KEY`, `RUSTORE_APP_ID`, `RUSTORE_ENVIRONMENT=production`. Выполни серверную миграцию `php artisan migrate` для таблицы обработанных платежей и `php artisan config:clear`. Покупки проверяются сервером по invoice ID, приложению, товару и успешному статусу; повторная отправка не выдаёт покупку дважды. Sandbox включается только явно через серверный .env.

Перед открытием оплаты Google приложение проверяет `GET /api/payments/status`: пока серверная проверка не реализована, окно Google-оплаты не открывается. RuStore сохраняет прежнюю последовательность: проверка доступности через нативный SDK → покупка → проверка invoice на API; новый endpoint статуса для RuStore не требуется. При обновлении серверной части сначала выложи PHP-изменения и настройки, затем приложение. Google SDK связан с реальной серверной проверкой Google Play Developer API. Google-покупка требует входа в постоянный аккаунт через Email, Google, VK или Яндекс: гостевой токен не используется как владелец оплаты. Перед оплатой сервер создаёт назначение покупки, привязанное к аккаунту, товару и квесту. Чек проверяется через purchases.productsv2; выдача записывается один раз. Только после успешной выдачи приложение завершает consumable-транзакцию. Незавершённые покупки повторно проверяются при подключении и перед новой оплатой. Старый эмулятор не подтверждает оплату.

## Подготовка Google Play к будущему запуску

Google-оплата сейчас выключена: в Laravel `GOOGLE_PLAY_BILLING_ENABLED=false`. География мерчанта — внешнее условие; код не снимает ограничения Play Console. Поддерживаемые страны проверяй по [официальной таблице Google](https://support.google.com/googleplay/android-developer/answer/9306917).

Все публичные идентификаторы и SKU вынесены в `.env`: `EXPO_PUBLIC_ANDROID_PACKAGE`, `EXPO_PUBLIC_EAS_PROJECT_ID`, OAuth ID и `EXPO_PUBLIC_GOOGLE_*_PRODUCT_ID` / `EXPO_PUBLIC_RUSTORE_*_PRODUCT_ID`. Существующие значения сохранены. `app.json` больше не содержит package name и EAS Project ID; их подставляет `app.config.js`. Для EAS укажи эти значения в окружении сборки.

На сервере укажи `GOOGLE_PLAY_PACKAGE_NAME`, `GOOGLE_PLAY_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PLAY_PRIVATE_KEY` (PEM; можно использовать буквальные \n), три `GOOGLE_PLAY_*_PRODUCT_ID`. Приватный ключ остаётся только в Laravel .env; никогда не используй для него EXPO_PUBLIC_ / VITE_. Public SKU приложения должны совпадать с серверными и Play Console. Google Android OAuth ID имеет понятное имя `GOOGLE_ANDROID_CLIENT_ID`; старый `AZP_KEY` читается как совместимый резервный параметр.

После получения подходящего мерчант-аккаунта: настрой продукты в Play Console и права service account для приложения, выполни серверные `composer install`, `php artisan migrate`, `php artisan config:clear`. Сначала проверь внутреннюю сборку лицензированным тестовым аккаунтом: серверные флаги `GOOGLE_PLAY_BILLING_ENABLED=true`, `GOOGLE_PLAY_ALLOW_TEST_PURCHASES=true` разрешают тестовые покупки. Проверь квесты, подсказки, пропуски, отмену, отложенный платёж и перезапуск после оплаты. Для рабочего окружения выставь `GOOGLE_PLAY_ALLOW_TEST_PURCHASES=false` и отдельно подтверди готовность всех настроек. Пока мерчанта нет, оставляй BILLING_ENABLED=false.

Реальные платежи и APK на устройстве пока не проверены. Перед боевым запуском также проверь актуальные уязвимости зависимостей через `composer audit`: текущая старая серверная база выдаёт предупреждения Composer. Обработка последующих возвратов и отзывов доступа требует отдельной настройки бизнес-правил и уведомлений Google.
