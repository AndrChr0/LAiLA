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
  if (!req.body.assignment_id || !req.body.assignment_attempts) {
    return res.status(400).send("Missing attributes");
  } else if (!req.body.student_id) {
    return res.status(401).send("Unauthorized");
  }

  try {
    // get attempt_nr for assignment and user
    // error if too high
    // save num for later

    const file = req.file;
    console.log("File uploaded:", file);
    const { allowedExtensions, assignmentId, criteriaString, description } =
      req.body;

    // console.log("Allowed extensions:", allowedExtensions);
    // console.log("Assignment ID:", assignmentId);
    // console.log("Criteria string:", criteriaString);
    // console.log("Description:", description);
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

    // save to DB
    // const [result] = await pool.query(
    //   `
    //   INSERT INTO feedback (assignment_id, student_id, feedback_contents, general_comment, attempt_nr)
    //   VALUES (?, ?, ?, "AAAAAAAAAAAAAAAAAAA", 1);
    //   `,
    //   [
    //     req.body.assignment_id,
    //     req.body.student_id,
    //     JSON.stringify(evaluatedSubmission),
    //   ]
    // );

    // only send general_comment(?)
    res.send(evaluatedSubmission);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while decompressing.");
  }
};

export default getZipcontents;
