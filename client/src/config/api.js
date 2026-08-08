// In dev, Vite loads client/.env automatically (VITE_API_URL=http://localhost:5000).
// In production, set VITE_API_URL in your hosting provider's env var settings
// to your deployed backend URL, e.g. https://your-app.onrender.com
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
