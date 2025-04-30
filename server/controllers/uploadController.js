import fs from "fs";
import path from "path";
import pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";

export const uploadContent = async (req, res) => {
  const filePath = path.join(__dirname, req.file.path);

  try {
    const data = new Uint8Array(fs.readFileSync(filePath));
    const pdf = await pdfjsLib.getDocument({ data }).promise;

    const pages = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const text = content.items.map(item => item.str).join(" ");
      pages.push(text);
    }

    res.json({ pages });
  } catch (err) {
    console.error("PDF parsing error:", err);
    res.status(500).json({ error: "Failed to process PDF." });
  } finally {
    fs.unlinkSync(filePath); // Clean up temp file
  }
};