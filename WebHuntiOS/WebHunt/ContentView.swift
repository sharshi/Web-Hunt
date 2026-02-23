import SwiftUI

struct ContentView: View {
    @EnvironmentObject var authViewModel: AuthViewModel
    @EnvironmentObject var productsViewModel: ProductsViewModel

    @State private var selectedTab = 0
    @State private var showAuthSheet = false
    @State private var showNewProduct = false

    var body: some View {
        TabView(selection: $selectedTab) {
            NavigationStack {
                FeedView()
                    .navigationTitle("Web Hunt")
                    .toolbar {
                        ToolbarItem(placement: .navigationBarTrailing) {
                            if authViewModel.isAuthenticated {
                                Menu {
                                    Button("New Product") {
                                        showNewProduct = true
                                    }
                                    Button("Log Out", role: .destructive) {
                                        Task { await authViewModel.logout() }
                                    }
                                } label: {
                                    Image(systemName: "person.circle.fill")
                                        .font(.title3)
                                }
                            } else {
                                Button("Sign In") {
                                    showAuthSheet = true
                                }
                                .fontWeight(.semibold)
                            }
                        }
                    }
            }
            .tabItem {
                Label("Feed", systemImage: "flame.fill")
            }
            .tag(0)

            NavigationStack {
                if authViewModel.isAuthenticated, let user = authViewModel.currentUser {
                    ProfileView(username: user.username)
                        .navigationTitle("@\(user.username)")
                } else {
                    VStack(spacing: 16) {
                        Image(systemName: "person.crop.circle")
                            .font(.system(size: 64))
                            .foregroundColor(.secondary)
                        Text("Sign in to view your profile")
                            .font(.headline)
                            .foregroundColor(.secondary)
                        Button("Sign In") {
                            showAuthSheet = true
                        }
                        .buttonStyle(.borderedProminent)
                        .tint(Color.accentColor)
                    }
                    .navigationTitle("Profile")
                }
            }
            .tabItem {
                Label("Profile", systemImage: "person.fill")
            }
            .tag(1)
        }
        .tint(.orange)
        .sheet(isPresented: $showAuthSheet) {
            AuthSheetView()
        }
        .sheet(isPresented: $showNewProduct) {
            NewProductView()
        }
    }
}

struct AuthSheetView: View {
    @State private var isLogin = true

    var body: some View {
        NavigationStack {
            if isLogin {
                LoginView(switchToSignup: { isLogin = false })
            } else {
                SignupView(switchToLogin: { isLogin = true })
            }
        }
    }
}
