package dev.webhunt.android.ui.auth

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import dev.webhunt.android.data.model.SessionResponse
import dev.webhunt.android.data.network.ApiClient
import dev.webhunt.android.data.network.ApiException
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class AuthViewModel @Inject constructor(
    private val apiClient: ApiClient
) : ViewModel() {

    var currentUser by mutableStateOf<SessionResponse?>(null)
        private set
    var isAuthenticated by mutableStateOf(false)
        private set
    var isLoading by mutableStateOf(false)
        private set
    var errorMessage by mutableStateOf<String?>(null)

    // Login fields
    var loginUsername by mutableStateOf("")
    var loginPassword by mutableStateOf("")

    // Signup fields
    var signupUsername by mutableStateOf("")
    var signupEmail by mutableStateOf("")
    var signupPassword by mutableStateOf("")

    fun login() {
        if (loginUsername.isBlank() || loginPassword.isBlank()) {
            errorMessage = "Please fill in all fields"
            return
        }

        viewModelScope.launch {
            isLoading = true
            errorMessage = null
            try {
                val user = apiClient.login(loginUsername, loginPassword)
                currentUser = user
                isAuthenticated = true
                loginUsername = ""
                loginPassword = ""
            } catch (e: ApiException) {
                errorMessage = e.message
            } catch (e: Exception) {
                errorMessage = e.localizedMessage ?: "Login failed"
            }
            isLoading = false
        }
    }

    fun signup() {
        if (signupUsername.isBlank() || signupEmail.isBlank() || signupPassword.isBlank()) {
            errorMessage = "Please fill in all fields"
            return
        }
        if (signupPassword.length < 6) {
            errorMessage = "Password must be at least 6 characters"
            return
        }

        viewModelScope.launch {
            isLoading = true
            errorMessage = null
            try {
                val user = apiClient.signup(signupUsername, signupEmail, signupPassword)
                currentUser = user
                isAuthenticated = true
                signupUsername = ""
                signupEmail = ""
                signupPassword = ""
            } catch (e: ApiException) {
                errorMessage = e.message
            } catch (e: Exception) {
                errorMessage = e.localizedMessage ?: "Signup failed"
            }
            isLoading = false
        }
    }

    fun logout() {
        viewModelScope.launch {
            try {
                apiClient.logout()
            } catch (_: Exception) {
                // Log out locally even if network fails
            }
            currentUser = null
            isAuthenticated = false
        }
    }
}
