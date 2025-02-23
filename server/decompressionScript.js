import decompress from "decompress";
import path from "path";
import fs from "fs";

async function decompressZip(zip) {
  try {
    const files = await decompress(zip, "dist", {
      filter: (file) =>
        path.extname(file.path) == ".js" ||
        path.extname(file.path) == ".html" ||
        path.extname(file.path) == ".css",
    });
    // console.log(files);

    const allFilesContent = [];
    for (let file of files) {
      const content = fs.readFileSync(`dist/${file.path}`, "utf-8");
      allFilesContent.push(file.path + content);
    }

    return allFilesContent;
  } catch (error) {
    console.log(error);
  }
}

// const zipContents = await decompressZip("N.zip");

// console.log(zipContents);
