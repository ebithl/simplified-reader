import express from "express";
import { uploadContent } from "../controllers/uploadController.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
const router = express.Router();




//router.post("/", uploadContent);
router.post("/", upload.single("pdf"), uploadContent);

export default router;