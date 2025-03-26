import { useState, useEffect } from "react";
import SyntaxHighlighterComponent from "../../components/SyntaxHighlighterComponent";
import instance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { GetConfig } from "../../utils/GetConfig";
import AssessmentFormComponent from "../../components/AssessmentFormComponent";

function GradeAssessmentPage() {
const [currentAssessment, setCurrentAssessment] = useState();
const path = useParams();
const assessmentId = path.id
console.log(assessmentId);
const { token } = useAuth();

useEffect(() => {
 instance
.get(`api/assessment/one/${assessmentId}`, GetConfig(token))
.then((response) => {
setCurrentAssessment(response.data[0]);
})
.catch((error) => {
console.error("Error fetching assessment:", error);
});
}, [assessmentId]);



// console.log('current final assessment: ', currentAssessment);

if(!currentAssessment) return <h1>Loading...</h1>

  return (
    <>
      <h1>{currentAssessment.student_name}</h1>
      <div className="">
      <div className='flex flex-col'>
      {currentAssessment.student_work && (
currentAssessment.student_work.map((work, index) => (
<SyntaxHighlighterComponent
  language={work.filetype.split(".")[1]}
  codeString={work.file_contents}
  filePath={work.filepath}
  key={index}
/>
)))}
</div>
<div className='flex flex-col'>
<div className='bg-gray-100 p-4 rounded-lg'>
<h2 className='text-xl font-semibold mb-2'>Assessment</h2>
{currentAssessment.assessment_contents && (
  <AssessmentFormComponent
  obj={currentAssessment.assessment_contents}
  />
  )}

</div>
</div>
</div>
    </>
  );
}

export default GradeAssessmentPage;


