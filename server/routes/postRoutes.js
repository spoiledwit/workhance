import express from "express";
import {createPost, getPosts, likePost, disLikePost, commentPost, getComments} from "../controllers/Post.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createPost);
router.get("/", getPosts);
router.put("/:id/like", verifyToken, likePost);
router.put("/:id/dislike", verifyToken, disLikePost);
router.post("/:id/comment", verifyToken, commentPost);
router.get("/:id/comment", getComments);

export default router;