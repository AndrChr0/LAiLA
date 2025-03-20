import express from "express";
import { auth, authRole } from "../middleware/verifyToken.js";
import { getAllFeedback, getOneFeedback } from "../controller/feedbackController.js";
const router = express.Router();

// get all feedback (for yourself)
router.get("/", auth, authRole("student"), getAllFeedback);

// get one piece of feedback (for yourself)
router.get("/:feedback_id", auth, authRole("student"), getOneFeedback);

export default router;
