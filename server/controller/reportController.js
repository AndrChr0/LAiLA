import dotenv from "dotenv";
dotenv.config({ path: "../.env" }); // load shared env
dotenv.config(); // load server env
import { pool as SQLpool } from "../utils/SQLPool.js";
import { generateAssignmentReport } from "../utils/generateAssignmentReport.js";
const pool = SQLpool;

export async function getAllAssignmentReports(req, res, next) {
  try {
    const [rows] = await pool.query(
      `
            SELECT ar.report_id, ar.assignment_id, ar.report_nr, ar.report_contents, ar.students_passed, ar.students_failed, ar.total_feedback, ar.students_evaluated, a.assignment_title, c.course_name
            FROM assignment_reports ar
            JOIN assignments a ON ar.assignment_id = a.assignment_id
            JOIN courses c ON a.course_id = c.course_id
            WHERE ar.assignment_id = ?
            ORDER BY ar.report_nr DESC;
            `,
      [req.params.assignment_id]
    );

    if (rows.length == 0) {
      throw Object.assign(new Error("No report found"), { status: 404 });
    }

    return res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
}

// two identical functions to create new reports (they only differ in terms of authentication in the router)
export async function createAssignmentReport(req, res, next) {
  try {
    console.log("ÆÆÆÆÆÆÆÆÆÆÆÆ");
    console.log(req.body);

    const result = await generateAssignmentReport(
      req.params.assignment_id,
      req.body.isManuallyCreated
    );

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
export async function cronCreateAssignmentReport(req, res, next) {
  try {
    const result = await generateAssignmentReport(req.params.assignment_id);

    return res.status(200).json("Database updated");
  } catch (error) {
    next(error);
  }
}
