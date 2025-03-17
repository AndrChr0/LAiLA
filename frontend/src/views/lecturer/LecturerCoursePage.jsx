import React from "react";
import { useUserData } from "../../context/UserContext";
import { useParams, Link } from "react-router-dom";
import instance from "../../utils/axiosInstance";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Assignments from "../../components/Assignments";
import { useFetchAssignments } from "../../utils/fetches/useFetchAssignments";
import { GetConfig} from "../../utils/GetConfig"
import { useAuth } from "../../context/AuthContext";

const LecturerCoursePage = () => {
    const { token } = useAuth();
    const { assignments } = useFetchAssignments(GetConfig(token));
    const path = useParams();
    const courseId = path.id;
  
    const activeAssignmentInCourse = (courseId) => {
      return assignments.filter((assignment) => assignment.course_id === Number(courseId) && assignment.is_active === 1);
    };
  
    const inActiveAssignmentInCourse = (courseId) => {
      return assignments.filter((assignment) => assignment.course_id === Number(courseId) && assignment.is_active === 0);
    }
      
    
    return (
      <>
        <div className='flex gap-3'>
         <Link to='/new-assignment' className='p-3 bg-white rounded shadow'>
          New Assignment
        </Link>
        <div className='p-3 bg-white rounded shadow'>Course chatbot</div>
        <div className='p-3 bg-white rounded shadow'>View course report</div>
      </div>

      <div className=''>
        <h2 className='text-2xl font-medium text-gray-800'>
          Active assignments
        </h2>
        <Assignments assignments={activeAssignmentInCourse(courseId)} />
        <h2 className='mt-4 text-2xl font-medium text-gray-800'>
          Old assignments
        </h2>
        <Assignments assignments={inActiveAssignmentInCourse(courseId)} />
      </div>
    </>
  );
};

export default LecturerCoursePage;
