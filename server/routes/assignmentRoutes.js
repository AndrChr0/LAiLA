import express from "express";
import { getAllAssignments, createAssignment, updateAssignment } from "../controller/assignmentController.js";
const router = express.Router();

// get all assignments (for user) - auth(S/L)
/*
    requires req.body.course_coordinator or req.body.student_id with the relevant user ID
    req.body would be JWT attribute once authentication is integrated
*/
router.get("/", getAllAssignments);


// removed, might want eventually, but not for now
// // get one assignment - auth(S/L)[w/ course]
// // frontend would determine which we use
// // router.get("/:assignment_id", getOneAssignment);
// router.get("/:course_id/:assignment_id", getOneAssignment);


// post assignment - auth(L)
router.post("/", createAssignment);

// delete assignment - auth(L)
// router.method("path", function);

// put/patch assignment details - auth(L)   (only before submissions?)
router.patch("/:assignment_id", updateAssignment);


export default router;
