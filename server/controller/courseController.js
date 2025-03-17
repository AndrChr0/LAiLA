import dotenv from 'dotenv';
dotenv.config();
import { pool as SQLpool } from '../utils/SQLPool.js';
const pool = SQLpool;

// get all courses (you take) - auth(S) (/L if lecturers should be able to see it too?)
// (req.body would be JWT attribute once authentication is integrated)
export async function getMyCourses(req, res, next) {
    try {
        if (req.user.role == "lecturer") {
            const [rows] = await pool.query(`
                SELECT course_id, course_code, course_name, course_description, course_link
                FROM courses
                WHERE course_coordinator = ?;
                `, [req.user.id]
            );

            if (rows.length == 0) {
				throw Object.assign(new Error("No courses found"), { status: 404 });
			}

            return res.status(200).json(rows);
        } else if (req.user.role == "student") {
            const [rows] = await pool.query(`
                SELECT courses.course_id, course_code, course_name, course_description, course_link, course_coordinator 
                FROM  courses
                JOIN enrollment ON courses.course_id = enrollment.course_id 
                WHERE enrollment.student_id = ?;
                `, [req.user.id]
            );

            if (rows.length == 0) {
				throw Object.assign(new Error("No courses found"), { status: 404 });
			}

            return res.status(200).json(rows);
        } else {
			throw Object.assign(new Error("Unknown user type"), { status: 400 });
        }    
    } catch (error) {
        next(error);
    }
}

// get one course
export async function getOneCourse(req, res, next) {
    try {
        const [rows] = await pool.query(`
            SELECT c.course_id, c.course_code, c.course_name, c.course_description, c.course_link, CONCAT(u.first_name, ' ', u.last_name) AS course_coordinator
            FROM  courses c
            JOIN users u ON c.course_coordinator = u.user_id
            WHERE c.course_id = ?;
            `, [req.params.course_id]
        );

        if (rows.length == 0) {
            throw Object.assign(new Error("Course not found"), { status: 404 });
        }

        return res.status(200).json(rows[0]);
    } catch (error) {
        next(error);
    }
}
