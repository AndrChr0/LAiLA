import decompress from "decompress";
import path from "path";
import fs from "fs";
import { evaluateSubmission } from "../AIFunctionalities/aiAssignmentEvaluation.js";
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
const studentWork = [];
    const allFilesContent = [];
    for (let file of files) {
      const filePath = path.join("zipDist", file.path);
      const content = fs.readFileSync(filePath, "utf-8");
      const ext = path.extname(file.path);
     
      allFilesContent.push(`${ext}\n${file.path}${content}`);
      studentWork.push({ path: file.path, type: ext, contents: content });
      console.log("Decompressed:", file.path);
    }


   return { zipContents: allFilesContent, studentWork: studentWork};

  } catch (error) {
    console.error("decompressZip error:", error);
    throw error;
  }
}

export const getZipcontents = async (req, res, next) => {
  // check that req has what it needs
  if (!req.body.assignment_id) {
    throw Object.assign(new Error("Missing attributes"), { status: 400 });
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
      throw Object.assign(new Error("Max attempts reached"), { status: 403 });
    }

    const file = req.file;
    console.log("File uploaded:", file);
    const { allowedExtensions, criteriaString, description } = req.body;

    const parsedExtensions = allowedExtensions.replaceAll('"', "").split(", ");
    console.log("Parsed extensions:", parsedExtensions);

    if (!file) {
      throw Object.assign(new Error("No file was uploaded"), { status: 400 });
    }

    // zipContents is an array of strings, each string is a file's content - is sent to AI
    // studentWork is an array of objects, each object is a file's path, filetype, and content - is saved to final assessment
    const {zipContents, studentWork } = await decompressZip(file.path, parsedExtensions);


    if (!zipContents.length) {
      throw Object.assign(new Error("No files found in zip after filtering"), {
        status: 400,
      });
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
    // console.log(
    //   "Evaluated submission:",
    //   evaluatedSubmission.AI_final_assessment.AI_final_comments
    // );

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

    // sanitize feedback JSON - remove score/max score
    function sanitizeFeedback(obj) {
      for (const key in obj) {
        if (typeof obj[key] === "object") {
          sanitizeFeedback(obj[key]);
        } else if (key.endsWith("_score") || key.endsWith("_max_score")) {
          delete obj[key];
        }
      }
      return obj;
    }

    const sanitizedSubmission = sanitizeFeedback(evaluatedSubmission);


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

    const responseObj = {
      general_comment:
        evaluatedSubmission.AI_final_assessment.AI_final_comments,
      result_string: resultString,
    };



    // INSERT final submission logic to db

//  student id        - req.body

// assignment id     - req.body

// feedback contents - evaluatedSubmission obj trenger å bli parsa 

// result(fail/Pass) - resultString

// student work      - studentWork Object [n{}]

// -path, filtype, contents
console.log('student id', req.body.student_id);
console.log('assignment id', req.body.assignment_id);
console.log('feedback contents', sanitizeFeedback(evaluatedSubmission));
console.log('result(fail/Pass)', resultString);
console.log("studentWork", studentWork);



    return res.status(200).json(responseObj);
  } catch (error) {
    next(error);
  }
};
