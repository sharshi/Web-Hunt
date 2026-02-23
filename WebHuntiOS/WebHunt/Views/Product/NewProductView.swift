import SwiftUI
import PhotosUI

struct NewProductView: View {
    @EnvironmentObject var productsViewModel: ProductsViewModel
    @EnvironmentObject var authViewModel: AuthViewModel
    @Environment(\.dismiss) private var dismiss

    @State private var title = ""
    @State private var tagline = ""
    @State private var website = ""
    @State private var description = ""
    @State private var selectedPhoto: PhotosPickerItem?
    @State private var logoImage: UIImage?
    @State private var errorMessage: String?
    @State private var currentStep = 0

    private let steps = ["Website", "Details", "Description", "Preview"]

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                // Step indicator
                HStack(spacing: 4) {
                    ForEach(0..<steps.count, id: \.self) { index in
                        VStack(spacing: 4) {
                            Circle()
                                .fill(index <= currentStep ? Color.orange : Color.gray.opacity(0.3))
                                .frame(width: 8, height: 8)
                            Text(steps[index])
                                .font(.system(size: 10))
                                .foregroundColor(index <= currentStep ? .orange : .secondary)
                        }
                        if index < steps.count - 1 {
                            Rectangle()
                                .fill(index < currentStep ? Color.orange : Color.gray.opacity(0.3))
                                .frame(height: 2)
                                .padding(.bottom, 16)
                        }
                    }
                }
                .padding(.horizontal, 24)
                .padding(.vertical, 16)

                Divider()

                TabView(selection: $currentStep) {
                    // Step 1: Website
                    stepWebsite.tag(0)

                    // Step 2: Details
                    stepDetails.tag(1)

                    // Step 3: Description
                    stepDescription.tag(2)

                    // Step 4: Preview
                    stepPreview.tag(3)
                }
                .tabViewStyle(.page(indexDisplayMode: .never))
                .animation(.easeInOut, value: currentStep)

                Divider()

