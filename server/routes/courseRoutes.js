import express from "express";
import { getMyCourses, getOneCourse } from "../controller/courseController.js";
const router = express.Router();

// get all courses (you take) - auth(S) (/L if lecturers should be able to see it too?)
router.get("/", getMyCourses);

// get one course
router.get("/:course_id", getOneCourse);


export default router;
