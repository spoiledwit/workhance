import {login, register, getUser, getUserById, updateMyProfile, getRecommendedUsers, followUser, unfollowUser, addEducation, addWorkExperience} from "../controllers/Auth.js";
import verifyToken from "../middlewares/verifyToken.js";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", verifyToken, getUser);
router.get("/user/:id", getUserById);
router.put("/user", verifyToken, updateMyProfile);
router.get("/users", verifyToken, getRecommendedUsers);
router.post("/follow/:userId", verifyToken, followUser);
router.post("/unfollow/:userId", verifyToken, unfollowUser);
router.post("/education", verifyToken, addEducation);
router.post("/work", verifyToken, addWorkExperience);

export default router;