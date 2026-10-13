package __APP_PACKAGE__.socialauth

import androidx.fragment.app.FragmentActivity
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleEventObserver
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.vk.id.AccessToken
import com.vk.id.VKID
import com.vk.id.VKIDAuthFail
import com.vk.id.auth.VKIDAuthCallback
import com.vk.id.auth.VKIDAuthParams
import com.yandex.authsdk.YandexAuthResult
import java.util.concurrent.atomic.AtomicReference
import java.util.concurrent.atomic.AtomicBoolean

class SocialAuthModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private class Attempt(val promise: Promise, val activity: FragmentActivity) {
        var observer: LifecycleEventObserver? = null
        var fragment: YandexAuthFragment? = null
    }

    private val pending = AtomicReference<Attempt?>(null)
    private val invalidated = AtomicBoolean(false)

    override fun getName(): String = "SocialAuth"

    private fun start(promise: Promise, launch: (Attempt) -> Unit) {
        if (invalidated.get()) {
            promise.reject("AUTH_INTERRUPTED", "Авторизация прервана. Повторите вход.")
            return
        }
        val activity = currentActivity as? FragmentActivity
        if (activity == null) {
            promise.reject("AUTH_NO_ACTIVITY", "Экран приложения недоступен")
            return
        }
        val attempt = Attempt(promise, activity)
        if (!pending.compareAndSet(null, attempt)) {
            promise.reject("AUTH_IN_PROGRESS", "Авторизация уже выполняется")
            return
        }
        activity.runOnUiThread {
            if (pending.get() !== attempt) return@runOnUiThread
            if (invalidated.get()) {
                reject(attempt, "AUTH_INTERRUPTED", "Авторизация прервана. Повторите вход.")
                return@runOnUiThread
            }
            if (activity.isFinishing || activity.isDestroyed ||
                !activity.lifecycle.currentState.isAtLeast(Lifecycle.State.RESUMED)) {
                reject(attempt, "AUTH_INTERRUPTED", "Экран изменился. Повторите вход.")
                return@runOnUiThread
            }
            val observer = LifecycleEventObserver { _, event ->
                if (event == Lifecycle.Event.ON_DESTROY) {
                    reject(attempt, "AUTH_INTERRUPTED", "Авторизация прервана. Повторите вход.")
                }
            }
            attempt.observer = observer
            activity.lifecycle.addObserver(observer)
            try {
                launch(attempt)
            } catch (error: Exception) {
                reject(attempt, "AUTH_FAILED", "Не удалось запустить авторизацию. Повторите вход.")
            }
        }
    }

    private fun finish(attempt: Attempt, complete: () -> Unit) {
        // Late callbacks from an old Activity must not finish a newer login.
        if (!pending.compareAndSet(attempt, null)) return
        attempt.activity.runOnUiThread {
            attempt.observer?.let { attempt.activity.lifecycle.removeObserver(it) }
            attempt.observer = null
            attempt.fragment?.let { fragment ->
                fragment.clearHandler()
                val manager = attempt.activity.supportFragmentManager
                if (fragment.isAdded && !manager.isDestroyed) {
                    manager.beginTransaction().remove(fragment).commitAllowingStateLoss()
                }
            }
            attempt.fragment = null
        }
        complete()
    }

    private fun reject(attempt: Attempt, code: String, message: String) =
        finish(attempt) { attempt.promise.reject(code, message) }

    private fun resolve(attempt: Attempt, token: String) = finish(attempt) {
        attempt.promise.resolve(Arguments.createMap().apply { putString("accessToken", token) })
    }

    @ReactMethod
    fun loginVk(promise: Promise) = start(promise) { attempt ->
        VKID.instance.authorize(
            lifecycleOwner = attempt.activity,
            callback = object : VKIDAuthCallback {
                override fun onAuth(accessToken: AccessToken) = resolve(attempt, accessToken.token)
                override fun onFail(fail: VKIDAuthFail) {
                    if (fail is VKIDAuthFail.Canceled) {
                        reject(attempt, "AUTH_CANCELLED", "Авторизация VK отменена")
                    } else {
                        reject(attempt, "VK_AUTH_FAILED", "Не удалось войти через VK")
                    }
                }
            },
            params = VKIDAuthParams { scopes = setOf("email") }
        )
    }

    @ReactMethod
    fun loginYandex(promise: Promise) = start(promise) { attempt ->
        val manager = attempt.activity.supportFragmentManager
        if (manager.isStateSaved) {
            reject(attempt, "AUTH_INTERRUPTED", "Экран изменился. Повторите вход.")
        } else {
            val fragment = YandexAuthFragment()
            attempt.fragment = fragment
            manager.beginTransaction().add(fragment, "SocialAuthYandex").commitNow()
            fragment.authorize { result ->
                when (result) {
                    is YandexAuthResult.Success -> resolve(attempt, result.token.value)
                    is YandexAuthResult.Failure -> reject(attempt, "YANDEX_AUTH_FAILED", "Не удалось войти через Яндекс")
                    YandexAuthResult.Cancelled -> reject(attempt, "AUTH_CANCELLED", "Авторизация Яндекс отменена")
                }
            }
        }
    }

    override fun invalidate() {
        invalidated.set(true)
        pending.get()?.let { reject(it, "AUTH_INTERRUPTED", "Авторизация прервана. Повторите вход.") }
        super.invalidate()
    }
}
