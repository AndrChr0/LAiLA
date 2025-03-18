import express from "express";
import { auth } from "../middleware/verifyToken.js";
import { getAllFeedback, getOneFeedback, getFeedbackForSummary } from "../controller/feedbackController.js";
const router = express.Router();

// get all feedback (for yourself) - auth(S)
router.get("/", auth, getAllFeedback);

// get one piece of feedback (for yourself) - auth(S)
router.get("/:feedback_id", auth, getOneFeedback);

// get all feedback JSON (assignment)
    // threshold to get report (e.g. every 20% participation), each report is standalone (@20% "X% have trouble with Y...", @40% (new)"X% have trouble with Y...")
router.get("/ai/:assignment_id", getFeedbackForSummary);


export default router;
