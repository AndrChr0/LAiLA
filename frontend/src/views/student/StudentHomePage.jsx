import React, { useState, useEffect, use } from "react";
import Courses from "../../components/Courses";
import Assignments from "../../components/Assignments";
import { useFetchAssignments } from "../../utils/fetches/useFetchAssignments";
import { useFetchCourses } from "../../utils/fetches/useFetchCourses";
import { GetConfig} from "../../utils/GetConfig"
import { useAuth } from "../../context/AuthContext";

function StudentHomePage() {
const { token } = useAuth();
const { assignments } = useFetchAssignments(GetConfig(token));
const { courses } = useFetchCourses(GetConfig(token));


const activeAssignments = Array.isArray(assignments)
    ? assignments.filter((assignment) => assignment.is_active === 1 && assignment.is_public == 1)
    : [];
    
return (
  <>
    <div className='mb-5'>
      <h2 className='text-4xl font-normal mb-[1.5em] border-b border-gray-200 pb-2 max-w-[30dvw] '>
        Assignments
      </h2>
      <Assignments assignments={activeAssignments} />
    </div>

    <div>
      <h2 className='text-4xl font-normal mb-[1.5em] border-b border-gray-200 pb-2 max-w-[30dvw]'>
        Courses
      </h2>

      <Courses courses={courses} />
    </div>
  </>
);
}

export default StudentHomePage;
