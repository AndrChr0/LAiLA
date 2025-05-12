import { useState, useEffect, useCallback } from "react";
import SyntaxHighlighterComponent from "../../components/SyntaxHighlighterComponent";
import instance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { GetConfig } from "../../utils/GetConfig";
import AssessmentFormComponent from "../../components/AssessmentFormComponent";
import BackComponent from "../../components/BackComponent";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

function GradeAssessmentPage() {
  const [currentAssessment, setCurrentAssessment] = useState();
  const [assessmentObject, setAssessmentObject] = useState({});
  const [assessmentResult, setAssessmentResult] = useState("");
  const [assignmentId, setAssignmentId] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [markedSections, setMarkedSections] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const path = useParams();
  const assessmentId = path.id;
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    instance
      .get(`api/assessment/one/${assessmentId}`, GetConfig(token))
      .then((response) => {
        const data = response.data[0];
        setCurrentAssessment(data);
        setAssessmentObject(data.assessment_contents);
        setAssessmentResult(data.assessment_result);
        setAssignmentId(data.assignment_id);

        // initialize marked sections based on the data
        if (data.assessment_contents) {
          const initialMarkedState = {};
          Object.keys(data.assessment_contents).forEach((sectionKey) => {
            initialMarkedState[sectionKey] = false;
          });
          setMarkedSections(initialMarkedState);
        }

        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching assessment:", error);
        setErrorMsg(error.response?.data?.error || "An error occurred");
        setIsLoading(false);
      });
  }, [assessmentId, token]);

  // memoize handleChange to prevent recreation on render
  const handleChange = useCallback((sectionKey, feedbackKey, newValue) => {
    setAssessmentObject((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [feedbackKey]: newValue,
      },
    }));
  }, []);

  // memoize handleMarkSection to prevent recreation on render
  const handleMarkSection = useCallback((sectionKey) => {
    setMarkedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  }, []);

  const handleSubmitFinalAssessment = () => {
    if (!canSubmit) {
      return;
    }

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
        setErrorMsg(error.response?.data?.error || "An error occurred");
      });
  };

  if (isLoading) return <Loading />;
  if (!currentAssessment) return <div>No assessment found</div>;

  return (
    <div className='max-w-[1700px] mx-auto px-[3%]'>
      <BackComponent destination={`/final-assessment/${assignmentId}`} />
      <div className='p-4 bg-gray-200 rounded-lg mb-[50px]'>
        <h1 className='text-3xl mb-[10px]'>
          {currentAssessment.assignment_title}
        </h1>
        <h2 className='font-bold mb-[10px]'>
          Student:{" "}
          <span className='font-normal'>{currentAssessment.student_name}</span>
        </h2>
        <div>
          <p className='mb-2'>
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
            type='button'
            className='p-2 border-2 border-black rounded hover:bg-gray-100'
            onClick={() =>
              setAssessmentResult(assessmentResult === "pass" ? "fail" : "pass")
            }
          >
            Change result
          </button>
        </div>
      </div>

      <div className='flex gap-8'>
        <div className='flex flex-col w-2/5 gap-8'>
          {currentAssessment.student_work &&
            currentAssessment.student_work.map((work, index) => (
              <SyntaxHighlighterComponent
                open={index > 0}
                language={work.filetype.split(".")[1]}
                codeString={work.file_contents}
                filePath={work.filepath}
                key={index}
              />
            ))}
        </div>
        <div className='flex flex-col w-3/5'>
          <div className='p-4 bg-gray-100 rounded-lg shadow-md'>
            <h2 className='mb-4 text-xl font-semibold'>Assessment</h2>
            {currentAssessment.assessment_contents && (
              <AssessmentFormComponent
                obj={assessmentObject}
                onHandleChange={handleChange}
                onFormValidity={setCanSubmit}
                onHandleMarkSection={handleMarkSection}
                markedSections={markedSections}
                setMarkedSections={setMarkedSections}
              />
            )}

            <div className='mt-6'>
              <button
                disabled={!canSubmit}
                onClick={handleSubmitFinalAssessment}
                type='submit'
                className={`p-3 text-white bg-blue-500 rounded-md hover:bg-blue-700 ${
                  !canSubmit
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:cursor-pointer"
                }`}
              >
                Submit Final Assessment
              </button>

              {errorMsg && (
                <div className='mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md'>
                  <p>{errorMsg}</p>
                  <button
                    className='mt-2 p-2 bg-white border-2 rounded hover:bg-gray-100 hover:cursor-pointer'
                    onClick={() => navigate("/home")}
                  >
                    Go Home
                  </button>
                </div>
              )}

              {isSubmitted && (
                <div className='mt-4 p-3 bg-green-100 border border-green-300 text-black rounded-md'>
                  <p>Assessment submitted successfully</p>
                  <button
                    className='mt-2 p-2 bg-white border-2 rounded hover:bg-gray-100 hover:cursor-pointer'
                    onClick={() =>
                      navigate("/final-assessment/" + assignmentId)
                    }
                  >
                    Back to assessment overview
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GradeAssessmentPage;
