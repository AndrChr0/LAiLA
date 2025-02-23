import decompress from "decompress";
import path from "path";
import fs from "fs";

// FOR TESTING: zip has to be in server folder

async function decompressZip(zip, allowedExtensions) {
  try {
    // Ensure the dist directory exists
    if (!fs.existsSync("dist")) {
      fs.mkdirSync("dist");
    }

    // Decompress the zip file and filter out file types that are not allowed
    const files = await decompress(zip, "dist", {
      filter: (file) =>
        // EXAMPLE: allowedExtensions = [".js", ".css", ".html"] (include DOTS)
        allowedExtensions.includes(path.extname(file.path)),
    });

    const allFilesContent = [];
    for (let file of files) {
      const filePath = path.join("dist", file.path);
      // Read the path and content of each file and push it to the allFilesContent array
      const content = fs.readFileSync(filePath, "utf-8");
      allFilesContent.push(file.path + content);
    }

    return allFilesContent;
  } catch (error) {
    console.log("decompressZip error", error);
  }
}

const getZipcontents = async (req, res) => {
  const zipFile = req.body.zipFile;
  const allowedExtensions = req.body.allowedExtensions;

  if (!zipFile || !allowedExtensions) {
    console.log("Missing zipFile or allowedExtensions in request body");
    return res
      .status(400)
      .send("Missing zipFile or allowedExtensions in request body");
  }

  const zipContents = await decompressZip(zipFile, allowedExtensions);
  console.log("Zip contents:", zipContents);
  res.send(zipContents);
};

export default getZipcontents;
