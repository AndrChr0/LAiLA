import dotenv from 'dotenv';
dotenv.config();
import { pool as SQLpool } from '../utils/SQLPool.js';
const pool = SQLpool;

// get all courses (you take) - auth(S) (/L if lecturers should be able to see it too?)
// (req.body would be JWT attribute once authentication is integrated)
export async function getMyCourses(req, res) {
    if (req.user.role == "lecturer") {
        const [rows] = await pool.query(`
            SELECT course_id, course_code, course_name, course_description, course_link
            FROM courses
            WHERE course_coordinator = ?;
            `, [req.user.id]);
        res.send(rows);
    } else if (req.user.role == "student") {
        const [rows] = await pool.query(`
            SELECT courses.course_id, course_code, course_name, course_description, course_link, course_coordinator 
            FROM  courses
            JOIN enrollment ON courses.course_id = enrollment.course_id 
            WHERE enrollment.student_id = ?;
            `, [req.user.id]);
        res.send(rows);
    } else {
        res.send("Unknown user type");
    }
}

// get one course
export async function getOneCourse(req, res) {
    const [rows] = await pool.query(`
        SELECT c.course_id, c.course_code, c.course_name, c.course_description, c.course_link, CONCAT(u.first_name, ' ', u.last_name) AS course_coordinator
        FROM  courses c
        JOIN users u ON c.course_coordinator = u.user_id
        WHERE c.course_id = ?;
        `, [req.params.course_id]);
    res.send(rows[0]);
}
