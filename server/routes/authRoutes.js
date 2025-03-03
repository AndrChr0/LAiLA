import express from "express";
const router = express.Router();
import register from "../controller/authController.js";

// mangler verifyInput middleware. sjekk fullstack exam repo
router.post("/register", register)

export default router;