# Makeup Artist Backend

- `server.js` — Express REST API
- `data/makeup_artist.db` — SQLite database (created automatically)
- `seed.js` — inserts starter blog posts

API:
- GET `/api/health`
- GET/POST `/api/bookings`
- PATCH `/api/bookings/:id`
- GET/POST `/api/contacts`
- PATCH `/api/contacts/:id`
- GET/GET `/api/blog` and `/api/blog/:slug`
- POST/PUT/DELETE `/api/blog` endpoints

Run:
```bash
npm install
npm run db:seed
npm run server
```
Frontend:
```bash
npm run dev
```
