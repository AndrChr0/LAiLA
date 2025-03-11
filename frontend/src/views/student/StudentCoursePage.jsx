import React from 'react';
import { useParams } from "react-router-dom";
import instance from "../../utils/axiosInstance";
import { useState, useEffect } from "react";
import Assignments from '../../components/Assignments';
import { useFetchAssignments } from "../../utils/fetches/useFetchAssignments";
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";


const StudentCoursePage = () => {
const [currentCourse, setCurrentCourse] = useState({});
  const { assignments } = useFetchAssignments();
  const path = useParams();
  const courseId = path.id;

  useEffect(() => {
    instance
      .get(`api/courses/${courseId}`)
      .then((response) => {
        setCurrentCourse(response.data);
      })
      .catch((error) => {
        console.error("Error fetching assignment:", error);
      });
  }, [courseId]);

  const activeAssignmentInCourse = (courseId) => {
    return assignments.filter((assignment) => assignment.course_id === Number(courseId) && assignment.is_active === 1);
  };

  const inActiveAssignmentInCourse = (courseId) => {
    return assignments.filter((assignment) => assignment.course_id === Number(courseId) && assignment.is_active === 0);
  }

  console.log("fdsfmdksafmkds",currentCourse);
  

  return (
    <>
    <Link className='flex items-center gap-1 mb-2' to="/home"><FaArrowLeft />Go back</Link>
    {currentCourse ? (
      <div className='flex justify-between w-full mb-[5rem]'>
         <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">{currentCourse.course_code}{" "}{currentCourse.course_name}</h1> 
            <p className="mt-2 text-gray-700">{currentCourse.course_description}</p> 
        </div>

        <div>
          <p><span className='font-semibold'>Lecturer:</span> {currentCourse.course_coordinator}</p>
          <a href={currentCourse.course_link} target="_blank" className='text-blue-500' rel="noopener noreferrer">Course page</a> 
        </div>

      </div>
       
    ) : (<p>Loading...</p>)}

    <div>
        <h2 className="text-2xl font-medium text-gray-800">Active assignments</h2>
        <Assignments assignments={activeAssignmentInCourse(courseId)} />
        <h2 className="text-2xl font-medium text-gray-800">Old assignments</h2>
        <Assignments assignments={inActiveAssignmentInCourse(courseId)} />
    </div>

   
   </>
  );
};

export default StudentCoursePage;
