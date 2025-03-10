import dotenv from "dotenv";
dotenv.config();
import { pool as SQLpool } from "../utils/SQLPool.js";
const pool = SQLpool;

// get all assignments (for user) - auth(S/L)
// (req.body would be JWT attribute once authentication is integrated)
export async function getAllAssignments(req, res) {
  if (req.query.course_coordinator) {
    const [rows] = await pool.query(
      `
            SELECT a.assignment_id, assignment_title, assignment_start_date, assignment_end_date, is_active, is_public, assignment_description, assignment_criteria, a.course_id, max_score, pass_threshold, GROUP_CONCAT(af.filetype ORDER BY af.filetype SEPARATOR ', ') AS allowed_filetypes, assignment_attempts
            FROM assignments a
            JOIN courses c ON a.course_id = c.course_id
            LEFT JOIN assignment_filetypes af ON a.assignment_id = af.assignment_id
            WHERE c.course_coordinator = ?
            GROUP BY a.assignment_id;
            `,
      [req.query.course_coordinator]
    );
    if (rows.length > 0) {
      res.send(rows);
    } else {
      res.send("No assignments found");
    }
  } else if (req.query.student_id) {
    const [rows] = await pool.query(
      `
            SELECT a.assignment_id, assignment_title, assignment_start_date, assignment_end_date, is_active, assignment_description, a.course_id, max_score, pass_threshold, GROUP_CONCAT(af.filetype ORDER BY af.filetype SEPARATOR ', ') AS allowed_filetypes, assignment_attempts
            FROM assignments a
            JOIN enrollment e ON a.course_id = e.course_id
            LEFT JOIN assignment_filetypes af ON a.assignment_id = af.assignment_id
            WHERE e.student_id = ? AND is_public = TRUE
            GROUP BY a.assignment_id;
            `,
      [req.query.student_id]
    );
    if (rows.length > 0) {
      res.send(rows);
    } else {
      res.send("No assignments found");
    }
  } else {
    res.send("Unknown user type");
  }
}

// removed, might want eventually, but not for now
// // get one assignment - auth(S/L)[w/ course]
// export async function getOneAssignment(req, res) {
//   // frontend would determine which we use
//   // const [rows] = await pool.query(`SELECT * FROM assignments WHERE course_id = ?`, [req.body.course_id]); // is not using course_id in path
//   const [rows] = await pool.query(
//     `SELECT * FROM assignments WHERE assignment_id = ?`,
//     [req.params.assignment_id]
//   );
//   if (rows.length > 0 && req.params.assignment_id - 1 < rows.length) {
//     res.send(rows[req.params.assignment_id - 1]);
//   } else {
//     res.send("This assignment does not exist");
//   }
// }

