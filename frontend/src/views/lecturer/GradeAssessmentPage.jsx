import { useState, useEffect } from "react";
import SyntaxHighlighterComponent from "../../components/SyntaxHighlighterComponent";
import instance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { GetConfig } from "../../utils/GetConfig";
import AssessmentFormComponent from "../../components/AssessmentFormComponent";
import BackComponent from "../../components/BackComponent";
import { useNavigate } from "react-router-dom";

function GradeAssessmentPage() {
  const [currentAssessment, setCurrentAssessment] = useState();
  const [assessmentObject, setAssessmentObject] = useState();
  const [assessmentResult, setAssessmentResult] = useState();
  const [assignmentId, setAssignmentId] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const path = useParams();
  const assessmentId = path.id;
  const { token } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    instance
      .get(`api/assessment/one/${assessmentId}`, GetConfig(token))
      .then((response) => {
        setCurrentAssessment(response.data[0]);
        setAssessmentObject(response.data[0].assessment_contents);
        setAssessmentResult(response.data[0].assessment_result);
        setAssignmentId(response.data[0].assignment_id)
      })
      .catch((error) => {
        console.error("Error fetching assessment:", error);
        setErrorMsg(error.response.data.error);
      });
  }, [assessmentId, token]);

  const handleChange = (sectionKey, feedbackKey, newValue) => {
    setAssessmentObject((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [feedbackKey]: newValue,
      },
    }));
  };

  const handleSubmitFinalAssessment = () => {
    instance
      .patch(
        `api/assessment/lecturer/${assessmentId}`,
        {
          contents: assessmentObject,
          result: assessmentResult,
        },
        GetConfig(token)
      )
      .then(() => {
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.error("Error submitting final assessment:", error);
        setErrorMsg(error.response.data.error);
      });
  };

  if (!currentAssessment) return <h1>Loading...</h1>;

  return (
    <div className="max-w-[1700px] mx-auto px-[3%]">
      <BackComponent destination={`/final-assessment/${assignmentId}`}/>
      <div className="p-4 bg-gray-200 rounded-lg mb-[50px]">
        <h1 className="text-3xl mb-[10px]">{currentAssessment.assignment_title}</h1>
        <h2 className="font-bold mb-[10px]">Student: <span className="font-normal">{currentAssessment.student_name}</span></h2>
        <div>
          <p>
            Suggested Result:{" "}
            <span
              className={`px-4 py-1 rounded ${
                assessmentResult === "pass"
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {assessmentResult.toUpperCase()}
            </span>
          </p>
          <button
            type="button"
            className="p-2 border-2 border-black"
            onClick={() =>
              setAssessmentResult(assessmentResult === "pass" ? "fail" : "pass")
            }
          >
            Change result
          </button>
        </div>

      </div>
   
      <div className="flex gap-8">
        <div className="flex flex-col w-2/5 gap-8">
          {currentAssessment.student_work &&
            currentAssessment.student_work.map((work, index) => (
              <SyntaxHighlighterComponent
                language={work.filetype.split(".")[1]}
                codeString={work.file_contents}
                filePath={work.filepath}
                key={index}
              />
            ))}
        </div>
        <div className="flex flex-col w-3/5">
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="mb-2 text-xl font-semibold">Assessment</h2>
            {currentAssessment.assessment_contents && (
              <AssessmentFormComponent
                obj={assessmentObject}
                onHandleChange={handleChange}
              />
            )}

            <button
              onClick={handleSubmitFinalAssessment}
              type="submit"
              className="p-2 text-white bg-blue-500 rounded hover:bg-blue-700 hover:cursor-pointer"
            >
              Submit Final Assessment
            </button>
            {errorMsg && (
              <>
                <p className="text-red-500">{errorMsg}</p>{" "}
                <button
                  className="p-2 bg-white border-2 rounded hover:bg-gray-400 hover:cursor-pointer"
                  onClick={() => navigate("/home")}
                >
                  Go Home
                </button>
              </>
            )}
            {isSubmitted && (
              <>
                <p className="text-green-500">
                  Assessment submitted successfully
                </p>
                <button
                  className="p-2 bg-white border-2 rounded hover:bg-gray-400 hover:cursor-pointer"
                  onClick={() => navigate("/final-assessment/" + assignmentId)}
                >
                  Back to assessment overview
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GradeAssessmentPage;