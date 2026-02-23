import Foundation
import SwiftUI

@MainActor
final class AuthViewModel: ObservableObject {
    @Published var currentUser: SessionResponse?
    @Published var isAuthenticated = false
    @Published var isLoading = false
    @Published var errorMessage: String?

    // Login fields
    @Published var loginUsername = ""
    @Published var loginPassword = ""

    // Signup fields
    @Published var signupUsername = ""
    @Published var signupEmail = ""
    @Published var signupPassword = ""

    private let api = APIClient.shared

    func login() async {
        guard !loginUsername.isEmpty, !loginPassword.isEmpty else {
            errorMessage = "Please fill in all fields"
            return
        }

        isLoading = true
        errorMessage = nil

        do {
            let user = try await api.login(username: loginUsername, password: loginPassword)
            currentUser = user
            isAuthenticated = true
            loginUsername = ""
            loginPassword = ""
        } catch let error as APIError {
            errorMessage = error.errorDescription
        } catch {
            errorMessage = error.localizedDescription
        }

        isLoading = false
    }

    func signup() async {
        guard !signupUsername.isEmpty, !signupEmail.isEmpty, !signupPassword.isEmpty else {
            errorMessage = "Please fill in all fields"
            return
        }

        guard signupPassword.count >= 6 else {
            errorMessage = "Password must be at least 6 characters"
            return
        }

        isLoading = true
        errorMessage = nil

        do {
            let user = try await api.signup(
                username: signupUsername,
                email: signupEmail,
                password: signupPassword
            )
            currentUser = user
            isAuthenticated = true
            signupUsername = ""
            signupEmail = ""
            signupPassword = ""
        } catch let error as APIError {
            errorMessage = error.errorDescription
        } catch {
            errorMessage = error.localizedDescription
        }

        isLoading = false
    }

    func logout() async {
        do {
            try await api.logout()
        } catch {
            // Log out locally even if network fails
        }
        currentUser = nil
        isAuthenticated = false
    }
}
