import { getRecommendations } from "../controllers/Recommendations.js";
import express from "express";

const router = express.Router();

router.post("/", getRecommendations);

export default router;