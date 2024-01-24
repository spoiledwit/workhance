import {login, register, getUser, verify, approve, getUsers} from "../controllers/Auth.js";
import verifyToken from "../middlewares/verifyToken.js";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", verifyToken, getUser);
router.get("/verify/:id", verify);
router.get("/approve/:id", verifyToken, approve);
router.get("/users", verifyToken, getUsers);

export default router;