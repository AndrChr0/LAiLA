import React, { useState, useEffect } from "react";
import Courses from "../../components/Courses";
import Assignments from "../../components/Assignments";
import instance from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import { useUserData } from "../../context/UserContext";

function StudentHomePage() {
  const { assignments, setAssignments } = useUserData();
  const { userId } = useAuth();
  // const [assignments, setAssignments] = useState([]);
  const isLecturer = false;
  // const userId = 2;

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
  }, []);

  console.log("Assignments:", assignments);

  const activeAssignments = assignments.filter(
    (assignment) => assignment.is_active === 1
  );
  const inactiveAssignments = assignments.filter(
    (assignment) => assignment.is_active === 0
  );

  if (!assignments) {
    return <p>No assignments found.</p>;
  }
  return (
    <>
      <div className='mb-5'>
        <h2 className='text-4xl font-normal'>Assignments</h2>
        <Assignments assignments={activeAssignments} is_active={1} />
        <Assignments assignments={inactiveAssignments} is_active={0} />
      </div>

      <div className='bg-gray-200'>
        <Courses />
      </div>
    </>
  );
}

export default StudentHomePage;
