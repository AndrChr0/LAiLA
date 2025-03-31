import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" }); // load shared env
dotenv.config(); // load server env

// pool of connection, no need for new connection each query
export const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise(); // use async/await instead of callbacks for queries
