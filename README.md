# ZAFAR

A mobile-first static frontend for **ZAFAR**, a study-resource library for Malawian secondary-school learners preparing for MSCE and JCE exams.

## Run it locally

No package installation or build step is needed. Serve the repository with any static server, for example:

```bash
python3 -m http.server 4173 --bind 0.0.0.0
```

Then open `http://localhost:4173`.

## Pages

- `index.html` — focused sign-in page with account creation, email-verification messaging, and password reset
- `past-papers.html` — searchable, filterable exam-paper library
- `marking-keys.html` — matching answer / marking keys
- `books-notes.html` — textbooks and revision notes by subject
- `favorites.html` — saved-resource shelf
- `help.html` — FAQ and support routes

## Implementation notes

- Plain, dependency-free HTML, CSS, and JavaScript.
- Shared mobile navigation, local search, favourite controls, download states, and connection-aware messaging live in `assets/app.js`.
- The interface is intentionally constrained to a phone-width column, with simple system typography and a muted plum-and-paper palette.
- `assets/lucide.svg` contains locally bundled Lucide icons (ISC-licensed), so the interface uses a consistent icon set without external image, font, framework, or runtime asset requests. This keeps the first visit light for students using limited or slow mobile data.
- The interactions are intentionally frontend demonstrations. Authentication, email verification, real file storage/downloads, and account usage enforcement require backend/API integration.
