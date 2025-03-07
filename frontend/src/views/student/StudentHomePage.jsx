import React from "react";
import Courses from "../../components/Courses";

function StudentHomePage() {
  return (
    <>
      <div className="mb-5 bg-gray-200">
        <h2 className="text-4xl font-normal">Active Assignments</h2>
        <div>..</div>
        <div>..</div>
        <div>..</div>
      </div>

      <div className="bg-gray-200" >  
        <Courses userId={2} isLecturer={false} />
      </div>
    </>
  );
}

export default StudentHomePage;
