import dotenv from 'dotenv';
dotenv.config();
import { pool as SQLpool } from '../utils/SQLPool.js';
const pool = SQLpool;


// **** Same thing

// normal method
    // const result = await pool.query("SELECT * FROM users")
    // const rows = result[0]
    // console.log(rows)

export async function getUsers(req, res) {
// Desctructuring the result method
    const [rows] = await pool.query("SELECT * FROM users") 
    res.send(rows);
}

// ****


// prepared statement. prevent sql injection
export async function getUser(id){
    const [rows] = await pool.query(`
        SELECT * FROM users
        WHERE id = ?
        `, [id])
    return rows[0]
}


export async function createUser(name, email, password){
    const [result] = await pool.query(`
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
    `, [name, email, password])
    return result
}

 


