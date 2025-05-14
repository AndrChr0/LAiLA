import UploadAssignmentAssessment from "../../components/UploadAssignmentAssessment";
import { useAuth } from "../../context/AuthContext";
import instance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { GetConfig } from "../../utils/GetConfig";
import FeedbackCard from "../../components/FeedbackCard";
import BackComponent from "../../components/BackComponent";
import { Star, Calendar, CircleAlert } from "lucide-react";


function StudentAssignmentAssessmentPage() {
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [previousFeedback, setPreviousFeedback] = useState([]);
  const [attemptsUsed, setAttemptsUsed] = useState(0);
  const [feedback, setFeedback] = useState();

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
  useEffect(() => {
    // calculate nr of attempts
    previousFeedback.forEach((feedback) => {
      if (feedback.attempt_nr > totalAttempts) {
        totalAttempts = feedback.attempt_nr;
      }
    });
    setAttemptsUsed(totalAttempts);
  }, [previousFeedback]);

  const incrementAttempt = () => {
    setAttemptsUsed((prev) => prev + 1);
  };

  return (
    <main>
      <BackComponent destination='/home' />
      {currentAssignment ? (
        <div className='p-4 bg-gray-200 rounded-lg mb-[50px]'>
          <h1 className='text-4xl'>{currentAssignment.assignment_title}</h1>
          <h2 className='text-2xl text-gray-700'>
            {currentAssignment.course_code} {currentAssignment.course_name}
          </h2>
          <div className='flex items-center gap-3 mt-[20px]'>
            <span className='flex items-center gap-1'>
              <Calendar size={20} /> Due:{" "}
              {currentAssignment.assignment_end_date.split("T")[0]}
            </span>
            <span className='flex items-center gap-1'>
              <Star size={20} />
              <p>
                Attempts: {attemptsUsed}/{currentAssignment.assignment_attempts}
              </p>
            </span>
          </div>

          {currentAssignment.assignment_attempts - attemptsUsed === 0 && (
            <p className='inline-block w-auto px-3 py-1 font-semibold text-red-500 bg-red-100 rounded-full mt-[20px]'>
              You have reached the maximum number of attempts.
            </p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {feedback && (
        <div className='p-6 mt-10 bg-white border border-gray-300 rounded-lg shadow-md'>
          <h3 className='text-base font-semibold text-gray-800'>
            Feedback:
          </h3>

          <p className='mb-4 text-gray-600'>{feedback.general_comment}</p>

          {/* <h3 className='mb-2 text-lg font-semibold text-gray-800'>
            Suggested Grade:
          </h3> */}
          {feedback.result_string === "pass" ? (
            <span className='inline-block px-3 py-1 text-sm font-medium  bg-gray-100 rounded-full'>
              Based on the assignment requirements, your submission might pass during manual review.
            </span>
          ) : (
            <span className='inline-block px-3 py-1 text-sm font-medium bg-gray-100  rounded-full'>
              Based on the assignment requirements, your delivery might not be sufficient for a passing grade.
            </span>
          )}

          <p className=' text-sm text-gray-500 italic font-semibold mt-2 flex items-center gap-1 '>
          <CircleAlert />  This feedback is AI generated and not the final assessment.
          </p>
        </div>
      )}

      {currentAssignment &&
      currentAssignment.is_active === 1 &&
      attemptsUsed < currentAssignment.assignment_attempts ? (
        <UploadAssignmentAssessment
          setFeedback={setFeedback}
          assignmentId={currentAssignment.assignment_id}
          filetypes={currentAssignment.allowed_filetypes}
          description={currentAssignment.assignment_description}
          criteria={currentAssignment.assignment_criteria}
          onUploadDone={() => incrementAttempt()}
        />
      ) : null}

      {previousFeedback.length > 0 ? (
        <div className='mt-[80px] p-4 border-2 border-gray-200 rounded-lg'>
          <h2 className='font-bold'>Previous Submissions</h2>
          <p className='text-sm text-gray-500 mb-4'>
            The feedback is AI generated and simply an indication of how you did
            in the assignment. The most recent submission will be graded by the
            lecturer.
          </p>
          {previousFeedback.map((feedback) => (
            <FeedbackCard feedback={feedback} key={feedback.feedback_id} />
          ))}
        </div>
      ) : (
        <p className='mt-[100px]'>You have yet to receive any feedback.</p>
      )}
    </main>
  );
}

export default StudentAssignmentAssessmentPage;
