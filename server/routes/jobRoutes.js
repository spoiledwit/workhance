import { createJob, getJobs,getJobById} from "../controllers/Job.js";
import express from "express";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createJob);
router.get("/", getJobs);
router.get("/:id", getJobById);

export default router;