import UploadAssignmentAssessment from "../../components/UploadAssignmentAssessment";
import { useAuth } from "../../context/AuthContext";
import instance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { GetConfig } from "../../utils/GetConfig";
import FeedbackCard from "../../components/FeedbackCard";
import BackComponent from '../../components/BackComponent';

function StudentAssignmentAssessmentPage() {
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [previousFeedback, setPreviousFeedback] = useState([]);
  const [attemptsUsed, setAttemptsUsed] = useState(0)
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



  let totalAttempts = 0;
  useEffect(()=>{
    // calculate nr of attempts
    previousFeedback.forEach((feedback) => {
      if (feedback.attempt_nr > totalAttempts) {
        totalAttempts = feedback.attempt_nr;
      }
    });
    setAttemptsUsed(totalAttempts)
  }, [previousFeedback])

  const incrementAttempt = () =>{
    setAttemptsUsed(attemptsUsed+1)
  }


  
  

  return (
    <main>
      <BackComponent destination="/home" />
      {currentAssignment ? (
        <div className="p-4 bg-gray-200 rounded-lg mb-[50px]">
          <h1 className="text-4xl">{currentAssignment.assignment_title}</h1>
          <h2 className="text-2xl text-gray-500">{currentAssignment.course_code} {currentAssignment.course_name}</h2>
          <p className="py-[20px]">Due: {currentAssignment.assignment_end_date.split("T")[0]}</p>
          <p>Attempts: {attemptsUsed}/{currentAssignment.assignment_attempts}</p>
          <p>You have {currentAssignment.assignment_attempts - attemptsUsed} {currentAssignment.assignment_attempts - attemptsUsed <=1 ? "attempt left" : "attempts left"} </p>
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
          onUploadDone={() => incrementAttempt()}
        />
      ) : null}

      {previousFeedback.length > 0 ? (
        <div className="mt-[80px] p-4 border-2 border-gray-200 rounded-lg">
          <h2 className='font-bold'>Previous Feedback</h2>
          {previousFeedback.map((feedback) => (
            <FeedbackCard feedback={feedback} 
             key={feedback.feedback_id} />
          ))}
        </div>
      ) : (
        <p className="mt-[100px]">You have yet to receive any feedback.</p>
      )}
    </main>
  );
}

export default StudentAssignmentAssessmentPage;
