import dotenv from "dotenv";
dotenv.config();
import aggregateAssignmentFeedback from "../AIFunctionalities/aiAggregatedAssignmentFeedback.js";
import { pool as SQLpool } from "../utils/SQLPool.js";
const pool = SQLpool;

// get all feedback (for yourself) - auth(S)
export async function getAllFeedback(req, res, next) {
    try {
        if (!req.user.role == "student") {
            throw Object.assign(new Error("Unauthorized"), { status: 401 });
        }

        const [rows] = await pool.query(`
            SELECT feedback_id, assignment_id, general_comment, attempt_nr, suggested_result 
            FROM feedback
            WHERE student_id = ?
            ORDER BY attempt_nr DESC;
            `, [req.user.id]
        );

        if (rows.length == 0) {
            throw Object.assign(new Error("No feedback found"), { status: 404 });
        }

        return res.status(200).json(rows);
    } catch (error) {
        next(error);
    }
}

// get one piece of feedback (for yourself) - auth(S)
export async function getOneFeedback(req, res, next) {
    try {
        if (!req.user.role == "student") {
            throw Object.assign(new Error("Unauthorized"), { status: 401 });
        }

        const [rows] = await pool.query(`
            SELECT feedback_id, assignment_id, general_comment, attempt_nr 
            FROM feedback
            WHERE student_id = ? AND feedback_id = ?;
            `, [req.user.id, req.params.feedback_id]
        );

        if (rows.length == 0) {
            throw Object.assign(new Error("Feedback not found"), { status: 404 });
        }

        return res.status(200).json(rows[0]);
    } catch (error) {
        next(error);
    }
}

// get all feedback JSON (assignment)
export async function generateReport(req, res, next) {
    try {
        // fetch all of the most recent feedback
        const [rows] = await pool.query(`
            WITH FeedbackForReport AS (
                SELECT *,
                    ROW_NUMBER() OVER (PARTITION BY assignment_id, student_id ORDER BY attempt_nr DESC) AS rn
                FROM feedback
            )
            SELECT feedback_contents, suggested_result, attempt_nr
            FROM FeedbackForReport
            WHERE rn = 1 AND assignment_id = ?;
            `, [req.params.assignment_id]
        );

        // throw an error if there is none
        if (rows.length == 0) {
            throw Object.assign(new Error("No feedback found"), { status: 404 });
        }

        // handle the data
        const feedbackContents = [];
        const metaData = {passRate: 0, failRate: 0, totalFeedback: 0, uniqueStudents: rows.length};

        // populate metaData object based on the data
        for (let i = 0; i < rows.length; i++) {
            // feedbackContents.push(rows[i]["general_comment"]);
            feedbackContents.push(JSON.stringify(rows[i]["feedback_contents"]));
            rows[i]["suggested_result"] == "pass" ? metaData.passRate++ : metaData.failRate++;
            metaData.totalFeedback += rows[i]["attempt_nr"];
        }

        // check data for last report
        const [latestReport] = await pool.query(`
            SELECT total_feedback, report_nr
            FROM assignment_reports
            WHERE assignment_id = ? AND report_nr = (SELECT MAX(report_nr)
                                                     FROM assignment_reports
                                                     WHERE assignment_id = ?);
            `, [req.params.assignment_id, req.params.assignment_id]
        );
        const currentReport = latestReport[0].report_nr || 0;

        // throw an error if a report cannot be made
        if (latestReport[0].total_feedback >= metaData.totalFeedback) {
            throw Object.assign(new Error("No new feedback since the last report"), { status: 403 });
        }

        // fetch assignment information
        const [aiData] = await pool.query(`
            SELECT assignment_description, assignment_criteria
            FROM assignments
            WHERE assignment_id = ?
            `, [req.params.assignment_id]
        );

        // throw error if the assignment doesn't exist
        if (aiData.length == 0) {
            throw Object.assign(new Error("Assignment not found"), { status: 404 });
        }

        // AI stuff
        const newReport = await aggregateAssignmentFeedback(
            aiData[0]["assignment_description"],
            aiData[0]["assignment_criteria"],
            feedbackContents
        );

        // add to DB
        const [result] = await pool.query(`
            INSERT INTO assignment_reports (assignment_id, report_nr, report_contents, students_passed, students_failed, total_feedback, students_evaluated)
            VALUES (?, ?, ?, ?, ?, ?, ?);
            `, [
                req.params.assignment_id,
                currentReport+1,
                JSON.stringify(newReport),
                metaData.passRate,
                metaData.failRate,
                metaData.totalFeedback,
                metaData.uniqueStudents
            ]
        );

        return res.status(200).json("Database updated");
    } catch (error) {
        next(error);
    }
}


// cronjob function
export async function checkFeedbackProgress(){
    try {

// get assignments that are active
const [activeAssignments] = await pool.query(
`    SELECT f.assignment_id
    FROM feedback f
    JOIN assignments a ON f.assignment_id = a.assignment_id
    WHERE a.is_active = 1
    GROUP BY f.assignment_id;`
)

console.log(activeAssignments)

for (let i = 0; i < activeAssignments.length; i++) {
    // call ola sine greier
    console.log('new report for')
    console.log(activeAssignments[i])
    
}
}

catch (error) {
    console.log(error);
}
}