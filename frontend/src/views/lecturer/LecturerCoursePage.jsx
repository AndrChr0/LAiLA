import React from "react";
import { useParams, Link } from "react-router-dom";
import Assignments from "../../components/Assignments";
import { useFetchAssignments } from "../../utils/fetches/useFetchAssignments";
import { GetConfig} from "../../utils/GetConfig"
import { useAuth } from "../../context/AuthContext";

const LecturerCoursePage = () => {
    const { token } = useAuth();
    const { assignments } = useFetchAssignments(GetConfig(token));
    const path = useParams();
    const courseId = path.id;

    if (assignments.length === 0) {
      return <div>Loading...</div>;
    }

    const activeAssignmentInCourse = (courseId) => {
      return assignments.filter((assignment) => assignment.course_id === Number(courseId) && assignment.is_active === 1);
    };
  
    const inActiveAssignmentInCourse = (courseId) => {
      return assignments.filter((assignment) => assignment.course_id === Number(courseId) && assignment.is_active === 0);
    }

    const courseName = assignments.filter((assignment) => assignment.course_id === Number(courseId))[0].course_name;
    const courseCode = assignments.filter((assignment) => assignment.course_id === Number(courseId))[0].course_code;
 
    
    return (
      <>
      <h1 className="mt-[1em] mb-2 text-5xl font-bold text-gray-800" >{courseCode} {courseName}</h1>
      <div className="mb-[3em] w-20 h-1 bg-blue-600 rounded"></div>
      
      <div className=''>
        <h2 className='text-3xl font-normal mb-[1.5em] mt-[1em]'>
          Active assignments
        </h2>
        <div className='flex gap-3'>
         <Link to='/new-assignment' className='px-4 py-2 mb-[1.5em] text-gray-800 bg-white border border-gray-400 rounded hover:cursor-pointer hover:bg-gray-100'>
          New Assignment
        </Link>
      </div>
        <Assignments assignments={activeAssignmentInCourse(courseId)} />
        <h2 className='text-3xl font-normal mb-[1.5em] mt-[1.5em]'>
          Old assignments
        </h2>
        <Assignments assignments={inActiveAssignmentInCourse(courseId)} />
      </div>
    </>
  );
};

export default LecturerCoursePage;


