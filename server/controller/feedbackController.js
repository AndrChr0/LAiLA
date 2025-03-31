import dotenv from "dotenv";
dotenv.config({ path: "../.env" }); // load shared env
dotenv.config(); // load server env
import { pool as SQLpool } from "../utils/SQLPool.js";

const pool = SQLpool;

// get all feedback (for yourself)
export async function getAllFeedback(req, res, next) {
    try {
        const [rows] = await pool.query(`
            SELECT feedback_id, assignment_id, general_comment, attempt_nr, suggested_result 
            FROM feedback
            WHERE student_id = ?
            ORDER BY attempt_nr DESC;
            `, [req.user.id]
        );

        if (rows.length == 0) {
        throw Object.assign(new Error("No feedback found"), { status: 404 });
        }

        return res.status(200).json(rows);
    } catch (error) {
        next(error);
    }
}

// get one piece of feedback (for yourself)
export async function getOneFeedback(req, res, next) {
    try {
        const [rows] = await pool.query(`
            SELECT feedback_id, assignment_id, general_comment, attempt_nr 
            FROM feedback
            WHERE student_id = ? AND feedback_id = ?;
            `, [req.user.id, req.params.feedback_id]
        );

        if (rows.length == 0) {
            throw Object.assign(new Error("Feedback not found"), { status: 404 });
        }

        return res.status(200).json(rows[0]);
    } catch (error) {
        next(error);
    }
}
