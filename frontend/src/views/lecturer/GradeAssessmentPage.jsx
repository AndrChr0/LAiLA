import { useState, useEffect } from "react";
import SyntaxHighlighterComponent from "../../components/SyntaxHighlighterComponent";
import instance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { GetConfig } from "../../utils/GetConfig";
import AssessmentFormComponent from "../../components/AssessmentFormComponent";

function GradeAssessmentPage() {
  const [currentAssessment, setCurrentAssessment] = useState();
  const [assessmentObject, setAssessmentObject] = useState();
  const [assessmentResult, setAssessmentResult] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  const path = useParams();
  const assessmentId = path.id;
  const { token } = useAuth();

  useEffect(() => {
    instance
      .get(`api/assessment/one/${assessmentId}`, GetConfig(token))
      .then((response) => {
        setCurrentAssessment(response.data[0]);
        setAssessmentObject(response.data[0].assessment_contents);
        setAssessmentResult(response.data[0].assessment_result);
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


  const handleSubmitFinalAssessment = ()=>{
    instance.patch(`api/assessment/lecturer/${assessmentId}`,
      {
        contents: assessmentObject,
        result: assessmentResult
      }
      , GetConfig(token))
    .then((response)=>{
      console.log(response.data)
    })
    .catch((error)=>{
      console.error("Error submitting final assessment:", error);
      setErrorMsg(error.response.data.error);

    })
  }

  if (!currentAssessment) return <h1>Loading...</h1>;


  return (
    <>
    <h1 className="text-3xl">{currentAssessment.assignment_title}</h1>
      <h2 className="font-bold">Student: <span className="font-normal">{currentAssessment.student_name}</span></h2>
      <div>
        <p>
          Suggested Result:{" "}
          <span
            className={`p-2 rounded ${
              assessmentResult === "pass"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {assessmentResult}
          </span>
        </p>
        <button
          type="button"
          className="border-2 p-2"
          onClick={() =>
            setAssessmentResult(assessmentResult === "pass" ? "fail" : "pass")
          }
        >
          Change result
        </button>
      </div>
      <div className="flex gap-8">
        <div className="flex flex-col w-2/5">
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
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Assessment</h2>
            {currentAssessment.assessment_contents && (
              <AssessmentFormComponent
                obj={assessmentObject}
                onHandleChange={handleChange}
              />
            )}

            <button
            onClick={handleSubmitFinalAssessment}
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 hover:cursor-pointer"
            >
              Submit Final Assessment
            </button>
            {errorMsg && <p className="text-red-500">{errorMsg}</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default GradeAssessmentPage;
