import express from "express";
import { simplifyContent } from "../controllers/simplifyController.js";
const router = express.Router();

router.post("/", simplifyContent);

export default router;
