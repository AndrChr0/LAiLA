import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// pool of connection, no need for new connection each query
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise(); // use async/await instead of callbacks for queries 


// get all courses (you take) - auth(S) (/L if lecturers should be able to see it too?)
export async function getMyCourses(req, res) {
    if (req.body.course_coordinator) {
        const [rows] = await pool.query(`SELECT * FROM courses WHERE course_coordinator = ?`, [req.body.course_coordinator]);
        res.send(rows);
    } else if (req.body.student_id) {
        const [rows] = await pool.query(`
            SELECT courses.course_id, course_code, course_name, course_description, course_coordinator 
            FROM  courses
            JOIN enrollment ON courses.course_id = enrollment.course_id 
            WHERE enrollment.student_id = ?
            `, [req.body.student_id]);
        res.send(rows);
    }
}

// get one course
export async function getOneCourse(req, res) {
    const [rows] = await pool.query(`SELECT * FROM courses WHERE course_id = ?`, [req.params.course_id]);
    res.send(rows[0]);
}
