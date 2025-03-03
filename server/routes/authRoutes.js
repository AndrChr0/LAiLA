import express from "express";
const router = express.Router();
import {register, login} from "../controller/authController.js";
import verifyRegisterInput from "../middleware/checkConstraints.js";

router.post("/register", verifyRegisterInput, register)

router.post("/login", login)

export default router;