import { useState } from "react";
import SyntaxHighlighterComponent from "../../components/SyntaxHighlighterComponent";

function GradeAssessmentPage() {
  return (
    <>
      <h1>FinalAssessmentPage</h1>
      <div className='flex flex-col w-1/2 gap-8'>
        <SyntaxHighlighterComponent
          language='javascript'
          codeString='const GradeAssessmentPage = () => {
  return (
    <div>
      <h1>Grade Assessment Page</h1>
    </div>
  );
};
        '
        />
        <SyntaxHighlighterComponent />
      </div>
    </>
  );
}

export default GradeAssessmentPage;
