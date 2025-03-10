import React, { useState, useEffect } from 'react';
import Courses from "../../components/Courses";
import Assignments from "../../components/Assignments";
import instance from '../../utils/axiosInstance';

function LecturerHomePage() {

  const [assignments, setAssignments] = useState([]);
  const isLecturer = true;
  const userId = 4;

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
  }, []);

  const activeAssignments = assignments.filter((assignment) => assignment.is_active === 1);
  const inactiveAssignments = assignments.filter((assignment) => assignment.is_active === 0);
  return (
  <>
    <div className="mb-5 bg-gray-200" >  
      <Courses/>
    </div>
    
    <div className="">
      <h2 className="text-4xl font-normal">Active Assignments</h2>
      <Assignments assignments={activeAssignments} is_active={1} />
      <Assignments assignments={inactiveAssignments} is_active={0} />
    </div>
    </>
  
  )}

export default LecturerHomePage;
