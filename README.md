# MERN ThinkBoard

A full-stack MERN note-taking application with a React + Vite frontend, Express backend, and MongoDB persistence.

## Project structure

- `frontend/` – React application built with Vite, Tailwind CSS, and React Router.
- `backend/` – Express server, MongoDB connection, note CRUD routes, and request rate limiting.
- `package.json` – root scripts for installing dependencies and building/running the app.

## Features

- Create, read, update, and delete notes
- React SPA with client-side routing
- Express API with RESTful endpoints under `/api/notes`
- MongoDB via Mongoose
- Basic rate limiting middleware in the backend

## Prerequisites

- Node.js 18+ or compatible
- npm
- MongoDB Atlas account or local MongoDB instance

## Setup

From the project root:

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

### Environment

The backend uses MongoDB. Update the connection settings in `backend/src/config/db.js` or replace it with an environment variable in your own version.

If you prefer environment variables, create `backend/.env` and add:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5001
NODE_ENV=development
```

## Running the app

### Start backend only

```bash
cd backend
npm run dev
```

### Start frontend only

```bash
cd frontend
npm run dev
```

### Build frontend and run backend

```bash
npm run build
npm run start
```

The frontend dev server runs on `http://localhost:5173` and the backend API runs on `http://localhost:5001`.

## API endpoints

Base URL: `http://localhost:5001/api/notes`

- `GET /` — get all notes
- `GET /:id` — get a note by ID
- `POST /` — create a new note
- `PUT /:id` — update a note by ID
- `DELETE /:id` — delete a note by ID

### Example request body for create/update

```json
{
  "title": "My note title",
  "content": "Note content here"
}
```

## Notes schema

The note model includes at least:

- `title`
- `content`
- `createdAt`
- `updatedAt`

## Troubleshooting

- If the backend cannot find `frontend/dist/index.html`, build the frontend first with `npm run build --prefix frontend`.
- If MongoDB connection fails, verify your connection string in `backend/src/config/db.js` or `backend/.env`.

## License

ISC
