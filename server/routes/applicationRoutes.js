import express from "express";
import { createApplication, getAllMyCandidates, deleteApplication } from "../controllers/Application.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createApplication);
router.get("/my-candidates", verifyToken, getAllMyCandidates);
router.delete("/:id", verifyToken, deleteApplication);

export default router;