import React from "react";
import Courses from "../../components/Courses";
import Assignments from "../../components/Assignments";

function StudentHomePage() {
  return (
    <>
      <div className="mb-5">
        <h2 className="text-4xl font-normal">Active Assignments</h2>
        <Assignments is_active={1}/>
        <Assignments is_active={0}/>
      </div>

      <div className="bg-gray-200" >  
        <Courses />
      </div>
    </>
  );
}

export default StudentHomePage;
