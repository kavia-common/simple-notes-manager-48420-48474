# Simple Notes Manager (React) — Ocean Professional

A lightweight notes app with create, list, edit, delete, and search features. Uses localStorage by default and can switch to an API later.

## Features
- Create notes (title required, content optional)
- Edit and delete with confirmation
- Search across title and content
- Sorts by "Last updated" automatically
- Responsive, accessible UI (keyboard focus, aria labels)
- Ocean Professional theme (primary #2563EB, secondary #F59E0B)
- Basic persistence via localStorage
- Optional API mode (auto-detected via `REACT_APP_API_BASE` health check)

## Getting Started
In the project directory:

### `npm start`
Runs the app in development mode.
Open http://localhost:3000 to view it.

### `npm test`
Runs tests in watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

## Optional API Mode
The app uses localStorage by default. If a backend exists:

1. Set env var `REACT_APP_API_BASE` (e.g. `https://api.example.com`).
2. Ensure a health check at `GET REACT_APP_API_BASE` returns 200.
3. Provide endpoints:
   - GET    `${REACT_APP_API_BASE}/notes`
   - POST   `${REACT_APP_API_BASE}/notes`        body: `{title, content}`
   - PUT    `${REACT_APP_API_BASE}/notes/:id`    body: `{title, content}`
   - DELETE `${REACT_APP_API_BASE}/notes/:id`

On load, the app pings the base URL. If healthy, it uses API storage; otherwise it falls back to localStorage automatically.

## Code Structure
- `src/components/`
  - `Header.js` — app header
  - `NoteForm.js` — create/update form
  - `NotesList.js` — list with actions
  - `SearchBar.js` — search input
- `src/services/`
  - `localStorageService.js` — local CRUD
  - `apiService.js` — API CRUD (optional)
  - `storageSelector.js` — selects storage based on env/health
- `src/theme/ThemeContext.js` — applies theme CSS variables
- `src/App.css` — theme and component styles

## Accessibility
- Keyboard-friendly controls and focus ring
- Aria labels for interactive icons
- Semantic structure for lists and forms

## Environment Variables
- `REACT_APP_API_BASE` (optional): base URL for backend
Other env vars present are respected by the preview system; no changes needed in this app.

## Notes
- Keep dependencies minimal; no UI frameworks required.
- The app is responsive and uses a subtle gradient background to match the Ocean Professional theme.
