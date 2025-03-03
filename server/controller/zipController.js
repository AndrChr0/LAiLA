import decompress from "decompress";
import path from "path";
import fs from "fs";
import evaluateSubmission from "../AIFunctionalities/aiZipFunctions.js";

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
  try {
    const file = req.file;
    console.log("File uploaded:", file);
    const { allowedExtensions } = req.body;
    let parsedExtensions = [];

    if (!file) {
      return res.status(400).send("No file was uploaded.");
    }

    try {
      parsedExtensions = JSON.parse(allowedExtensions);
    } catch (err) {
      console.log("Could not parse allowedExtensions as JSON:", err);
    }

    // Decompress the zip using the uploaded file path
    const zipContents = await decompressZip(file.path, parsedExtensions);

    if (!zipContents.length) {
      console.log("No files found in zip after filtering.");
      return res.status(400).send("No files found in zip after filtering.");
    }

    // Evaluate
    const evaluatedSubmission = await evaluateSubmission(zipContents);
    if (evaluatedSubmission) {
      deleteZipFileContent();
    }
    res.send(evaluatedSubmission);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while decompressing.");
  }
};

export default getZipcontents;
