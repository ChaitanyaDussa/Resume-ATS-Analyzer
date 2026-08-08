# Resume ATS Analyzer
 
An AI-powered full-stack app that scores your resume against a job description like an Applicant Tracking System would, and gives you AI-generated suggestions to improve it.
 
Upload a PDF resume → paste a job description → get an ATS compatibility score, missing skills, and rewritten bullet points powered by Google Gemini.
 
## Features
 
- **User authentication** — register/login with hashed passwords (bcrypt) and JWT-based sessions
- **PDF resume parsing** — extracts text from uploaded PDFs using `pdfjs-dist`
- **ATS keyword scoring** — compares resume keywords against job description keywords
- **AI-powered analysis** — Gemini generates missing skills, optimization tips, and improved bullet points
- **Protected routes** — only authenticated users can upload and analyze resumes
## Tech Stack
 
**Frontend:** React (Vite), React Router
**Backend:** Node.js, Express, MongoDB (Mongoose)
**Auth:** JWT, bcryptjs
**File handling:** Multer (in-memory), pdfjs-dist
**AI:** Google Gemini API (`gemini-2.5-flash`)
 
## Project Structure
 
```
├── client/    # React frontend (Vite)
│   └── src/
│       ├── components/    # Login, Register, YourResumes, Navbar, Home, Contact, ProtectedRoute
│       └── config/api.js  # Backend API URL (env-driven)
└── server/    # Express backend
    ├── controllers/       # auth + resume logic
    ├── middleware/        # JWT auth guard, Multer upload
    ├── models/            # User, Resume (Mongoose schemas)
    ├── routes/            # /auth, /resume
    └── utils/             # PDF parsing, keyword extraction, ATS scoring, Gemini integration
```
 
## Getting Started (Local Development)
 
### Prerequisites
- Node.js
- A MongoDB Atlas account (or local MongoDB instance)
- A Google Gemini API key
### 1. Backend setup
 
```bash
cd server
npm install
cp .env.example .env
```
 
Fill in `server/.env`:
 
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=any_random_secret_string
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
CLIENT_URL=http://localhost:5173
```
 
Run it:
 
```bash
npm start
```
 
You should see `MongoDB connected` and `Server running on port 5000`.
 
### 2. Frontend setup
 
```bash
cd client
npm install
cp .env.example .env
```
 
Fill in `client/.env`:
 
```env
VITE_API_URL=http://localhost:5000
```
 
Run it:
 
```bash
npm run dev
```
 
Open the printed local URL (usually `http://localhost:5173`).
 
## API Endpoints
 
| Method | Route | Auth required | Description |
|---|---|---|---|
| POST | `/auth/register` | No | Create a new account |
| POST | `/auth/login` | No | Log in, returns a JWT |
| POST | `/resume/upload` | Yes | Upload a PDF (`multipart/form-data`, field `resume`), returns extracted text |
| POST | `/resume/analyze` | Yes | Send `{ resumeText, jobDescription }`, returns ATS score + AI suggestions |
 
All protected routes require an `Authorization: Bearer <token>` header.
 
## Deployment
 
This is a split deployment: backend and frontend go to separate hosts.
 
**Backend (e.g. Render):**
- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Environment variables: `MONGODB_URI`, `JWT_SECRET`, `GEMINI_API_KEY`, `CLIENT_URL` (set this to your deployed frontend URL)
- In MongoDB Atlas, allow network access from `0.0.0.0/0` since most hosts don't use a static IP
**Frontend (e.g. Vercel):**
- Root directory: `client`
- Framework preset: Vite
- Environment variable: `VITE_API_URL` (set this to your deployed backend URL)
After both are live, update the backend's `CLIENT_URL` env var to match your deployed frontend URL exactly (no trailing slash) so CORS allows requests from it.
 
## Notes
 
- PDF files are processed in memory (never written to disk) via Multer's memory storage.
- Passwords are hashed with bcrypt before being stored — never stored in plain text.
- Gemini responses are parsed as strict JSON; if parsing fails, the raw model output is returned as a fallback so the request doesn't just error out.
## Possible Next Steps
 
- Persist analysis results to MongoDB (the `Resume` model already supports it) so users can view past analyses
- Add a logout button that clears the token from `localStorage`
- Support `.docx` resumes in addition to PDF
 



