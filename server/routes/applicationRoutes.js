import express from "express";
import { createApplication, getAllMyCandidates, deleteApplication, shortlistApplication } from "../controllers/Application.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createApplication);
router.get("/my-candidates", verifyToken, getAllMyCandidates);
router.put("/shortlist", verifyToken, shortlistApplication);
router.delete("/:id", verifyToken, deleteApplication);

export default router;