package dev.webhunt.android

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import dagger.hilt.android.AndroidEntryPoint
import dev.webhunt.android.ui.navigation.WebHuntNavigation
import dev.webhunt.android.ui.theme.WebHuntTheme

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            WebHuntTheme {
                WebHuntNavigation()
            }
        }
    }
}
