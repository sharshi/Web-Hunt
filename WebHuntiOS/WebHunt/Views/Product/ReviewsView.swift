import SwiftUI

struct ReviewsView: View {
    let productId: Int

    @EnvironmentObject var productsViewModel: ProductsViewModel
    @EnvironmentObject var authViewModel: AuthViewModel

    @State private var newReviewBody = ""
    @State private var isSubmitting = false

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack {
                Text("Discussion")
                    .font(.headline)
                Spacer()
                Text("\(productsViewModel.reviews.count)")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 2)
                    .background(Color.gray.opacity(0.1))
                    .clipShape(Capsule())
            }

            // New review input
            if authViewModel.isAuthenticated {
                HStack(alignment: .top, spacing: 12) {
                    Image(systemName: "person.circle.fill")
                        .font(.title2)
                        .foregroundColor(.orange)

                    VStack(spacing: 8) {
                        TextField("Share your thoughts...", text: $newReviewBody, axis: .vertical)
                            .textFieldStyle(.roundedBorder)
                            .lineLimit(1...5)

                        if !newReviewBody.isEmpty {
                            HStack {
                                Spacer()
                                Button {
                                    Task { await submitReview() }
                                } label: {
                                    if isSubmitting {
                                        ProgressView()
                                            .scaleEffect(0.8)
                                    } else {
                                        Text("Comment")
                                            .font(.subheadline)
                                            .fontWeight(.semibold)
                                    }
                                }
                                .buttonStyle(.borderedProminent)
                                .tint(.orange)
                                .controlSize(.small)
                                .disabled(isSubmitting || newReviewBody.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
                            }
                        }
                    }
                }
            } else {
                Text("Sign in to join the discussion")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 12)
                    .background(Color.gray.opacity(0.05))
                    .clipShape(RoundedRectangle(cornerRadius: 8))
            }

            // Reviews list
            if productsViewModel.isLoadingReviews {
                HStack {
                    Spacer()
                    ProgressView()
                    Spacer()
                }
                .padding(.vertical, 16)
            } else if productsViewModel.reviews.isEmpty {
                Text("No comments yet. Be the first!")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 24)
            } else {
                ForEach(productsViewModel.reviews) { review in
                    ReviewRow(review: review)
                }
            }
        }
        .task {
            await productsViewModel.fetchReviews(productId: productId)
        }
    }

    private func submitReview() async {
        guard let userId = authViewModel.currentUser?.id else { return }
        let body = newReviewBody.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !body.isEmpty else { return }

        isSubmitting = true
        let success = await productsViewModel.submitReview(
            productId: productId,
            reviewerId: userId,
            body: body
        )
        if success {
            newReviewBody = ""
        }
        isSubmitting = false
    }
}

struct ReviewRow: View {
    let review: Review

    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: "person.circle")
                .font(.title3)
                .foregroundColor(.gray)

            VStack(alignment: .leading, spacing: 4) {
                HStack {
                    Text("User #\(review.reviewerId)")
                        .font(.subheadline)
                        .fontWeight(.semibold)
                    Spacer()
                    Text(formatDate(review.createdAt))
                        .font(.caption)
                        .foregroundColor(.secondary)
                }

                Text(review.body)
                    .font(.body)
                    .foregroundColor(.primary)
            }
        }
        .padding(.vertical, 8)
    }

    private func formatDate(_ dateString: String) -> String {
        let formatter = ISO8601DateFormatter()
        formatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
        if let date = formatter.date(from: dateString) {
            let relative = RelativeDateTimeFormatter()
            relative.unitsStyle = .short
            return relative.localizedString(for: date, relativeTo: Date())
        }
        // Try without fractional seconds
        formatter.formatOptions = [.withInternetDateTime]
        if let date = formatter.date(from: dateString) {
            let relative = RelativeDateTimeFormatter()
            relative.unitsStyle = .short
            return relative.localizedString(for: date, relativeTo: Date())
        }
        return dateString
    }
}
