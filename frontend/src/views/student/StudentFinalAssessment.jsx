import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { GetConfig } from "../../utils/GetConfig";
import instance from "../../utils/axiosInstance";
import StudentFinalAssessmentDisplay from "../../components/StudentFinalAssessmentDisplay";
import { Link } from "react-router-dom";
import BackComponent from "../../components/BackComponent";

function StudentFinalAssessment() {
  const [currentAssessment, setCurrentAssessment] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const path = useParams();
  const assessmentId = path.id;
  const { token } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    instance
      .get(`api/assessment/one/${assessmentId}`, GetConfig(token))
      .then((response) => {
        setIsLoading(false);
        setCurrentAssessment(response.data[0]);
      })
      .catch((error) => {
        setIsLoading(false);

        console.error("Error fetching assessment:", error);
        setErrorMsg(error.response.data.error);
      });
  }, [assessmentId, token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!currentAssessment) {
    return (
      <>
        {errorMsg && <p className='text-red-500'>{errorMsg}</p>}
        <Link className='text-blue-500 underline' to='/home'>
          Back to home
        </Link>
      </>
    );
  }

  return (
    <main>
      <BackComponent destination={`/home`} />
      <div className='flex justify-between'>
        <h1 className='text-2xl font-light'>
          {currentAssessment.assignment_title}
        </h1>
        <div className='flex flex-col'>
          <p>
            Final Result:{" "}
            <span
              className={`px-2 rounded ${
                currentAssessment.assessment_result === "pass"
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {currentAssessment.assessment_result}
            </span>
          </p>
          <Link
            className='text-blue-500 underline'
            to={`/assignment-assessment/${currentAssessment.assignment_id}`}
          >
            View assignment
          </Link>
        </div>
      </div>
      {errorMsg && <p className='text-red-500'>{errorMsg}</p>}

      {currentAssessment && currentAssessment.assessment_contents && (
        <StudentFinalAssessmentDisplay
          obj={currentAssessment.assessment_contents}
        />
      )}
    </main>
  );
}
export default StudentFinalAssessment;
