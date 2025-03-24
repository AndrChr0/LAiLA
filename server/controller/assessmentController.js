import dotenv from "dotenv";
dotenv.config();
import { pool as SQLpool } from "../utils/SQLPool.js";
const pool = SQLpool;

// get all
export async function getAssignmentAssessments(req, res, next) {
    try {
        const [rows] = await pool.query(`
            SELECT assessment_id, student_id, assignment_id, assessment_contents, assessment_result, is_reviewed
            FROM final_assessments
            WHERE assignment_id = ?;
            `, [req.params.assignment_id]
        );

        if (rows.length == 0) {
            throw Object.assign(new Error("No assessment found"), { status: 404 });
        }

        const geef = {};

        return res.status(200).json(rows);
    } catch (error) {
        next(error);
    }
}
// auth(S)
export async function getMyAssessments(req, res, next) {
    try {
        const [rows] = await pool.query(`
            SELECT assessment_id, student_id, assignment_id, assessment_contents, assessment_result, is_reviewed
            FROM final_assessments
            WHERE student_id = ?;
            `, [req.query.id]
        );

        if (rows.length == 0) {
            throw Object.assign(new Error("No assessment found"), { status: 404 });
        }

        const geef = {};

        return res.status(200).json(rows);
    } catch (error) {
        next(error);
    }
}

// get one - auth
export async function getOneAssessment(req, res, next) {
    try {
        // code
    } catch (error) {
        next(error);
    }
}

// post / patch - auth(S)
export async function createAssessment(req, res, next) {
    try {
        // code
    } catch (error) {
        next(error);
    }
}

// patch - auth(L)
export async function evaluateAssessment(req, res, next) {
    try {
        // code
    } catch (error) {
        next(error);
    }
}
