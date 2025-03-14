import dotenv from "dotenv";
dotenv.config();
import { pool as SQLpool } from "../utils/SQLPool.js";
const pool = SQLpool;

// get all feedback (for yourself) - auth(S)
export async function getAllFeedback(req, res, next) {
    try {
        if (!req.query.student_id) {
            throw Object.assign(new Error("Unauthorized"), { status: 401 });
        }
        
        const [rows] = await pool.query(`
            SELECT feedback_id, assignment_id, general_comment, attempt_nr, suggested_result 
            FROM feedback
            WHERE student_id = ?;
            `, [req.query.student_id]
        );
        
        if (rows.length == 0) {
            throw Object.assign(new Error("No feedback found"), { status: 404 });
        }

        return res.status(200).json(rows);
    } catch (error) {
        next(error);
    }
}

// get one piece of feedback (for yourself) - auth(S)
export async function getOneFeedback(req, res, next) {
    try {
        if (!req.query.student_id) {
            throw Object.assign(new Error("Unauthorized"), { status: 401 });
        }

        const [rows] = await pool.query(`
            SELECT feedback_id, assignment_id, general_comment, attempt_nr 
            FROM feedback
            WHERE student_id = ? AND feedback_id = ?;
            `, [req.query.student_id, req.params.feedback_id]
        );

        if (rows.length == 0) {
            throw Object.assign(new Error("Feedback not found"), { status: 404 });
        }

        return res.status(200).json(rows[0]);
    } catch (error) {
        next(error);
    }
}

// get all feedback JSON (assignment) - auth(L)
// threshold to get report (e.g. every 20% participation), each report is standalone (@20% "X% have trouble with Y...", @40% (new)"X% have trouble with Y...")
export async function getFeedbackForSummary(req, res, next) {
    try {
        if (!req.query.course_coordinator) {
            throw Object.assign(new Error("Unauthorized"), { status: 401 });
        }
        
        const [rows] = await pool.query(`
            SELECT feedback_contents
            FROM feedback
            WHERE assignment_id = ?;
            `, [req.params.assignment_id]
        );
        
        if (rows.length == 0) {
            throw Object.assign(new Error("No feedback found"), { status: 404 });
        }

        return res.status(200).json(rows);
    } catch (error) {
        next(error);
    }
}
