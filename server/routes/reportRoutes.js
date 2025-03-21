import express from "express";
import { auth, authRole } from "../middleware/verifyToken.js";
import { getAllAssignmentReports, createAssignmentReport, cronCreateAssignmentReport } from "../controller/reportController.js";
const router = express.Router();

// get all assignment reports
router.get("/:assignment_id", auth, authRole("lecturer"), getAllAssignmentReports);

// two identical functions to create new reports
// accessed from the frontend, requires authentication
router.post("/:assignment_id", auth, authRole("lecturer"), createAssignmentReport);
// accessed by the cronjob, does not require authentication
router.post("/cron/:assignment_id", cronCreateAssignmentReport);

export default router;