                // Navigation buttons
                HStack {
                    if currentStep > 0 {
                        Button("Back") {
                            currentStep -= 1
                        }
                        .foregroundColor(.secondary)
                    }

                    Spacer()

                    if currentStep < steps.count - 1 {
                        Button("Next") {
                            if validateCurrentStep() {
                                currentStep += 1
                            }
                        }
                        .buttonStyle(.borderedProminent)
                        .tint(.orange)
                    } else {
                        Button {
                            Task { await submitProduct() }
                        } label: {
                            if productsViewModel.isLoading {
                                ProgressView()
                                    .tint(.white)
                            } else {
                                Text("Submit")
                            }
                        }
                        .buttonStyle(.borderedProminent)
                        .tint(.orange)
                        .disabled(productsViewModel.isLoading)
                    }
                }
                .padding(16)
            }
            .navigationTitle("New Product")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Cancel") { dismiss() }
                }
            }
        }
    }

    // MARK: - Steps

    private var stepWebsite: some View {
        VStack(spacing: 20) {
            Spacer()
            Image(systemName: "globe")
                .font(.system(size: 48))
                .foregroundColor(.orange)
            Text("What's the website URL?")
                .font(.title2)
                .fontWeight(.bold)

            TextField("https://example.com", text: $website)
                .textFieldStyle(.roundedBorder)
                .keyboardType(.URL)
                .autocapitalization(.none)
                .autocorrectionDisabled()
                .padding(.horizontal, 32)

            if let error = errorMessage {
                Text(error)
                    .font(.caption)
                    .foregroundColor(.red)
            }
            Spacer()
        }
    }

    private var stepDetails: some View {
        ScrollView {
            VStack(spacing: 20) {
                // Logo picker
                PhotosPicker(selection: $selectedPhoto, matching: .images) {
                    if let logoImage = logoImage {
                        Image(uiImage: logoImage)
                            .resizable()
                            .aspectRatio(contentMode: .fill)
                            .frame(width: 80, height: 80)
                            .clipShape(RoundedRectangle(cornerRadius: 16))
                    } else {
                        VStack(spacing: 8) {
                            Image(systemName: "camera.fill")
                                .font(.title2)
                            Text("Add Logo")
                                .font(.caption)
                        }
                        .foregroundColor(.orange)
                        .frame(width: 80, height: 80)
                        .background(Color.orange.opacity(0.1))
                        .clipShape(RoundedRectangle(cornerRadius: 16))
                    }
                }
                .onChange(of: selectedPhoto) { newValue in
                    Task {
                        if let data = try? await newValue?.loadTransferable(type: Data.self),
                           let image = UIImage(data: data) {
                            logoImage = image
                        }
                    }
                }

                VStack(alignment: .leading, spacing: 8) {
                    Text("Product Name")
                        .font(.subheadline)
                        .fontWeight(.medium)
                    TextField("My Awesome Tool", text: $title)
                        .textFieldStyle(.roundedBorder)
                }

                VStack(alignment: .leading, spacing: 8) {
                    Text("Tagline")
                        .font(.subheadline)
                        .fontWeight(.medium)
                    TextField("A short description of your product", text: $tagline)
                        .textFieldStyle(.roundedBorder)
                }

                if let error = errorMessage {
                    Text(error)
                        .font(.caption)
                        .foregroundColor(.red)
                }
            }
            .padding(24)
        }
    }

    private var stepDescription: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Tell us more about your product")
                .font(.headline)
                .padding(.horizontal, 24)
                .padding(.top, 24)

            TextEditor(text: $description)
                .scrollContentBackground(.hidden)
                .padding(12)
                .background(Color(.systemGray6))
                .clipShape(RoundedRectangle(cornerRadius: 12))
                .padding(.horizontal, 24)
                .frame(minHeight: 200)

            if let error = errorMessage {
                Text(error)
                    .font(.caption)
                    .foregroundColor(.red)
                    .padding(.horizontal, 24)
            }

            Spacer()
        }
    }

    private var stepPreview: some View {
        ScrollView {
            VStack(spacing: 16) {
                Text("Preview")
                    .font(.headline)
                    .padding(.top, 24)

                // Preview card (similar to feed card)
                HStack(alignment: .center, spacing: 12) {
                    if let logoImage = logoImage {
                        Image(uiImage: logoImage)
                            .resizable()
                            .aspectRatio(contentMode: .fill)
                            .frame(width: 56, height: 56)
                            .clipShape(RoundedRectangle(cornerRadius: 12))
                    } else {
                        Image(systemName: "app.fill")
                            .resizable()
                            .frame(width: 56, height: 56)
                            .foregroundColor(.gray.opacity(0.3))
                            .clipShape(RoundedRectangle(cornerRadius: 12))
                    }

                    VStack(alignment: .leading, spacing: 4) {
                        Text(title.isEmpty ? "Product Name" : title)
                            .font(.headline)
                        Text(tagline.isEmpty ? "Product tagline" : tagline)
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                            .lineLimit(2)
                    }

                    Spacer()

                    VStack(spacing: 4) {
                        Image(systemName: "chevron.up")
                            .font(.caption)
                            .fontWeight(.bold)
                        Text("0")
                            .font(.subheadline)
                            .fontWeight(.bold)
                    }
                    .foregroundColor(.orange)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 8)
                    .overlay(
                        RoundedRectangle(cornerRadius: 8)
                            .stroke(Color.orange, lineWidth: 1.5)
                    )
                }
                .padding(16)
                .background(Color(.systemBackground))
                .clipShape(RoundedRectangle(cornerRadius: 12))
                .shadow(color: .black.opacity(0.05), radius: 4, y: 2)
                .padding(.horizontal, 24)

                if !description.isEmpty {
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Description")
                            .font(.subheadline)
                            .fontWeight(.semibold)
                        Text(description)
                            .font(.body)
                            .foregroundColor(.secondary)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.horizontal, 24)
                }

                if let error = errorMessage {
                    Text(error)
                        .font(.caption)
                        .foregroundColor(.red)
                }
            }
        }
    }

    // MARK: - Validation

    private func validateCurrentStep() -> Bool {
        errorMessage = nil

        switch currentStep {
        case 0:
            guard !website.isEmpty else {
                errorMessage = "Please enter a website URL"
                return false
            }
            return true
        case 1:
            guard !title.isEmpty else {
                errorMessage = "Please enter a product name"
                return false
            }
            guard !tagline.isEmpty else {
                errorMessage = "Please enter a tagline"
                return false
            }
            return true
        case 2:
            return true
        default:
            return true
        }
    }

    private func submitProduct() async {
        guard let userId = authViewModel.currentUser?.id else {
            errorMessage = "You must be logged in to submit a product"
            return
        }

        errorMessage = nil

        var logoData: Data?
        var logoFilename: String?
        if let image = logoImage {
            logoData = image.jpegData(compressionQuality: 0.8)
            logoFilename = "\(title.lowercased().replacingOccurrences(of: " ", with: "-"))-logo.jpg"
        }

        let success = await productsViewModel.createProduct(
            title: title,
            tagline: tagline,
            website: website,
            description: description,
            hunterId: userId,
            logoData: logoData,
            logoFilename: logoFilename
        )

        if success {
            dismiss()
        } else {
            errorMessage = productsViewModel.errorMessage ?? "Failed to create product"
        }
    }
}
