import React from 'react';
import { useUserData } from '../../context/UserContext';
import { useParams } from "react-router-dom";
import instance from "../../utils/axiosInstance";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Assignments from '../../components/Assignments';
import { useAuth } from "../../context/AuthContext";


const StudentCoursePage = () => {
const [currentCourse, setCurrentCourse] = useState({});
  const { assignments, setAssignments } = useUserData();
  const path = useParams();
  const courseId = path.id;
  const { userId, userRole } = useAuth();
  const isLecturer = userRole === "lecturer";

  useEffect(() => {
    instance
      .get(`api/courses/${courseId}`)
      .then((response) => {
        setCurrentCourse(response.data);
        console.log("fjdisajfdosafs", response.data);
      })
      .catch((error) => {
        console.error("Error fetching assignment:", error);
      });
  }, [courseId]);


  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await instance.get("api/assignments", {
          params: {
            student_id: !isLecturer ? userId : undefined,
            course_coordinator: isLecturer ? userId : undefined,
          },
        });
        // console.log("Assignments API Response:", response.data);

        setAssignments(response.data || []);
      } catch (error) {
        console.error("Error fetching assignments:", error);
        setAssignments([]);
      }
    };

    fetchAssignments();
  }, [userId]);

  const activeAssignmentInCourse = (courseId) => {
    return assignments.filter((assignment) => assignment.course_id === Number(courseId) && assignment.is_active === 1);
  };

  const inActiveAssignmentInCourse = (courseId) => {
    return assignments.filter((assignment) => assignment.course_id === Number(courseId) && assignment.is_active === 0);
  }
  

  return (
    <>
    {currentCourse ? (
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">{currentCourse.course_name}</h1> 
            <p className="text-gray-600">Course Code: {currentCourse.course_code}</p>
            <p className="mt-2 text-gray-700">{currentCourse.course_description}</p> 
            <a href={currentCourse.course_link} target="_blank" rel="noopener noreferrer">Course link</a> 
            <p>Course coordinator: {currentCourse.course_coordinator}</p>
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
