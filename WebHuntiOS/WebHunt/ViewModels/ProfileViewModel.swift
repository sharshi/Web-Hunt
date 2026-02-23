import Foundation

@MainActor
final class ProfileViewModel: ObservableObject {
    @Published var profileUser: User?
    @Published var isLoading = false
    @Published var errorMessage: String?

    private let api = APIClient.shared

    var userProducts: [Product] {
        guard let user = profileUser, let products = user.products else { return [] }
        return Array(products.values).sorted { $0.id > $1.id }
    }

    var upvotedProducts: [Product] {
        guard let user = profileUser, let products = user.upvotedProducts else { return [] }
        return Array(products.values).sorted { $0.id > $1.id }
    }

    func fetchProfile(username: String) async {
        isLoading = true
        errorMessage = nil

        do {
            profileUser = try await api.fetchUserByUsername(username: username)
        } catch let error as APIError {
            errorMessage = error.errorDescription
        } catch {
            errorMessage = error.localizedDescription
        }

        isLoading = false
    }

    func fetchProfile(userId: Int) async {
        isLoading = true
        errorMessage = nil

        do {
            profileUser = try await api.fetchUser(id: userId)
        } catch let error as APIError {
            errorMessage = error.errorDescription
        } catch {
            errorMessage = error.localizedDescription
        }

        isLoading = false
    }
}
