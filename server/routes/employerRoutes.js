import verifyToken from "../middlewares/verifyToken.js";
import { createEmployer, resendVerificationEmail } from "../controllers/Employer.js";

import express from "express";

const router = express.Router();

router.post("/", verifyToken, createEmployer);
router.post("/resend-verification-email", verifyToken, resendVerificationEmail);

export default router;