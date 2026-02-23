import SwiftUI

enum UpvoteButtonStyle {
    case compact
    case large
}

struct UpvoteButton: View {
    let count: Int
    let isUpvoted: Bool
    var style: UpvoteButtonStyle = .compact
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            VStack(spacing: style == .large ? 4 : 2) {
                Image(systemName: isUpvoted ? "chevron.up.circle.fill" : "chevron.up")
                    .font(style == .large ? .body : .caption)
                    .fontWeight(.bold)
                Text("\(count)")
                    .font(style == .large ? .body : .subheadline)
                    .fontWeight(.bold)
            }
            .foregroundColor(isUpvoted ? .white : .orange)
            .padding(.horizontal, style == .large ? 20 : 12)
            .padding(.vertical, style == .large ? 12 : 8)
            .background(
                RoundedRectangle(cornerRadius: style == .large ? 12 : 8)
                    .fill(isUpvoted ? Color.orange : Color.clear)
            )
            .overlay(
                RoundedRectangle(cornerRadius: style == .large ? 12 : 8)
                    .stroke(Color.orange, lineWidth: isUpvoted ? 0 : 1.5)
            )
        }
        .buttonStyle(.plain)
    }
}
