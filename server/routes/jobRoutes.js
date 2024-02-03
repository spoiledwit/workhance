import { createJob, getJobs,getJobById, getMyJobs, updateJob, deleteJob} from "../controllers/Job.js";
import express from "express";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createJob);
router.get("/", getJobs);
router.get("/myjobs", verifyToken, getMyJobs);
router.get("/:id", getJobById);
router.put("/:id", verifyToken, updateJob);
router.delete("/:id", verifyToken, deleteJob);

export default router;