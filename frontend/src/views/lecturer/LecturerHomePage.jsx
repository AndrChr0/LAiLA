import React, { useState, useEffect } from 'react';
import Courses from "../../components/Courses";
import Assignments from "../../components/Assignments";
import instance from '../../utils/axiosInstance';
import { useAuth } from "../../context/AuthContext";
import { useUserData } from "../../context/UserContext";

function LecturerHomePage() {
  const { assignments, setAssignments } = useUserData();
   const { courses, setCourses } = useUserData();
  const { userId, userRole} = useAuth();
  const isLecturer = userRole === "lecturer";

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await instance.get("api/assignments", {
          params: {
            student_id: !isLecturer ? userId : undefined,
            course_coordinator: isLecturer ? userId : undefined,
          },
        });
        console.log("Assignments API Response:", response.data);

        setAssignments(response.data || []);
      } catch (error) {
        console.error("Error fetching assignments:", error);
        setAssignments([]);
      }
    };

    fetchAssignments();
  }, [userId]);

  useEffect(() => {
    const fetchCourses = async () => {
        try {
          const response = await instance.get('api/courses', {
            params: { 
                student_id: !isLecturer ? userId : undefined,
                course_coordinator: isLecturer ? userId : undefined,
              },
          });
      
          setCourses(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      };
    
      fetchCourses();
  }, [userId]);

  const activeAssignments = Array.isArray(assignments)
  ? assignments.filter((assignment) => assignment.is_active === 1)
  : [];

const inactiveAssignments = Array.isArray(assignments)
  ? assignments.filter((assignment) => assignment.is_active === 0)
  : [];
  if (!assignments) {
    return <p>No assignments found.</p>;
  }
  return (
  <>
    <div className="mb-5">  
      <Courses courses={courses} />
    </div>
    
    <div className="">
      <h2 className="text-4xl font-normal">Active Assignments</h2>
      <Assignments assignments={activeAssignments} is_active={1} />
    </div>
    </>
  
  )}

export default LecturerHomePage;
