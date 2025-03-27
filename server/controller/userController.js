import dotenv from 'dotenv';
dotenv.config({ path: "../.env" }); // load shared env
dotenv.config(); // load server env
import { pool as SQLpool } from '../utils/SQLPool.js';
const pool = SQLpool;

// get user information for currently authenticated user
export const getOneUser = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT first_name, last_name, email FROM users WHERE user_id = ?', [req.user.id]);
        const user = rows[0];

        if (!user) {
            throw Object.assign(new Error("User not found"), { status: 404 });
        }

        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}
