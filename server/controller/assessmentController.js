import dotenv from "dotenv";
dotenv.config({ path: "../.env" }); // load shared env
dotenv.config(); // load server env
import { pool as SQLpool } from "../utils/SQLPool.js";
const pool = SQLpool;

// get all
// for lecturers
export async function getAssignmentAssessments(req, res, next) {
  try {
    const [rows] = await pool.query(
      `
            SELECT
                fa.assessment_id,
                CONCAT(u.first_name, ' ', u.last_name) AS student_name,
                fa.assignment_id,
                a.assignment_title,
                fa.submission_date,
                fa.assessment_contents,
                fa.assessment_result,
                fa.is_reviewed,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'file_contents', sw.file_contents,
                        'filetype', sw.filetype,
                        'filepath', sw.filepath
                    )
                ) AS student_work
            FROM final_assessments fa
            LEFT JOIN users u ON fa.student_id = u.user_id
            LEFT JOIN assignments a ON fa.assignment_id = a.assignment_id
            LEFT JOIN student_work sw ON fa.assessment_id = sw.assessment_id
            WHERE fa.assignment_id = ?
            GROUP BY fa.assessment_id;
            `,
      [req.params.assignment_id]
    );

    if (rows.length == 0) {
      throw Object.assign(new Error("No assessments found"), { status: 404 });
    }

    for (let i = 0; i < rows.length; i++) {
      const localDate = new Date(rows[i].submission_date);

      // .toLocaleString() formats the date and time correctly in the local timezone.
      rows[i].submission_date = localDate.toLocaleString("sv-SE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    }

    return res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
}
// for students
export async function getMyAssessments(req, res, next) {
  try {
    const [rows] = await pool.query(
      `
            SELECT
                fa.assessment_id,
                CONCAT(u.first_name, ' ', u.last_name) AS student_name,
                fa.assignment_id,
                a.assignment_title,
                fa.submission_date,
                fa.assessment_contents,
                fa.assessment_result,
                fa.is_reviewed,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'file_contents', sw.file_contents,
                        'filetype', sw.filetype,
                        'filepath', sw.filepath
                    )
                ) AS student_work
            FROM final_assessments fa
            LEFT JOIN users u ON fa.student_id = u.user_id
            LEFT JOIN assignments a ON fa.assignment_id = a.assignment_id
            LEFT JOIN student_work sw ON fa.assessment_id = sw.assessment_id
            WHERE student_id = ?
            GROUP BY fa.assessment_id;
            `,
      [req.user.id]
    );

    if (rows.length == 0) {
      throw Object.assign(new Error("No assessments found"), { status: 404 });
    }

    // remove time from date attributes
    for (let i = 0; i < rows.length; i++) {
      rows[i].submission_date = new Date(
        rows[i].submission_date
      ).toLocaleDateString("sv-SE");
    }

    return res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
}

// get one
export async function getOneAssessment(req, res, next) {
  try {
    const [rows] = await pool.query(
      `
            SELECT
                fa.assessment_id,
                CONCAT(u.first_name, ' ', u.last_name) AS student_name,
                fa.assignment_id,
                a.assignment_title,
                fa.submission_date,
                fa.assessment_contents,
                fa.assessment_result,
                fa.is_reviewed,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'file_contents', sw.file_contents,
                        'filetype', sw.filetype,
                        'filepath', sw.filepath
                    )
                ) AS student_work
            FROM final_assessments fa
            LEFT JOIN users u ON fa.student_id = u.user_id
            LEFT JOIN assignments a ON fa.assignment_id = a.assignment_id
            LEFT JOIN student_work sw ON fa.assessment_id = sw.assessment_id
            WHERE fa.assessment_id = ?
            GROUP BY fa.assessment_id;
            `,
      [req.params.assessment_id]
    );

    if (rows.length == 0) {
      throw Object.assign(new Error("Assessment not found"), { status: 404 });
    }

    rows[0].submission_date = new Date(
      rows[0].submission_date
    ).toLocaleDateString("sv-SE");

    return res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
}

// post / patch
export async function createAssessment(req, res, next) {
  try {
    const [old] = await pool.query(
      `
            SELECT assessment_id
            FROM final_assessments
            WHERE student_id = ? AND assignment_id = ?;
            `,
      [req.body.details.student, req.body.details.assignment]
    );

    if (old.length == 0) {
      // create
      const [result] = await pool.query(
        `
                INSERT INTO final_assessments (student_id, assignment_id, submission_date, assessment_contents, assessment_result)
                VALUES (?, ?, ?, ?, ?);
                `,
        [
          req.body.details.student,
          req.body.details.assignment,
          req.body.details.date,
          JSON.stringify(req.body.details.contents),
          req.body.details.result,
        ]
      );

      const assessmentID = result.insertId;

      for (let i = 0; i < req.body.details.student_work.length; i++) {
        const [work] = await pool.query(
          `
                    INSERT INTO student_work (assessment_id, file_contents, filetype, filepath)
                    VALUES (?, ?, ?, ?);
                    `,
          [
            assessmentID,
            req.body.details.student_work[i].contents,
            req.body.details.student_work[i].type,
            req.body.details.student_work[i].path,
          ]
        );
      }
    } else {
      // update
      // remove old student work
      const [outdated] = await pool.query(
        `
                DELETE FROM student_work
                WHERE assessment_id = ?;
                `,
        [old[0].assessment_id]
      );

      // update assessment
      const [result] = await pool.query(
        `
                UPDATE final_assessments
                SET
                    student_id = ?,
                    assignment_id = ?,
                    submission_date = ?,
                    assessment_contents = ?,
                    assessment_result = ?
                WHERE assessment_id = ?;
                `,
        [
          req.body.details.student,
          req.body.details.assignment,
          req.body.details.date,
          JSON.stringify(req.body.details.contents),
          req.body.details.result,
          old[0].assessment_id,
        ]
      );

      for (let i = 0; i < req.body.details.student_work.length; i++) {
        const [work] = await pool.query(
          `
                    INSERT INTO student_work (assessment_id, file_contents, filetype, filepath)
                    VALUES (?, ?, ?, ?);
                    `,
          [
            old[0].assessment_id,
            req.body.details.student_work[i].contents,
            req.body.details.student_work[i].type,
            req.body.details.student_work[i].path,
          ]
        );
      }
    }

    return res.status(200).json("Successfully stored information");
  } catch (error) {
    next(error);
  }
}

// patch
export async function evaluateAssessment(req, res, next) {
  try {
    const [assessment] = await pool.query(
      `
            SELECT is_reviewed
            FROM final_assessments
            WHERE assessment_id = ?;
            `,
      [req.params.assessment_id]
    );

    // throw error if the assessment does not exist
    if (assessment.length == 0) {
      throw Object.assign(new Error("Assessment not found"), { status: 404 });
    }

    const date = new Date().toISOString().slice(0, 19).replace("T", " ");

    const [result] = await pool.query(
      `
            UPDATE final_assessments
            SET
                submission_date = ?,
                assessment_contents = COALESCE(?, assessment_contents),
                assessment_result = COALESCE(?, assessment_result),
                is_reviewed = 1
            WHERE assessment_id = ?;
            `,
      [
        date,
        JSON.stringify(req.body.contents),
        req.body.result,
        req.params.assessment_id,
      ]
    );
    return res.status(200).json("Assessment evaluated");
  } catch (error) {
    next(error);
  }
}
