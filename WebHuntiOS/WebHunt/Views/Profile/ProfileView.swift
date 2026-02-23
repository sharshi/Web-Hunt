import SwiftUI

struct ProfileView: View {
    let username: String

    @StateObject private var viewModel = ProfileViewModel()
    @EnvironmentObject var authViewModel: AuthViewModel

    @State private var selectedTab = 0

    var body: some View {
        ScrollView {
            if viewModel.isLoading && viewModel.profileUser == nil {
                VStack {
                    Spacer()
                    ProgressView()
                    Spacer()
                }
                .frame(maxWidth: .infinity, minHeight: 300)
            } else if let error = viewModel.errorMessage {
                VStack(spacing: 12) {
                    Image(systemName: "person.crop.circle.badge.exclamationmark")
                        .font(.system(size: 48))
                        .foregroundColor(.secondary)
                    Text(error)
                        .foregroundColor(.secondary)
                    Button("Retry") {
                        Task { await viewModel.fetchProfile(username: username) }
                    }
                    .buttonStyle(.bordered)
                }
                .frame(maxWidth: .infinity, minHeight: 300)
            } else if let user = viewModel.profileUser {
                VStack(spacing: 0) {
                    // Header image
                    ZStack(alignment: .bottom) {
                        if let headerUrl = user.profileHeaderUrl {
                            RemoteImage(url: headerUrl)
                                .aspectRatio(contentMode: .fill)
                                .frame(height: 160)
                                .clipped()
                        } else {
                            LinearGradient(
                                colors: [.orange, .orange.opacity(0.6)],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                            .frame(height: 160)
                        }

                        // Profile picture
                        RemoteImage(
                            url: user.profilePictureUrl,
                            placeholder: Image(systemName: "person.circle.fill")
                        )
                        .aspectRatio(contentMode: .fill)
                        .frame(width: 80, height: 80)
                        .clipShape(Circle())
                        .overlay(
                            Circle()
                                .stroke(Color(.systemBackground), lineWidth: 4)
                        )
                        .shadow(color: .black.opacity(0.2), radius: 4)
                        .offset(y: 40)
                    }

                    // User info
                    VStack(spacing: 4) {
                        Spacer().frame(height: 48)

                        if let name = user.name, !name.isEmpty {
                            Text(name)
                                .font(.title2)
                                .fontWeight(.bold)
                        }

                        Text("@\(user.username)")
                            .font(.subheadline)
                            .foregroundColor(.secondary)

                        // Stats
                        HStack(spacing: 24) {
                            VStack {
                                Text("\(viewModel.userProducts.count)")
                                    .font(.headline)
                                Text("Products")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                            }
                            VStack {
                                Text("\(user.upvotedProductIds?.count ?? 0)")
                                    .font(.headline)
                                Text("Upvotes")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                            }
                            VStack {
                                Text("\(user.reviewIds?.count ?? 0)")
                                    .font(.headline)
                                Text("Reviews")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                            }
                        }
                        .padding(.top, 12)
                    }
                    .padding(.horizontal)

                    // Tabs
                    Picker("Content", selection: $selectedTab) {
                        Text("Products").tag(0)
                        Text("Upvoted").tag(1)
                    }
                    .pickerStyle(.segmented)
                    .padding(.horizontal, 16)
                    .padding(.vertical, 16)

                    // Tab content
                    LazyVStack(spacing: 0) {
                        let items = selectedTab == 0 ? viewModel.userProducts : viewModel.upvotedProducts

                        if items.isEmpty {
                            VStack(spacing: 8) {
                                Image(systemName: selectedTab == 0 ? "cube.box" : "arrow.up.circle")
                                    .font(.system(size: 36))
                                    .foregroundColor(.secondary)
                                Text(selectedTab == 0 ? "No products yet" : "No upvotes yet")
                                    .font(.subheadline)
                                    .foregroundColor(.secondary)
                            }
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 40)
                        } else {
                            ForEach(items) { product in
                                NavigationLink(destination: ProductDetailView(productId: product.id)) {
                                    ProductCardView(product: product)
                                }
                                .buttonStyle(.plain)

                                Divider()
                                    .padding(.leading, 80)
                            }
                        }
                    }
                }
            }
        }
        .navigationTitle("@\(username)")
        .navigationBarTitleDisplayMode(.inline)
        .task {
            await viewModel.fetchProfile(username: username)
        }
    }
}
