import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();
import { pool as SQLpool } from '../utils/SQLPool.js';
const pool = SQLpool;


export const register = async (req, res) => {
    // Check if email already exists
    const email = req.body.email;
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    // If email already exists, return error
    if (rows.length > 0) {
        console.log(rows)
        return res.status(400).json({ message: 'Email already exists' });
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const user = { 
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        role: req.body.role,
        email: req.body.email,
        password: hashedPassword,
    };

    // Insert user into database
    try {
        await pool.query(`INSERT INTO users (first_name, last_name, role, email, password) VALUES (?,?,?,?,?)`, [user.first_name, user.last_name, user.role, user.email, user.password]);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
        
};

export const login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (rows.length === 0) {
            return res.status(400).json({ message: 'Email could not be found in database.' });
        }

        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid password.' });
        }

        const accessToken = jwt.sign(
            { id: user.user_id, role: user.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', user: { id: user.id, first_name:user.first_name, last_name:user.last_name, email: user.email, role: user.role }, accessToken});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
