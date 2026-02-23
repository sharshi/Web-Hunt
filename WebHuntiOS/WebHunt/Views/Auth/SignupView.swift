import SwiftUI

struct SignupView: View {
    @EnvironmentObject var authViewModel: AuthViewModel
    @Environment(\.dismiss) private var dismiss
    var switchToLogin: () -> Void

    var body: some View {
        VStack(spacing: 24) {
            Spacer()

            // Logo area
            VStack(spacing: 8) {
                Image(systemName: "w.circle.fill")
                    .font(.system(size: 72))
                    .foregroundStyle(.orange)
                Text("Join Web Hunt")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                Text("Share and discover the best tech tools")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
            }

            Spacer()

            // Form
            VStack(spacing: 16) {
                TextField("Username", text: $authViewModel.signupUsername)
                    .textFieldStyle(.roundedBorder)
                    .textContentType(.username)
                    .autocapitalization(.none)
                    .autocorrectionDisabled()

                TextField("Email", text: $authViewModel.signupEmail)
                    .textFieldStyle(.roundedBorder)
                    .textContentType(.emailAddress)
                    .autocapitalization(.none)
                    .autocorrectionDisabled()
                    .keyboardType(.emailAddress)

                SecureField("Password (min 6 characters)", text: $authViewModel.signupPassword)
                    .textFieldStyle(.roundedBorder)
                    .textContentType(.newPassword)

                if let error = authViewModel.errorMessage {
                    Text(error)
                        .font(.caption)
                        .foregroundColor(.red)
                        .multilineTextAlignment(.center)
                }

                Button {
                    Task {
                        await authViewModel.signup()
                        if authViewModel.isAuthenticated {
                            dismiss()
                        }
                    }
                } label: {
                    if authViewModel.isLoading {
                        ProgressView()
                            .tint(.white)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 8)
                    } else {
                        Text("Create Account")
                            .fontWeight(.semibold)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 8)
                    }
                }
                .buttonStyle(.borderedProminent)
                .tint(.orange)
                .disabled(authViewModel.isLoading)
            }
            .padding(.horizontal, 32)

            Spacer()

            // Switch to login
            HStack {
                Text("Already have an account?")
                    .foregroundColor(.secondary)
                Button("Log In") {
                    authViewModel.errorMessage = nil
                    switchToLogin()
                }
                .foregroundColor(.orange)
                .fontWeight(.semibold)
            }
            .font(.subheadline)
            .padding(.bottom, 24)
        }
        .navigationTitle("Sign Up")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .navigationBarLeading) {
                Button("Cancel") { dismiss() }
            }
        }
    }
}
