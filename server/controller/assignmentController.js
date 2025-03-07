import dotenv from 'dotenv';
dotenv.config();
import { pool as SQLpool } from '../utils/SQLPool.js';
const pool = SQLpool;

// get all assignments (for user) - auth(S/L)
// (req.body would be JWT attribute once authentication is integrated)
export async function getAllAssignments(req, res) {
    if (req.query.course_coordinator) {
        const [rows] = await pool.query(`
            SELECT assignment_id, assignment_title, assignment_start_date, assignment_end_date, is_active, assignment_description, assignment_criteria, assignments.course_id, assignment_attempts 
            FROM assignments
            JOIN courses ON assignments.course_id = courses.course_id 
            WHERE courses.course_coordinator = ?;
            `, [req.query.course_coordinator]);
        if (rows.length > 0) {
            res.send(rows);
        } else {
            res.send("No assignments found");
        }
    } else if (req.query.student_id) {
        const [rows] = await pool.query(`
            SELECT assignment_id, assignment_title, assignment_start_date, assignment_end_date, is_active, assignment_description, assignment_criteria, assignments.course_id, assignment_attempts 
            FROM assignments
            JOIN enrollment ON assignments.course_id = enrollment.course_id 
            WHERE enrollment.student_id = ?;
            `, [req.query.student_id]);
        if (rows.length > 0) {
            res.send(rows);
        } else {
            res.send("No assignments found");
        }
    } else {
        res.send("Unknown user type");
    }
}


// removed, might want eventually, but not for now
// // get one assignment - auth(S/L)[w/ course]
// export async function getOneAssignment(req, res) {
//     // frontend would determine which we use
//     // const [rows] = await pool.query(`SELECT * FROM assignments WHERE course_id = ?`, [req.body.course_id]); // is not using course_id in path
//     const [rows] = await pool.query(`SELECT * FROM assignments WHERE course_id = ?`, [req.params.course_id]);
//     if (rows.length > 0 && req.params.assignment_id-1 < rows.length) {
//         res.send(rows[req.params.assignment_id-1]);
//     } else {
//         res.send("This assignment does not exist");
//     }
// }


// post assignment - auth(L)
export async function createAssignment(req, res) {
    if (req.body.assignment_title && req.body.assignment_start_date && req.body.assignment_end_date && req.body.is_active && req.body.assignment_description && req.body.assignment_criteria && req.body.course_id && req.body.assignment_attempts) {
        const [result] = await pool.query(`
            INSERT INTO assignments (assignment_title, assignment_start_date, assignment_end_date, is_active, assignment_description, assignment_criteria, course_id, assignment_attempts)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
            `, [req.body.assignment_title, req.body.assignment_start_date, req.body.assignment_end_date, req.body.is_active, req.body.assignment_description, req.body.assignment_criteria, req.body.course_id, req.body.assignment_attempts]);
        res.send(result);
    } else {
        res.send("Missing attributes")
    }
}


// add is_deleted field to all deletable schemas first
// delete assignment - auth(L)
// export async function name(req, res) {
//     // something
//     res.send()
// }


// put/patch assignment details - auth(L)   (only before submissions?)
export async function updateAssignment(req, res) {
    if (Object.keys(req.body).length) {
        const [result] = await pool.query(`
            UPDATE assignments
            SET
                assignment_title = COALESCE(?, assignment_title),
                assignment_start_date = COALESCE(?, assignment_start_date),
                assignment_end_date = COALESCE(?, assignment_end_date),
                is_active = COALESCE(?, is_active),
                assignment_description = COALESCE(?, assignment_description),
                assignment_criteria = COALESCE(?, assignment_criteria),
                assignment_attempts = COALESCE(?, assignment_attempts)
            WHERE assignment_id = ?;
            `, [req.body.assignment_title, req.body.assignment_start_date, req.body.assignment_end_date, req.body.is_active, req.body.assignment_description, req.body.assignment_criteria, req.body.assignment_attempts, req.params.assignment_id]);
        res.send(result);
    } else {
        res.send("No values to alter");
    }
}
