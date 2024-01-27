import express from "express";
import { createApplication } from "../controllers/Application.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createApplication);

export default router;