import express from "express";
const router = express.Router();
import {register, login, refresh} from "../controller/authController.js";
import verifyRegisterInput from "../middleware/checkConstraints.js";

router.post("/register", verifyRegisterInput, register)

router.post("/login", login)

router.get("/refresh", refresh)

export default router;