import { parseResume } from "../utils/resumeParser.js";
import { extractKeywords } from "../utils/keywordExtractor.js";
import { calculateATSScore } from "../utils/atsScore.js";
import { analyzeWithGemini } from "../utils/aiAnalyzer.js";

// POST /resume/upload  (multipart/form-data, field name "resume")
export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // req.file.buffer is a Node Buffer provided by Multer's memory storage
    const uint8Array = new Uint8Array(req.file.buffer);

    const text = await parseResume(Buffer.from(uint8Array));

    res.json({
      success: true,
      preview: text.slice(0, 500),
      text
    });
  } catch (err) {
    console.error("Upload Resume Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// POST /resume/analyze  (application/json: { resumeText, jobDescription })
export const analyzeResume = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({ error: "Missing resumeText or jobDescription" });
    }

    // Keyword extraction
    const jdKeywords = extractKeywords(jobDescription);
    const resumeKeywords = extractKeywords(resumeText);

    // ATS Score
    const score = calculateATSScore(jdKeywords, resumeKeywords);
    console.log("ATS Score:", score);

    // Gemini AI analysis
    const suggestions = await analyzeWithGemini(resumeText, jobDescription);

    res.json({
      success: true,
      score,
      suggestions
    });
  } catch (err) {
    console.error("Analyze Resume Error:", err);
    res.status(500).json({ error: err.message });
  }
};
