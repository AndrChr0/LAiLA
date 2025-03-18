import express from "express";
import { auth } from "../middleware/verifyToken.js";
import { getMyCourses, getOneCourse } from "../controller/courseController.js";
const router = express.Router();


// get all courses (you take) - auth(S) (/L if lecturers should be able to see it too?)
router.get("/", auth, getMyCourses);

// get one course
router.get("/:course_id", auth, getOneCourse);


export default router;
