import dotenv from "dotenv";
dotenv.config();
import { pool as SQLpool } from "../utils/SQLPool.js";
const pool = SQLpool;

const AIResponsePlaceholder = 
{
    "commonProblems": [
        {
            "problemName": "Incomplete Documentation",
            "description": "Many submissions lacked sufficient in-code comments and documentation.",
            "occurrences": 2,
            "averageScore": 60.0,
            "recommendedActions": [
                "Include more detailed comments",
                "Review documentation guidelines"
            ]
        },
        {
            "problemName": "Variable Naming Issues",
            "description": "Several students used non-descriptive variable names, making the code harder to understand.",
            "occurrences": 3,
            "averageScore": 55.0,
            "recommendedActions": [
                "Follow standard naming conventions",
                "Use descriptive variable names"
            ]
        }
    ],
    "strongAreas": [
        {
            "areaName": "Code Functionality",
            "description": "Most submissions met the core functional requirements and ran as expected.",
            "averageScore": 85.0,
            "numStudentsAboveThreshold": 3
        },
        {
            "areaName": "Algorithm Implementation",
            "description": "Students correctly implemented key algorithms with appropriate logic.",
            "averageScore": 90.0,
            "numStudentsAboveThreshold": 2
        }
    ],
    "overallLecturerSuggestions": [
        "Emphasize the importance of thorough documentation during lectures",
        "Include a review session on best coding practices and naming conventions"
    ],
    "additionalNotes": "Feedback is based on three submissions; a larger sample may provide more comprehensive insights."
};

// get all feedback (for yourself) - auth(S)
export async function getAllFeedback(req, res, next) {
    try {
        if (!req.query.student_id) {
            throw Object.assign(new Error("Unauthorized"), { status: 401 });
        }
        
        const [rows] = await pool.query(`
            SELECT feedback_id, assignment_id, general_comment, attempt_nr, suggested_result 
            FROM feedback
            WHERE student_id = ?;
            `, [req.query.student_id]
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
        if (!req.query.student_id) {
            throw Object.assign(new Error("Unauthorized"), { status: 401 });
        }

        const [rows] = await pool.query(`
            SELECT feedback_id, assignment_id, general_comment, attempt_nr 
            FROM feedback
            WHERE student_id = ? AND feedback_id = ?;
            `, [req.query.student_id, req.params.feedback_id]
        );

        if (rows.length == 0) {
            throw Object.assign(new Error("Feedback not found"), { status: 404 });
        }

        return res.status(200).json(rows[0]);
    } catch (error) {
        next(error);
    }
}

// get all feedback JSON (assignment) - auth(L)
// threshold to get report (e.g. every 20% participation), each report is standalone (@20% "X% have trouble with Y...", @40% (new)"X% have trouble with Y...")
export async function getFeedbackForSummary(req, res, next) {
    try {
        if (!req.query.course_coordinator) {
            throw Object.assign(new Error("Unauthorized"), { status: 401 });
        }

        // // old query, kept in case we need it later
        // const [rows] = await pool.query(`
        //     SELECT feedback_contents
        //     FROM feedback
        //     WHERE assignment_id = ?;
        //     `, [req.params.assignment_id]
        // );

        // // testing query for DB without much feedback_contents
        // const [rows] = await pool.query(`
        //     WITH FeedbackForReport AS (
        //         SELECT *,
        //             ROW_NUMBER() OVER (PARTITION BY assignment_id, student_id ORDER BY attempt_nr DESC) AS rn
        //         FROM feedback
        //     )
        //     SELECT general_comment, suggested_result, attempt_nr
        //     FROM FeedbackForReport
        //     WHERE rn = 1 AND assignment_id = ?;
        //     `, [req.params.assignment_id]
        // );

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

        // create array of information passed back to the frontend
        const reportInfo = [AIResponsePlaceholder, metaData]; // maybe make object

        // return res.status(200).json(metaData);
        return res.status(200).json(reportInfo);
    } catch (error) {
        next(error);
    }
}
