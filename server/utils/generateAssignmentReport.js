import { aggregateAssignmentFeedback } from "../AIFunctionalities/aiAggregatedAssignmentFeedback.js";
import { pool as SQLpool } from "./SQLPool.js";
const pool = SQLpool;

export async function generateAssignmentReport(
  assignment_id,
  isManuallyCreated
) {
  // fetch all of the most recent feedback

  const [manualCreationCount] = await pool.query(
    `SELECT COUNT(isManuallyCreated)
FROM assignment_reports
WHERE assignment_id = ?;`,
    [assignment_id]
  );

  console.log(manualCreationCount[0]["COUNT(isManuallyCreated)"]);
  if (manualCreationCount[0]["COUNT(isManuallyCreated)"] >= 5) {
    throw Object.assign(
      new Error("Max number of manually created reports reached"),
      { status: 403 }
    );
  }

  const [rows] = await pool.query(
    `
        WITH FeedbackForReport AS (
            SELECT *,
                ROW_NUMBER() OVER (PARTITION BY assignment_id, student_id ORDER BY attempt_nr DESC) AS rn
            FROM feedback
        )
        SELECT feedback_contents, suggested_result, attempt_nr
        FROM FeedbackForReport
        WHERE rn = 1 AND assignment_id = ?;
        `,
    [assignment_id]
  );

  // throw an error if there is none
  if (rows.length == 0) {
    throw Object.assign(new Error("No feedback found"), { status: 404 });
  }

  // handle the data
  const feedbackContents = [];
  const metaData = {
    passRate: 0,
    failRate: 0,
    totalFeedback: 0,
    uniqueStudents: rows.length,
  };

  // populate metaData object based on the data
  for (let i = 0; i < rows.length; i++) {
    feedbackContents.push(JSON.stringify(rows[i]["feedback_contents"]));
    rows[i]["suggested_result"] == "pass"
      ? metaData.passRate++
      : metaData.failRate++;
    metaData.totalFeedback += rows[i]["attempt_nr"];
  }

  // check data for last report
  const [latestReport] = await pool.query(
    `
        SELECT total_feedback, report_nr
        FROM assignment_reports
        WHERE assignment_id = ?
        ORDER BY report_nr DESC;
        `,
    [assignment_id]
  );

  let currentReport;
  if (latestReport.length == 0) {
    currentReport = 0;
  } else {
    currentReport = latestReport[0].report_nr;
  }

  // throw an error if a report cannot be made
  if (
    currentReport > 0 &&
    latestReport[0].total_feedback >= metaData.totalFeedback
  ) {
    throw Object.assign(new Error("No new feedback since the last report"), {
      status: 403,
    });
  }

  // fetch assignment information
  const [aiData] = await pool.query(
    `
        SELECT assignment_description, assignment_criteria
        FROM assignments
        WHERE assignment_id = ?
        `,
    [assignment_id]
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

  let isManuallyCreatedReport = isManuallyCreated;
  if (!isManuallyCreatedReport) {
    isManuallyCreatedReport = false;
  }

  // add to DB
  const [result] = await pool.query(
    `
        INSERT INTO assignment_reports (assignment_id, report_nr, report_contents, students_passed, students_failed, total_feedback, students_evaluated, isManuallyCreated)
        VALUES (?, ?, ?, ?, ?, ?, ?, COALESCE(?, false));
        `,
    [
      assignment_id,
      currentReport + 1,
      JSON.stringify(newReport),
      metaData.passRate,
      metaData.failRate,
      metaData.totalFeedback,
      metaData.uniqueStudents,
      isManuallyCreatedReport,
    ]
  );

  // get the latest assignment_report
  const [newestReport] = await pool.query(
    `
     SELECT ar.report_id, ar.assignment_id, ar.report_nr, ar.report_contents, ar.students_passed, ar.students_failed, ar.total_feedback, ar.students_evaluated, ar.isManuallyCreated, a.assignment_title, c.course_name
FROM assignment_reports ar
JOIN assignments a ON a.assignment_id = ar.assignment_id
JOIN courses c on c.course_id = a.course_id
where report_id = ?;
    `,
    [result.insertId]
  );

  console.log(newestReport);

  return newestReport;
}
