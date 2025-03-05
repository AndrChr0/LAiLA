import express from "express";
const router = express.Router();
import {register, login, refresh, logout} from "../controller/authController.js";
import verifyRegisterInput from "../middleware/checkConstraints.js";

router.post("/register", verifyRegisterInput, register)

router.post("/login", login)

router.get("/refresh", refresh)

router.get("/logout", logout)

export default router;