import multer from "multer";

// Keep the uploaded file in memory (as a Buffer) instead of writing to disk,
// since we only need to read the text out of the PDF.
const storage = multer.memoryStorage();

export const upload = multer({ storage });
