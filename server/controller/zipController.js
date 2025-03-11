import decompress from "decompress";
import path from "path";
import fs from "fs";
import evaluateSubmission from "../AIFunctionalities/aiZipFunctions.js";
import { pool as SQLpool } from "../utils/SQLPool.js";
const pool = SQLpool;

// https://www.geeksforgeeks.org/node-js-fs-rm-method/
function deleteZipFileContent() {
  fs.rm("zipDist", { recursive: true, force: true }, (err) => {
    if (err) {
      console.error("Error removing zipDist folder:", err);
    } else {
      console.log("Deleted zipDist folder.");
      fs.mkdirSync("zipDist");
    }

    fs.rm("ClientZipUploads", { recursive: true, force: true }, (err2) => {
      if (err2) {
        console.error("Error removing ClientZipUploads folder:", err2);
      } else {
        console.log("Deleted ClientZipUploads folder.");
        fs.mkdirSync("ClientZipUploads");
      }
    });
  });
}

async function decompressZip(zipPath, allowedExtensions) {
  try {
    if (!fs.existsSync("zipDist")) {
      fs.mkdirSync("zipDist");
    }

    // Decompress the zip file while filtering out unwanted file types
    const files = await decompress(zipPath, "zipDist", {
      filter: (file) => allowedExtensions.includes(path.extname(file.path)),
    });

    const allFilesContent = [];
    for (let file of files) {
      const filePath = path.join("zipDist", file.path);
      const content = fs.readFileSync(filePath, "utf-8");
      allFilesContent.push(`${file.path}${content}`);
      console.log("Decompressed:", file.path);
    }

    return allFilesContent;
  } catch (error) {
    console.error("decompressZip error:", error);
    throw error;
  }
}

const getZipcontents = async (req, res) => {
  // check that req has everything it needs
  // return error if not
  if (!req.body.assignment_id) {
    return res.status(400).send("Missing attributes");
  } else if (!req.body.student_id) {
    return res.status(401).send("Unauthorized");
  }

  try {
    // get attempt_nr for assignment and user
    // error if too high
    // save num for later
    const [maxAttempts] = await pool.query(
      `
        SELECT assignment_attempts
        FROM assignments
        WHERE assignment_id = ?;
        `,
      [req.body.assignment_id]
    );
    const DBAttempts = maxAttempts[0]["assignment_attempts"];
    const [highestAttempt] = await pool.query(
      `
        SELECT MAX(attempt_nr)
        FROM feedback
        WHERE assignment_id = ? AND student_id = ?;
        `,
      [req.body.assignment_id, req.body.student_id]
    );
    const currentAttempt = highestAttempt[0]["MAX(attempt_nr)"] || 0;

    if (currentAttempt == DBAttempts) {
      return res.status(403).send("Max attempts reached");
    }

    const file = req.file;
    console.log("File uploaded:", file);
    const { allowedExtensions, criteriaString, description } = req.body;

    const parsedExtensions = allowedExtensions.replaceAll('"', "").split(", ");
    console.log("Parsed extensions:", parsedExtensions);

    if (!file) {
      return res.status(400).send("No file was uploaded.");
    }

    // try {
    //   // parsedExtensions = JSON.parse(allowedExtensions);
    // } catch (err) {
    //   console.log("Could not parse allowedExtensions as JSON:", err);
    // }

    // Decompress the zip using the uploaded file path
    const zipContents = await decompressZip(file.path, parsedExtensions);

    if (!zipContents.length) {
      console.log("No files found in zip after filtering.");
      return res.status(400).send("No files found in zip after filtering.");
    }

    // Evaluate
    const evaluatedSubmission = await evaluateSubmission(
      zipContents,
      criteriaString,
      description
    );
    if (evaluatedSubmission) {
      deleteZipFileContent();
    }
    console.log(
      "Evaluated submission:",
      evaluatedSubmission.AI_final_assessment.AI_final_comments
    );

    // get pass threshold and max score
    const [assignmentEvaluationData] = await pool.query(
      `
    SELECT pass_threshold, max_score
    FROM assignments
    WHERE assignment_id = ?;
    `,
      [req.body.assignment_id]
    );

    const passThreshold = assignmentEvaluationData[0]["pass_threshold"];
    const maxScore = assignmentEvaluationData[0]["max_score"];

    // loop through object and calculate total score
    function calculateTotalScore(obj) {
      let totalScore = 0;
      for (const key in obj) {
        // if object, recurse
        if (typeof obj[key] === "object") {
          totalScore += calculateTotalScore(obj[key]);
          // if key is a score, add to total
        } else if (key.endsWith("_score") && !key.endsWith("_max_score")) {
          totalScore += obj[key];
        }
      }
      return totalScore;
    }

    const totalEvaluationScore = calculateTotalScore(evaluatedSubmission);

    // calculate pass/fail
    let resultString;
    if (totalEvaluationScore >= maxScore * passThreshold) {
      resultString = "pass";
    } else {
      resultString = "fail";
    }

    // save to DB
    const [result] = await pool.query(
      `
      INSERT INTO feedback (assignment_id, student_id, feedback_contents, general_comment, suggested_result, attempt_nr)
      VALUES (?, ?, ?, ?, ?, ?);
      `,
      [
        req.body.assignment_id,
        req.body.student_id,
        JSON.stringify(evaluatedSubmission),
        JSON.stringify(
          evaluatedSubmission.AI_final_assessment.AI_final_comments
        ),
        resultString,
        currentAttempt + 1,
      ]
    );

    // only send general_comment(?)
    // to be updated

    const responseObj = {
      general_comment:
        evaluatedSubmission.AI_final_assessment.AI_final_comments,
      result_string: resultString,
    };

    res.send(responseObj);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while decompressing.");
  }
};

export default getZipcontents;
