import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import { pool as SQLpool } from "../utils/SQLPool.js";
const pool = SQLpool;

// cronjob function to find assignments with feedback
export async function checkFeedbackProgress() {
    try {
        // get assignments that are active
        const [activeAssignments] = await pool.query(`
            SELECT f.assignment_id
            FROM feedback f
            JOIN assignments a ON f.assignment_id = a.assignment_id
            WHERE a.is_active = 1
            GROUP BY f.assignment_id;`
        );

        // console.log(activeAssignments);

        for (let i = 0; i < activeAssignments.length; i++) {
            await requestGenerateReport(activeAssignments[i].assignment_id);
        }
    } catch (error) {
        console.error(error);
    }
}

// function to query report routes to generate report(s)
async function requestGenerateReport(id) {
    try {
        const response = await axios.post(`http://localhost:5310/api/reports/cron/${id}`);
        // console.log("Report generated:", response.data);
    } catch (error) {
        console.error("API request failed:", error.response ? error.response.data : error.message);
    }
}

