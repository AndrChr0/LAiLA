import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function UploadAssignmentAssessment({
  assignmentId,
  filetypes,
  description,
  criteria,
}) {
  const [feedback, setFeedback] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { userId, userRole } = useAuth();

  const criteriaString = JSON.stringify(criteria);

  // demo - fix selection
  // const allowedExtensions = [".css", ".html"];

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  console.log("file:", file);

  async function uploadFile() {
    try {
      if (!file) {
        setError("Please upload a zip file.");
        return;
      }

      if (file.name.split(".").pop() !== "zip") {
        setError("Please upload a zip file.");
        return;
      }

      setError("");
      setLoading(true);

      console.log("Uploading file...");

      const formData = new FormData();
      // zipUpload - see multer config in zipRoutes.js
      formData.append("zipUpload", file);

      formData.append("allowedExtensions", JSON.stringify(filetypes));

      formData.append("criteriaString", criteriaString);

      formData.append("description", description);

      formData.append("assignment_id", assignmentId);

      formData.append("student_id", userId);

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
      setFile(null);
      setFeedback(response.data || "");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <div className='flex flex-col'>
      <ul className='text-red-900'>
        <li>ID: {assignmentId}</li>
        <li>Filetypes: {filetypes}</li>
        <li>Description: {description}</li>
        <li>Criteria: {JSON.stringify(criteria)}</li>
      </ul>
      <h2 className='font-light text-xl'>Upload Project Zip file</h2>
      <div className='flex flex-col w-4/5'>
        <input
          className='p-2 m-2 border border-gray-300 bg-gray-50 rounded hover:bg-gray-100 hover:cursor-pointer'
          type='file'
          name='zipUpload'
          onChange={handleFileChange}
        />
        {file && !loading && (
          <button
            disabled={loading}
            className='h-10 px-5 m-2 text-white transition-colors duration-150 bg-[#2b6cb0] rounded-lg focus:shadow-outline hover:bg-[#2c5282]'
            onClick={uploadFile}
          >
            Submit
          </button>
        )}
      </div>
      {error && <p className='text-red-500'>{error}</p>}
      {loading && <p>Processing...</p>}
      {feedback && (
        <div>
          <h3 className='font-bold'>Feedback comment:</h3>
          <p>{feedback.general_comment}</p>
          <h3 className='font-bold'>Suggested grade</h3>
          {feedback.result_string === "pass" ? (
            <p className='text-green-500'>Pass</p>
          ) : (
            <p className='text-red-500'>Fail</p>
          )}
        </div>
        // general_comment, result_string
      )}
    </div>
  );
}

export default UploadAssignmentAssessment;
