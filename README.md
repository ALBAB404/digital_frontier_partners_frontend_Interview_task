## Book Sharing App (Frontend)

A React + Vite single-page application for sharing books and discovering nearby books. It includes authentication, protected routes, API integration with Axios, Tailwind CSS styling, and a simple notification system.

### Tech Stack
- React 19
- Vite 7
- React Router 7
- Tailwind CSS 4
- Axios
- React Hook Form
- ESLint

---

## Getting Started

### Prerequisites
- Node.js 18 or newer
- npm (or yarn/pnpm)

### Installation
1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the project root:
```bash
VITE_SERVER_BASE_URL=http://localhost:5000/api
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview the production build:
```bash
npm run preview
```

---

## Available Scripts
- `npm run dev`: Start Vite dev server
- `npm run build`: Build the app
- `npm run preview`: Preview the production build
- `npm run lint`: Run ESLint

---

## Environment Variables
- `VITE_SERVER_BASE_URL` — Base URL for the backend API (used by Axios instance)

---

## Project Structure

```text
final-frontend/
├─ public/
├─ src/
│  ├─ api/
│  │  └─ index.js              # Axios instance with baseURL from env
│  ├─ components/
│  │  ├─ BookCard.jsx
│  │  ├─ BookShareForm.jsx     # Uses react-hook-form; on success calls parent callback
│  │  ├─ Field.jsx             # Reusable form field wrapper
│  │  ├─ Layout.jsx            # App shell used inside PrivateRoute
│  │  └─ Notification.jsx      # Simple toast-like notification
│  ├─ context/
│  │  └─ index.js              # AuthContext
│  ├─ hooks/
│  │  ├─ useAuth.js            # Access AuthContext
│  │  └─ useAxios.js           # Axios interceptors (adds Bearer token, handles 401)
│  ├─ pages/
│  │  ├─ AdminDashboard.jsx
│  │  ├─ Auth/
│  │  │  ├─ LoginPage.jsx
│  │  │  └─ RegisterPage.jsx
│  │  ├─ NotFoundPage.jsx
│  │  └─ UserDashBoardPage.jsx # Dashboard with nearby books and share modal
│  ├─ providers/
│  │  └─ AuthProvider.jsx      # Provides { auth, setAuth } to the app
│  ├─ routes/
│  │  └─ PrivateRoute.jsx      # Guards routes by checking auth.authToken
│  ├─ App.css                  # Tailwind import + small custom styles
│  ├─ App.jsx                  # Routes configuration
│  └─ main.jsx                 # App bootstrap with BrowserRouter + AuthProvider
├─ .env                        # Contains VITE_SERVER_BASE_URL
├─ package.json
└─ README.md
```

---

## Features

- Authentication (Login/Register)
  - `LoginPage.jsx` calls `POST /login`. On success, saves `authToken` and `user` email, persists to localStorage, and navigates based on role.
  - Admin redirect logic (email checks): `admin@gmail.com` or `superadmin@gmail.com` ➜ `/admin-dashboard`; otherwise ➜ `/`.

- Protected Routes
  - `PrivateRoute.jsx` renders children only if `auth.authToken` exists, otherwise redirects to `/login`.
  - Wraps content with `Layout.jsx`.

- API Integration
  - Centralized Axios instance (`src/api/index.js`) with `baseURL` from `VITE_SERVER_BASE_URL`.
  - `useAxios.js` adds `Authorization: Bearer <token>` automatically if present.
  - On `401` responses, it clears auth (logs out) via `setAuth(null)`.

- User Dashboard
  - Fetches nearby books from `GET /books/nearby`.
  - Shares a new book via `POST /books` and shows a success notification.
  - Clean, responsive UI built with Tailwind CSS.

- Notification System
  - Lightweight `Notification.jsx` shows dismissible success/error/info messages.
  - Simple slide-in animation defined in `App.css`.

- 404 Page
  - `NotFoundPage.jsx` with a minimal centered design and a Home button.

---

## Authentication Flow (High-level)
1. User logs in on `LoginPage.jsx` ➜ calls backend `POST /login`.
2. On success, `{ authToken, user }` is stored via `setAuth(...)` and in `localStorage`.
3. App routes (`App.jsx`) are conditionally rendered:
   - Admin emails ➜ `/admin-dashboard`
   - Other users ➜ `/`
4. Protected content is wrapped by `PrivateRoute.jsx` which checks `auth.authToken`.
5. All API calls use `useAxios()` so the token is attached automatically.

---

## Notes & Conventions

- Styling is powered by Tailwind CSS v4. Global import lives in `src/App.css`.
- React Router v7 is used. In this project, router imports come from `react-router`.
- Keep environment variables prefixed with `VITE_` so Vite exposes them to the client.

---

## Troubleshooting

- Ensure `.env` contains a valid `VITE_SERVER_BASE_URL`.
- If API calls return 401, the app will clear auth state and redirect to login on next guarded route.
- If you see context-related errors, verify `AuthProvider.jsx` uses:
  ```jsx
  <AuthContext.Provider value={{ auth, setAuth }}>
    {children}
  </AuthContext.Provider>
  ```

---

## License
This project is for learning/demo purposes. Add a license if you plan to distribute.
