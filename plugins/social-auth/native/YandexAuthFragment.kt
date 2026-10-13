package __APP_PACKAGE__.socialauth

import androidx.activity.result.ActivityResultLauncher
import androidx.fragment.app.Fragment
import com.yandex.authsdk.YandexAuthLoginOptions
import com.yandex.authsdk.YandexAuthOptions
import com.yandex.authsdk.YandexAuthResult
import com.yandex.authsdk.YandexAuthSdk

internal class YandexAuthFragment : Fragment() {
    private lateinit var authLauncher: ActivityResultLauncher<YandexAuthLoginOptions>
    private var resultHandler: ((YandexAuthResult) -> Unit)? = null

    override fun onCreate(savedInstanceState: android.os.Bundle?) {
        super.onCreate(savedInstanceState)

        val sdk = YandexAuthSdk.create(YandexAuthOptions(requireContext()))
        authLauncher = registerForActivityResult(sdk.contract) { result ->
            val handler = resultHandler
            resultHandler = null
            handler?.invoke(result)
        }
    }

    fun authorize(handler: (YandexAuthResult) -> Unit) {
        resultHandler = handler
        authLauncher.launch(YandexAuthLoginOptions())
    }

    fun clearHandler() {
        resultHandler = null
    }

    override fun onDestroy() {
        val handler = resultHandler
        resultHandler = null
        handler?.invoke(YandexAuthResult.Cancelled)
        super.onDestroy()
    }

    companion object {
        const val TAG = "SocialAuthYandexFragment"
    }
}
