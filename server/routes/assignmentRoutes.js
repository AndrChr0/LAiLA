import express from "express";
import { auth, authRole } from "../middleware/verifyToken.js";
import { getAllAssignments, createAssignment, updateAssignment, deleteAssignment, undeleteAssignment, getOneAssignment } from "../controller/assignmentController.js";
const router = express.Router();

// get all assignments (for user)
router.get("/", auth, getAllAssignments);

// get one assignment
router.get("/:assignment_id", getOneAssignment);

// post assignment
router.post("/", auth, authRole("lecturer"), createAssignment);

// put/patch assignment details
router.patch("/:assignment_id", auth, authRole("lecturer"), updateAssignment);

// delete assignment
router.delete("/:assignment_id", auth, authRole("lecturer"), deleteAssignment);
router.patch("/ohno/:assignment_id", undeleteAssignment); // remove later

export default router;