// OLANSK - can you please look over??
export async function getOneAssignment(req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT a.assignment_id, assignment_title, assignment_start_date, assignment_end_date, is_active, is_public, assignment_description, assignment_criteria, a.course_id, max_score, pass_threshold, assignment_attempts, GROUP_CONCAT(af.filetype ORDER BY af.filetype SEPARATOR ', ') AS allowed_filetypes
       FROM assignments a
       LEFT JOIN assignment_filetypes af ON a.assignment_id = af.assignment_id
       WHERE a.assignment_id = ?`,
      [req.params.assignment_id]
    );

    if (rows.length > 0) {
      res.send(rows[0]);
    } else {
      res.status(404).send("This assignment does not exist");
    }
  } catch (error) {
    console.error("Error fetching assignment:", error);
    res.status(500).send("An error occurred while fetching the assignment");
  }
}

// post assignment - auth(L)
export async function createAssignment(req, res) {
  if (
    req.body.assignment_title &&
    req.body.assignment_start_date &&
    req.body.assignment_end_date &&
    req.body.is_active &&
    req.body.is_public &&
    req.body.assignment_description &&
    req.body.assignment_criteria &&
    req.body.course_id &&
    req.body.max_score &&
    req.body.pass_threshold &&
    req.body.assignment_attempts &&
    req.body.allowed_filetypes
  ) {
    if (!Array.isArray(req.body.allowed_filetypes)) {
      return res.status(400).send("allowed_filetypes must be an array");
    }
    const [result] = await pool.query(
      `
            INSERT INTO assignments (assignment_title, assignment_start_date, assignment_end_date, is_active, is_public, assignment_description, assignment_criteria, course_id, max_score, pass_threshold, assignment_attempts)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `,
      [
        req.body.assignment_title,
        req.body.assignment_start_date,
        req.body.assignment_end_date,
        req.body.is_active,
        req.body.is_public,
        req.body.assignment_description,
        req.body.assignment_criteria,
        req.body.course_id,
        req.body.max_score,
        req.body.pass_threshold,
        req.body.assignment_attempts,
      ]
    );

    const assignmentID = result.insertId;
    const filetypes = req.body.allowed_filetypes;

    if (filetypes.length > 0) {
      await Promise.all(
        filetypes.map(async (filetype) =>
          pool.query(
            `
                        INSERT INTO assignment_filetypes (assignment_id, filetype)
                        VALUES (?, ?);
                        `,
            [assignmentID, filetype]
          )
        )
      );
    }

    res.send("Successfully created assignment");
  } else {
    res.send("Missing attributes");
  }
}

// put/patch assignment details - auth(L)   (only before submissions?)
export async function updateAssignment(req, res) {
  if (!Object.keys(req.body).length) {
    return res.status(400).send("No values to alter");
  }

  // update assignment
  const [result] = await pool.query(
    `
        UPDATE assignments
        SET
            assignment_title = COALESCE(?, assignment_title),
            assignment_start_date = COALESCE(?, assignment_start_date),
            assignment_end_date = COALESCE(?, assignment_end_date),
            is_active = COALESCE(?, is_active),
            is_public = COALESCE(?, is_public),
            assignment_description = COALESCE(?, assignment_description),
            assignment_criteria = COALESCE(?, assignment_criteria),
            max_score = COALESCE(?, max_score),
            pass_threshold = COALESCE(?, pass_threshold),
            assignment_attempts = COALESCE(?, assignment_attempts)
        WHERE assignment_id = ?;
        `,
    [
      req.body.assignment_title,
      req.body.assignment_start_date,
      req.body.assignment_end_date,
      req.body.is_active,
      req.body.is_public,
      req.body.assignment_description,
      req.body.assignment_criteria,
      req.body.max_score,
      req.body.pass_threshold,
      req.body.assignment_attempts,
      req.params.assignment_id,
    ]
  );

  // update filetypes if needed
  if (req.body.allowed_filetypes) {
    if (!Array.isArray(req.body.allowed_filetypes)) {
      return res.status(400).send("allowed_filetypes must be an array");
    }

    const newFiletypes = req.body.allowed_filetypes;

    // find which filetypes the assignment already has
    const [existingRows] = await pool.query(
      `
            SELECT filetype
            FROM assignment_filetypes
            WHERE assignment_id = ?;
            `,
      [req.params.assignment_id]
    );
    const existingFiletypes = existingRows.map((row) => row.filetype);

    // find differences between patch request and DB
    const filetypesToAdd = newFiletypes.filter(
      (ft) => !existingFiletypes.includes(ft)
    );
    const filetypesToRemove = existingFiletypes.filter(
      (ft) => !newFiletypes.includes(ft)
    );

    // insert new touples
    if (filetypesToAdd.length > 0) {
      const values = filetypesToAdd.map((ft) => [req.params.assignment_id, ft]);
      await pool.query(
        `
                INSERT INTO assignment_filetypes (assignment_id, filetype)
                VALUES ?;
                `,
        [values]
      );
    }

    // remove outdated touples
    if (filetypesToRemove.length > 0) {
      await pool.query(
        `
                DELETE FROM assignment_filetypes
                WHERE assignment_id = ?
                AND filetype IN (?);
                `,
        [req.params.assignment_id, filetypesToRemove]
      );
    }
  }

  res.send("Successfully updated assignment");
}

// delete assignment
