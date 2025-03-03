import React, { useState } from "react";
import axios from "axios";

function UploadAssignmentAssessment() {
  const [feedback, setFeedback] = useState("");
  const [file, setFile] = useState(null);

  // demo - fix selection
  const allowedExtensions = [".css", ".html"];

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  async function uploadFile() {
    try {
      if (!file) {
        alert("Please select a .zip file first!");
        return;
      }
      console.log("Uploading file...");

      const formData = new FormData();
      // zipUpload - see multer config in zipRoutes.js
      formData.append("zipUpload", file);

      formData.append("allowedExtensions", JSON.stringify(allowedExtensions));

      const response = await axios.post(
        "http://localhost:5310/api/ai/decompress",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Server response:", response.data);
      setFeedback(response.data?.final_assessments?.final_comments || "");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <h2>Upload Project Zip file</h2>
      <input
        className='border border-gray-400 p-2'
        type='file'
        name='zipUpload'
        onChange={handleFileChange}
      />
      <button onClick={uploadFile}>Submit</button>
      {feedback && (
        <div>
          <h3>Feedback:</h3>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
}

export default UploadAssignmentAssessment;
