import axios from "axios";
import UploadAssignmentAssessment from "../../components/UploadAssignmentAssessment";
import { useUserData } from "../../context/UserContext";
import { useAuth } from "../../context/AuthContext";
import instance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import getOneAssignment from "../../utils/fetches/getOneAssignment";

function StudentAssignmentAssessmentPage() {
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [previousFeedback, setPreviousFeedback] = useState([]);
  const path = useParams();
  const assignmentId = parseInt(path.id, 10);
  const { userId } = useAuth();

  console.log("User ID:", userId);
  useEffect(() => {
    instance
      .get(`api/assignments/${assignmentId}`)
      .then((response) => {
        setCurrentAssignment(response.data);
      })
      .catch((error) => {
        console.error("Error fetching assignment:", error);
      });
  }, [assignmentId]);

  useEffect(() => {
    instance
      .get(`api/feedback?student_id=${userId}`)
      .then((response) => {
        console.log("Feedback API Response:", response.data);

        setPreviousFeedback(
          response.data.filter(
            (feedback) => feedback.assignment_id === assignmentId
          )
        );

        // console.log("assignment ID:", assignmentId);
        // console.log("Feedback for this assignment:", previousFeedback);
      })
      .catch((error) => {
        console.error("Error fetching feedback:", error);
      });
  }, [userId, assignmentId]);

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
        <UploadAssignmentAssessment
          assignmentId={currentAssignment.assignment_id}
          filetypes={currentAssignment.allowed_filetypes}
          description={currentAssignment.assignment_description}
          criteria={currentAssignment.assignment_criteria}
        />
      ) : null}

      {previousFeedback.length > 0 ? (
        <div>
          <h2>Previous Feedback</h2>
          {previousFeedback.map((feedback) => (
            <div key={feedback.feedback_id}>
              <h3>Attempt #{feedback.attempt_nr}</h3>
              <div className='flex'>
                <div className='border-r-2 border-gray-300 pr-4'>
                  <h4>Feedback:</h4>
                  <p>{feedback.general_comment}</p>
                </div>
                <div>
                  <h4>Suggested Result:</h4>
                  <p
                    className={
                      feedback.suggested_result === "pass"
                        ? "text-green-500"
                        : feedback.suggested_result === "fail"
                        ? "text-red-500"
                        : ""
                    }
                  >
                    {feedback.suggested_result}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You have yet to receive any feedback</p>
      )}
    </>
  );
}

export default StudentAssignmentAssessmentPage;
