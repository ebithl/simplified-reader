import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import simplifyRoutes from "./routes/simplifyRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({ dest: "uploads/" });


app.use(express.json());

//app.use(cors());
//app.use(cors({
//  origin: process.env.ALLOW_ORIGIN
//}));

app.use(cors({
  origin: "https://simplified-reader-client.onrender.com"
}));
app.use("/api/simplify", simplifyRoutes);
app.use("/api/upload-pdf-pages", upload.single("pdf"), uploadRoutes);
//app.use("/api/upload-pdf-pages/", uploadRoutes);

//// Serve frontend build
//app.use(express.static(path.join(__dirname, "../client/dist")));
//app.get("*", (req, res) => {
//  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
//});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
