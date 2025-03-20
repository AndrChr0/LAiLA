import express from "express";
const router = express.Router();
import { getOneUser } from "../controller/userController.js";
import { auth } from "../middleware/verifyToken.js";

// get user information for currently authenticated user
router.get("/", auth, getOneUser);

export default router;