import dotenv from "dotenv";
dotenv.config();
// import aggregateAssignmentFeedback from "../AIFunctionalities/aiAggregatedAssignmentFeedback.js";
import { pool as SQLpool } from "../utils/SQLPool.js";
const pool = SQLpool;

const AIResponsePlaceholder = 
{
    "commonProblems": [
        {
            "problemName": "HTML/CSS Validation Errors",
            "description": "Several submissions contained errors in HTML or CSS code that failed validation, impacting overall quality.",
            "occurrences": 3,
            "recommendedActions": [
                "Encourage students to use validation tools before final submission.",
                "Provide workshops or resources focused on debugging HTML/CSS errors."
            ]
        },
        {
            "problemName": "Positioning and Layout Issues",
            "description": "Some groups struggled with coherent use of absolute/fixed positioning, causing layout overflow or misalignment.",
            "occurrences": 2,
            "recommendedActions": [
                "Offer additional guidance on CSS positioning techniques.",
                "Clarify expectations regarding responsive layout in the assignment instructions."
            ]
        },
        {
            "problemName": "Incomplete Reflection Details",
            "description": "Many reflections on mock-up challenges and sustainability measures lacked depth and concrete examples.",
            "occurrences": 2,
            "recommendedActions": [
                "Provide a detailed rubric or examples of reflective responses.",
                "Encourage students to include specific examples and explanations of design decisions."
            ]
        }
    ],
    "strongAreas": [
        {
            "areaName": "Responsive Design Implementation",
            "description": "Most students successfully implemented mobile-first designs with effective use of media queries."
        },
        {
            "areaName": "Project Structure and Documentation",
            "description": "Students generally adhered to the prescribed folder structure, naming conventions, and external CSS integration."
        }
    ],
        "overallLecturerSuggestions": [
            "Consider offering additional examples or sample reflections to help students deepen their analysis.",
            "Reiterate the importance of code validation and provide resources for common pitfalls in HTML/CSS.",
            "Highlight best practices for CSS positioning and responsive design in follow-up lectures."
    ],
    "additionalNotes": "Overall, students demonstrated strong technical skills in many areas, though further emphasis on reflective practice and detailed sustainability reporting could improve future submissions."
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


        // AI stuff
        const newReport = await aggregateAssignmentFeedback(
            // assignmentDescription,
            // assignmentCriteria,
            feedbackContents
        );
        // logs maybe

        // create array of information passed back to the frontend
        // const reportInfo = [AIResponsePlaceholder, metaData]; // maybe make object
        const reportInfo = [newReport, metaData];

        // return res.status(200).json(metaData);
        return res.status(200).json(reportInfo);
    } catch (error) {
        next(error);
    }
}
