import express from "express";
import { getUsers } from "../controller/databaseController.js";
const router = express.Router();

router.get("/", getUsers);

export default router;
