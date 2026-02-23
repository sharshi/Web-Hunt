import SwiftUI

@main
struct WebHuntApp: App {
    @StateObject private var authViewModel = AuthViewModel()
    @StateObject private var productsViewModel = ProductsViewModel()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(authViewModel)
                .environmentObject(productsViewModel)
        }
    }
}
