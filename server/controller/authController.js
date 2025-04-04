import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" }); // load shared env
dotenv.config(); // load server env
import { pool as SQLpool } from "../utils/SQLPool.js";
const pool = SQLpool;

export const register = async (req, res, next) => {
  try {
    // Check if email already exists
    const email = req.body.email;
    const [rows] = await pool.query(
      `
            SELECT email
            FROM users
            WHERE email = ?;
            `,
      [email]
    );

    // If email already exists, return error
    if (rows.length > 0) {
      throw Object.assign(new Error("Email already exists"), { status: 400 });
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
    await pool.query(
      `
            INSERT INTO users (first_name, last_name, role, email, password)
            VALUES (?,?,?,?,?);
            `,
      [user.first_name, user.last_name, user.role, user.email, user.password]
    );
    return res.status(201).json("User registered successfully");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const [rows] = await pool.query(
      `
            SELECT user_id, email, password, role
            FROM users
            WHERE email = ?;
            `,
      [email]
    );

    if (rows.length === 0) {
      throw Object.assign(new Error("Email could not be found in database"), {
        status: 400,
      });
    }

    const user = rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw Object.assign(new Error("Invalid password"), { status: 400 });
    }

    const accessToken = jwt.sign(
      { id: user.user_id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" } // real case scenario
    );

    const refreshToken = jwt.sign(
      { userId: user.user_id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" } // real case scenario
      // {expiresIn: "1m"} // testing purposes
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // real case scenario (7 days)
      // maxAge: 1*60*1000 // testing purposes (1 minute)
    });

    return res
      .status(200)
      .json({
        message: "Login successful",
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role: user.role,
        },
        accessToken,
        refreshToken,
      });
  } catch (error) {
    next(error);
  }
};

export const refresh = (req, res, next) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
      throw Object.assign(new Error("Unauthorized, no token found"), {
        status: 401,
      });
    }

    const refreshToken = cookies.jwt;

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          throw Object.assign(new Error("Forbidden"), { status: 403 });
        }

        const [rows] = await pool.query(
          `
                    SELECT user_id, role
                    FROM users
                    WHERE user_id = ?;
                    `,
          [decoded.userId]
        );
        const user = rows[0];

        if (!user) {
          throw Object.assign(new Error("Unauthorized, no user found"), {
            status: 401,
          });
        }

        const accessToken = jwt.sign(
          { id: user.user_id, role: user.role },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" } // real case scenario
          // { expiresIn: '1m' } // testing purposes
        );

        return res.status(200).json(accessToken);
      }
    );
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    if (req.cookies?.jwt) {
      const refreshToken = req.cookies.jwt;
      res.clearCookie("jwt");
      return res.status(200).json("Logout successful");
    } else {
      throw Object.assign(new Error("No token found"), { status: 400 });
    }
  } catch (error) {
    next(error);
  }
};
