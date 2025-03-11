import React from 'react';
import { useUserData } from '../../context/UserContext';
import { useParams } from "react-router-dom";
import instance from "../../utils/axiosInstance";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Assignments from '../../components/Assignments';
import { useAuth } from "../../context/AuthContext";
import { useFetchAssignments } from "../../utils/fetches/useFetchAssignments";


const LecturerCoursePage = () => {
    const [currentCourse, setCurrentCourse] = useState({});
      const { assignments, setAssignments } = useUserData();
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
      
    
    return (
      <>
        <div className='flex gap-3'>
        <div className='p-3 bg-white rounded shadow'>New Assignment</div>
        <div className='p-3 bg-white rounded shadow'>Course chatbot</div>
        <div className='p-3 bg-white rounded shadow'>View course report</div>
        </div>
    
        <div className=''>
        <h2 className="text-2xl font-medium text-gray-800">Active assignments</h2>
        <Assignments assignments={activeAssignmentInCourse(courseId)} />
        <h2 className="mt-4 text-2xl font-medium text-gray-800">Old assignments</h2>
        <Assignments assignments={inActiveAssignmentInCourse(courseId)} />
        </div>
      </>
    );
    };

export default LecturerCoursePage