import express from "express";
const router = express.Router();
import {register, login, refresh, logout, getOneUser} from "../controller/authController.js";
import verifyRegisterInput from "../middleware/checkConstraints.js";
import {auth} from "../middleware/verifyToken.js";

router.post("/register", verifyRegisterInput, register)

router.post("/login", login)

router.get("/refresh", refresh)

router.get("/logout", logout)

router.get("/user", auth, getOneUser)

export default router;