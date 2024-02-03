import { createJob, getJobs,getJobById, getMyJobs, updateJob} from "../controllers/Job.js";
import express from "express";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createJob);
router.get("/", getJobs);
router.get("/myjobs", verifyToken, getMyJobs);
router.get("/:id", getJobById);
router.put("/:id", verifyToken, updateJob);

export default router;