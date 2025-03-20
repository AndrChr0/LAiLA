import dotenv from "dotenv";
dotenv.config();
import { pool as SQLpool } from "../utils/SQLPool.js";
const pool = SQLpool;

export async function getAllAssignmentReports(req, res, next) {
  try {
    const [rows] = await pool.query(
      `
            SELECT report_id, assignment_id, report_nr, report_contents, students_passed, students_failed, total_feedback, students_evaluated
            FROM assignment_reports
            WHERE assignment_id = ?
            ORDER by report_nr DESC;
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
