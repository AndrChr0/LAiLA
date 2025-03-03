import express from "express";
const router = express.Router();
import register from "../controller/authController.js";
import verifyRegisterInput from "../middleware/checkConstraints.js";

router.post("/register", verifyRegisterInput, register)

export default router;