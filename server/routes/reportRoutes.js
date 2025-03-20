import express from "express";
import { auth } from "../middleware/verifyToken.js";
import { getAllAssignmentReports } from "../controller/reportController.js";
const router = express.Router();

// get all assignment reports - auth(L)
router.get("/:assignment_id", getAllAssignmentReports)

export default router;