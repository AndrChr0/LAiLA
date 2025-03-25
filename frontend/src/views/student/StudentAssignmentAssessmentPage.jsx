import UploadAssignmentAssessment from "../../components/UploadAssignmentAssessment";
import { useAuth } from "../../context/AuthContext";
import instance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { GetConfig } from "../../utils/GetConfig";
import FeedbackCard from "../../components/FeedbackCard";

function StudentAssignmentAssessmentPage() {
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [previousFeedback, setPreviousFeedback] = useState([]);
  const path = useParams();
  const assignmentId = parseInt(path.id, 10);
  const { userId, token } = useAuth();

  // get assignment details
  useEffect(() => {
    instance
      .get(`api/assignments/${assignmentId}`, GetConfig(token))
      .then((response) => {
        setCurrentAssignment(response.data);
      })
      .catch((error) => {
        console.error("Error fetching assignment:", error);
      });
  }, [assignmentId]);

  // get previous feedback
  useEffect(() => {
    instance
      .get(`api/feedback?student_id=${userId}`, GetConfig(token))
      .then((response) => {
        console.log("Feedback API Response:", response.data);

        setPreviousFeedback(
          response.data.filter(
            (feedback) => feedback.assignment_id === assignmentId
          )
        );
      })
      .catch((error) => {
        console.error("Error fetching feedback:", error);
      });
  }, [userId, assignmentId]);

  // calculate nr of attempts
  let totalAttempts = 0;
  previousFeedback.forEach((feedback) => {
    if (feedback.attempt_nr > totalAttempts) {
      totalAttempts = feedback.attempt_nr;
    }
  });

  return (
    <>
      {currentAssignment ? (
        <div>
          <h1>{currentAssignment.assignment_title}</h1>
          <p>Start Date: {currentAssignment.assignment_start_date}</p>
          <p>End Date: {currentAssignment.assignment_end_date}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {currentAssignment &&
        totalAttempts >= currentAssignment.assignment_attempts && (
          <p className='font-bold'>
            You have reached the maximum number of attempts
          </p>
        )}
      {currentAssignment &&
      currentAssignment.is_active === 1 &&
      totalAttempts < currentAssignment.assignment_attempts ? (
        <UploadAssignmentAssessment
          assignmentId={currentAssignment.assignment_id}
          filetypes={currentAssignment.allowed_filetypes}
          description={currentAssignment.assignment_description}
          criteria={currentAssignment.assignment_criteria}
        />
      ) : null}

      {previousFeedback.length > 0 ? (
        <div>
          <h2 className='font-bold'>Previous Feedback</h2>
          {previousFeedback.map((feedback) => (
        <FeedbackCard feedback={feedback} keyValue={feedback.feedback_id} />
          ))}
        </div>
      ) : (
        <p>You have yet to receive any feedback</p>
      )}
    </>
  );
}

export default StudentAssignmentAssessmentPage;
