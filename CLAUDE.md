# Web-Hunt

## Project Structure

This is a multi-platform project. Changes and features must be applied across all platforms when applicable.

### Platforms

- **Web** — Rails 8 backend + React/Redux frontend (`app/`, `frontend/`)
- **iOS** — Native SwiftUI app (`WebHuntiOS/`)
- **Android** — Native Kotlin/Jetpack Compose app (`WebHuntAndroid/`)

### Cross-Platform Rules

- When adding or modifying an API endpoint, ensure the iOS `APIClient.swift` handles it
- When adding a new feature to the web frontend, implement the equivalent in the iOS app
- When changing models or database schema, update both `WebHuntiOS/WebHunt/Models/Models.swift` and `WebHuntAndroid/` models to match
- When fixing a bug that affects API responses, verify all platform consumers (web, iOS, Android) handle it correctly

## Tech Stack

### Web
- **Backend:** Ruby on Rails 8, SQLite, BCrypt (custom auth, not Devise)
- **Frontend:** React 16, Redux, jQuery (AJAX), esbuild
- **Icons:** Lucide React (not Font Awesome)
- **Styling:** SCSS
- **Build:** `npm run build` (esbuild for JS, sass for CSS)

### iOS
- **Language:** Swift / SwiftUI
- **Networking:** URLSession via `APIClient.swift`
- **Architecture:** MVVM (ViewModels + Views)

### Android
- **Language:** Kotlin / Jetpack Compose
- **Directory:** `WebHuntAndroid/`
- **Architecture:** MVVM

## Development

- Run web: `bin/dev` (Foreman: Rails server + JS/CSS watchers)
- Build JS: `npm run build:js`
- Build CSS: `npm run build:css`
- Seed DB: `rails db:seed` (demo user: `demo` / `demo55`)
- Docker: `docker compose run --rm setup` then `docker compose up`

## Key Conventions

- API routes are namespaced under `/api/` and return JSON (jbuilder views)
- Auth uses session tokens stored in cookies (not JWT)
- CSRF tokens are sent via `$.ajaxSetup` in `app/javascript/application.js`
- Products with zero upvotes must still appear in feeds (`left_joins` in queries)
