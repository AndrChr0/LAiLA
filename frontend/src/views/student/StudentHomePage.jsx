import React, { useState, useEffect } from "react";
import Courses from "../../components/Courses";
import Assignments from "../../components/Assignments";
import { useFetchAssignments } from "../../utils/fetches/useFetchAssignments";
import { useFetchCourses } from "../../utils/fetches/useFetchCourses";
import { GetConfig} from "../../utils/GetConfig"
import { useAuth } from "../../context/AuthContext";
import GradedAssignments from "../../components/GradedAssignments";
import instance from "../../utils/axiosInstance";

function StudentHomePage() {

  const [gradedAssignments, setGradedAssignments] = useState([]);
const { token, userId } = useAuth();
const { assignments } = useFetchAssignments(GetConfig(token));
const { courses } = useFetchCourses(GetConfig(token));
useEffect(() => {

  instance.get(`api/assessment/student`, GetConfig(token))
  .then((response) => {
    setGradedAssignments(response.data);
  })
  .catch((error) => {
    console.error("Error fetching assessment:", error);
  })
}, [token, userId]);



const activeAssignments = Array.isArray(assignments)
    ? assignments.filter((assignment) => assignment.is_active === 1 && assignment.is_public == 1)
    : [];
    
return (
  <main>
    <div className='mb-16'>
      <h2 className='text-4xl font-normal mb-[1.5em] border-b border-gray-200 pb-2 max-w-[30dvw] '>
        Assignments
      </h2>
      <Assignments assignments={activeAssignments} />
    </div>

    <div className='mb-16'>
      <h2 className='text-4xl font-normal mb-[1.5em] border-b border-gray-200 pb-2 max-w-[30dvw]'>
        Courses
      </h2>

      <Courses courses={courses} />
    </div>

    <div className='mb-16'>
      <h2 className='text-4xl font-normal mb-[1.5em] border-b border-gray-200 pb-2 max-w-[30dvw]'>
        Graded Assignments
      </h2>

      <GradedAssignments assessments={gradedAssignments} />
    </div>
  </main>
);
}

export default StudentHomePage;
