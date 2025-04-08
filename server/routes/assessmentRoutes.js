import express from "express";
import { auth, authRole } from "../middleware/verifyToken.js";
import { getAssignmentAssessments, getMyAssessments, getOneAssessment, createAssessment, evaluateAssessment, getCourseAssessments } from "../controller/assessmentController.js";
const router = express.Router();

// get all
router.get("/lecturer/:assignment_id", auth, authRole("lecturer"), getAssignmentAssessments);
router.get("/student", auth, authRole("student"), getMyAssessments);
router.get("/student/:course_id", /*auth, authRole("student"),*/ getCourseAssessments);

// get one
router.get("/one/:assessment_id", auth, getOneAssessment);

// create
router.post("/:assignment_id", createAssessment);

// evaluate
router.patch("/lecturer/:assessment_id", auth, authRole("lecturer"), evaluateAssessment);

export default router;
