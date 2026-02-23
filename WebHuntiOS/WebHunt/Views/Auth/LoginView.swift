import SwiftUI

struct LoginView: View {
    @EnvironmentObject var authViewModel: AuthViewModel
    @Environment(\.dismiss) private var dismiss
    var switchToSignup: () -> Void

    var body: some View {
        VStack(spacing: 24) {
            Spacer()

            // Logo area
            VStack(spacing: 8) {
                Image(systemName: "w.circle.fill")
                    .font(.system(size: 72))
                    .foregroundStyle(.orange)
                Text("Web Hunt")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                Text("Discover your next favorite tool")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
            }

            Spacer()

            // Form
            VStack(spacing: 16) {
                TextField("Username", text: $authViewModel.loginUsername)
                    .textFieldStyle(.roundedBorder)
                    .textContentType(.username)
                    .autocapitalization(.none)
                    .autocorrectionDisabled()

                SecureField("Password", text: $authViewModel.loginPassword)
                    .textFieldStyle(.roundedBorder)
                    .textContentType(.password)

                if let error = authViewModel.errorMessage {
                    Text(error)
                        .font(.caption)
                        .foregroundColor(.red)
                        .multilineTextAlignment(.center)
                }

                Button {
                    Task {
                        await authViewModel.login()
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
                        Text("Log In")
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

            // Switch to signup
            HStack {
                Text("Don't have an account?")
                    .foregroundColor(.secondary)
                Button("Sign Up") {
                    authViewModel.errorMessage = nil
                    switchToSignup()
                }
                .foregroundColor(.orange)
                .fontWeight(.semibold)
            }
            .font(.subheadline)
            .padding(.bottom, 24)
        }
        .navigationTitle("Log In")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .navigationBarLeading) {
                Button("Cancel") { dismiss() }
            }
        }
    }
}
