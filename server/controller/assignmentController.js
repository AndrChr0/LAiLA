import dotenv from "dotenv";
dotenv.config({ path: "../.env" }); // load shared env
dotenv.config(); // load server env
import { pool as SQLpool } from "../utils/SQLPool.js";
const pool = SQLpool;

// get all assignments
export async function getAllAssignments(req, res, next) {
  try {
    if (req.user.role == "lecturer") {
      const [rows] = await pool.query(
        `
			

        SELECT a.assignment_id, a.assignment_title, a.assignment_start_date, a.assignment_end_date, a.is_active, a.is_public, a.assignment_description, a.assignment_criteria, a.course_id, c.course_name, c.course_code, a.max_score, a.pass_threshold, GROUP_CONCAT(DISTINCT af.filetype ORDER BY af.filetype SEPARATOR ', ') AS allowed_filetypes, a.assignment_attempts, COUNT(DISTINCT fa.assessment_id) AS total_assessments_not_reviewed
        FROM assignments a
        JOIN courses c ON a.course_id = c.course_id
        LEFT JOIN final_assessments fa ON a.assignment_id = fa.assignment_id AND fa.is_reviewed = 0
        LEFT JOIN assignment_filetypes af ON a.assignment_id = af.assignment_id
        WHERE c.course_coordinator = ?
        GROUP BY a.assignment_id;
				`,
        [req.user.id]
      );

      if (rows.length == 0) {
        throw Object.assign(new Error("No assignments found"), { status: 404 });
      }

      return res.status(200).json(rows);
    } else if (req.user.role == "student") {
      const [rows] = await pool.query(
        `
				SELECT a.assignment_id, a.assignment_title, a.assignment_start_date, a.assignment_end_date, a.is_active, a.is_public, a.assignment_description, a.course_id, c.course_name, c.course_code, a.max_score, a.pass_threshold, GROUP_CONCAT(af.filetype ORDER BY af.filetype SEPARATOR ', ') AS allowed_filetypes, a.assignment_attempts
				FROM assignments a
				JOIN enrollment e ON a.course_id = e.course_id
        		JOIN courses c ON a.course_id = c.course_id
				LEFT JOIN assignment_filetypes af ON a.assignment_id = af.assignment_id
				WHERE e.student_id = ? 
				GROUP BY a.assignment_id, c.course_name;
				`,
        [req.user.id]
      );

      if (rows.length == 0) {
        throw Object.assign(new Error("No assignments found"), { status: 404 });
      }

      return res.status(200).json(rows);
    } else {
      throw Object.assign(new Error("Unknown user type"), { status: 400 });
    }
  } catch (error) {
    next(error);
  }
}

// get one assignment
export async function getOneAssignment(req, res, next) {
  try {
    const [rows] = await pool.query(
      `
			SELECT a.assignment_id, assignment_title, assignment_start_date, assignment_end_date, is_active, is_public, assignment_description, assignment_criteria, a.course_id, max_score, pass_threshold, assignment_attempts, GROUP_CONCAT(af.filetype ORDER BY af.filetype SEPARATOR ', ') AS allowed_filetypes
			FROM assignments a
			LEFT JOIN assignment_filetypes af ON a.assignment_id = af.assignment_id
			WHERE a.assignment_id = ? 
			GROUP BY a.assignment_id;
			`,
      [req.params.assignment_id]
    );

    if (rows.length == 0) {
      throw Object.assign(new Error("This assignment does not exist"), {
        status: 404,
      });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    next(error);
  }
}

// post assignment
export async function createAssignment(req, res, next) {
  try {
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
        throw Object.assign(new Error("allowed_filetypes must be an array"), {
          status: 400,
        });
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

      return res.status(200).json("Successfully created assignment");
    } else {
      throw Object.assign(new Error("Missing attributes"), { status: 400 });
    }
  } catch (error) {
    next(error);
  }
}

// put/patch assignment details
export async function updateAssignment(req, res, next) {
  try {
    if (!Object.keys(req.body).length) {
      throw Object.assign(new Error("No values to alter"), { status: 400 });
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
        throw Object.assign(new Error("allowed_filetypes must be an array"), {
          status: 400,
        });
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
        const values = filetypesToAdd.map((ft) => [
          req.params.assignment_id,
          ft,
        ]);
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

    return res.status(200).json("Successfully updated assignment");
  } catch (error) {
    next(error);
  }
}

// delete assignment
export async function deleteAssignment(req, res, next) {
  try {
    // check if answered
    const [answers] = await pool.query(
      `
			SELECT feedback_id
			FROM feedback
			WHERE assignment_id = ?
			`,
      [req.params.assignment_id]
    );

    if (answers.length) {
      throw Object.assign(new Error("Assignment has already been answered"), {
        status: 403,
      });
    }

    const [results] = await pool.query(
      `
			UPDATE assignments
			SET is_deleted = 1, is_public = 0
			WHERE assignment_id = ?;
			`,
      [req.params.assignment_id]
    );

    return res.status(200).json("Successfully deleted assignment");
  } catch (error) {
    next(error);
  }
}

// remove later
export async function undeleteAssignment(req, res, next) {
  try {
    const [results] = await pool.query(
      `
			UPDATE assignments
			SET is_deleted = 0, is_public = 1
			WHERE assignment_id = ?;
			`,
      [req.params.assignment_id]
    );

    return res.status(200).json("Successfully undeleted assignment");
  } catch (error) {
    next(error);
  }
}
