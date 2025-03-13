import React, { useState, useEffect } from "react";
import Courses from "../../components/Courses";
import Assignments from "../../components/Assignments";
import { useNavigate } from "react-router-dom";
import { useFetchAssignments } from "../../utils/fetches/useFetchAssignments";
import { useFetchCourses } from "../../utils/fetches/useFetchCourses";
import { GetConfig} from "../../utils/GetConfig"
import { useAuth } from "../../context/AuthContext";

function LecturerHomePage() {
  const { token } = useAuth();
  const { assignments } = useFetchAssignments(GetConfig(token));
  const { courses } = useFetchCourses();
  const navigate = useNavigate();


  const activeAssignments = Array.isArray(assignments)
    ? assignments.filter((assignment) => assignment.is_active === 1)
    : [];


  return (
    <>
      <button
        onClick={() => navigate("/new-assignment")}
        className='px-4 py-2 mb-2 text-gray-800 bg-white border border-gray-400 rounded hover:cursor-pointer hover:bg-gray-100'
      >
        New Assignment
      </button>

      <div className='mb-[4.5em]'>
        <Courses courses={courses} />
      </div>

      <div className=''>
        <h2 className='text-4xl font-normal mb-[1.5em]'>Active Assignments</h2>
        <Assignments assignments={activeAssignments} />
      </div>
    </>
  );
}

export default LecturerHomePage;
