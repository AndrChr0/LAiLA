import dotenv from 'dotenv';
dotenv.config();
import { pool as SQLpool } from '../utils/SQLPool.js';
const pool = SQLpool;

// get all courses (you take) - auth(S) (/L if lecturers should be able to see it too?)
// (req.body would be JWT attribute once authentication is integrated)
export async function getMyCourses(req, res) {
    if (req.query.course_coordinator) {
        const [rows] = await pool.query(`
            SELECT course_id, course_code, course_name, course_description, course_link
            FROM courses
            WHERE course_coordinator = ?;
            `, [req.query.course_coordinator]);
        res.send(rows);
    } else if (req.query.student_id) {
        const [rows] = await pool.query(`
            SELECT courses.course_id, course_code, course_name, course_description, course_link, course_coordinator 
            FROM  courses
            JOIN enrollment ON courses.course_id = enrollment.course_id 
            WHERE enrollment.student_id = ?;
            `, [req.query.student_id]);
        res.send(rows);
    } else {
        res.send("Unknown user type");
    }
}

// get one course
export async function getOneCourse(req, res) {
    const [rows] = await pool.query(`
        SELECT courses.course_id, course_code, course_name, course_description, course_link, course_coordinator
        FROM courses
        WHERE course_id = ?;
        `, [req.params.course_id]);
    res.send(rows[0]);
}
