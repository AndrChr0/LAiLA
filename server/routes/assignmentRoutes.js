import express from "express";
import {auth}  from "../middleware/verifyToken.js";
import {
	getAllAssignments,
	createAssignment,
	updateAssignment,
	deleteAssignment,
	undeleteAssignment,
	getOneAssignment
} from "../controller/assignmentController.js";
const router = express.Router();

// get all assignments (for user) - auth(S/L)
/*
    requires req.body.course_coordinator or req.body.student_id with the relevant user ID
    req.body would be JWT attribute once authentication is integrated
*/
router.get("/", auth, getAllAssignments);

// get one assignment
router.get("/:assignment_id", getOneAssignment);

// post assignment - auth(L)
router.post("/", createAssignment);

// put/patch assignment details - auth(L)   (only before submissions?)
router.patch("/:assignment_id", updateAssignment);

// delete assignment
router.delete("/:assignment_id", deleteAssignment);
router.patch("/ohno/:assignment_id", undeleteAssignment); // remove later

export default router;
