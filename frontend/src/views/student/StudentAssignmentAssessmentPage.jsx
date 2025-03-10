import axios from "axios";
import UploadAssignmentAssessment from "../../components/UploadAssignmentAssessment";
import { useUserData } from "../../context/UserContext";
import instance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import getOneAssignment from "../../utils/fetches/getOneAssignment";

function StudentAssignmentAssessmentPage() {
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const path = useParams();
  const assignmentId = path.id;
  console.log("Assignment ID:", path);

  useEffect(() => {
    instance
      .get(`api/assignments/${assignmentId}`)
      .then((response) => {
        console.log("Assignment API Response:", response.data);
        setCurrentAssignment(response.data);
      })
      .catch((error) => {
        console.error("Error fetching assignment:", error);
      });
  }, [assignmentId]);

  return (
    <>
      {currentAssignment ? (
        <div>
          <h1>{currentAssignment.assignment_title}</h1>
          <p>{currentAssignment.assignment_description}</p>
          <p>Start Date: {currentAssignment.assignment_start_date}</p>
          <p>End Date: {currentAssignment.assignment_end_date}</p>
          <p>
            Criteria: {JSON.stringify(currentAssignment.assignment_criteria)}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {currentAssignment && currentAssignment.is_active === 1 ? (
        <UploadAssignmentAssessment />
      ) : null}
    </>
  );
}

export default StudentAssignmentAssessmentPage;
