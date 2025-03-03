import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// pool of connection, no need for new connection each queries
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise(); // use async/await instead of callbacks for queries 


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

 


