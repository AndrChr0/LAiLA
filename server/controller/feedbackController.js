import dotenv from 'dotenv';
dotenv.config();
import { pool as SQLpool } from '../utils/SQLPool.js';
const pool = SQLpool;


// get all feedback (for yourself) - auth(S)
export async function getAllFeedback(req, res) {
    if (!req.query.student_id) {
        return res.status(401).send("Unauthorized");
    }

    const [rows] = await pool.query(`
        SELECT feedback_id, assignment_id, general_comment, attempt_nr 
        FROM feedback
        WHERE student_id = ?;
        `, [req.query.student_id]
    );

    if (rows.length > 0) {
        res.send(rows);
    } else {
        res.send("No assignments found");
    }
}

// get one piece of feedback (for yourself) - auth(S)
export async function getOneFeedback(req, res) {
    if (!req.query.student_id) {
        return res.status(401).send("Unauthorized");
    }

    const [rows] = await pool.query(`
        SELECT feedback_id, assignment_id, general_comment, attempt_nr 
        FROM feedback
        WHERE student_id = ? AND feedback_id = ?;
        `, [req.query.student_id, req.params.feedback_id]
    );

    if (rows.length > 0) {
        res.send(rows[0]);
    } else {
        res.send("Assignment not found");
    }
}


// get all feedback JSON (assignment) - auth(L)
    // threshold to get report (e.g. every 20% participation), each report is standalone (@20% "X% have trouble with Y...", @40% (new)"X% have trouble with Y...")


// post feedback

