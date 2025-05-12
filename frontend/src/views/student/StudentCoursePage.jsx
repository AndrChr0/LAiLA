import React from "react";
import { useParams } from "react-router-dom";
import instance from "../../utils/axiosInstance";
import { useState, useEffect } from "react";
import Assignments from "../../components/Assignments";
import { useFetchAssignments } from "../../utils/fetches/useFetchAssignments";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { GetConfig } from "../../utils/GetConfig";
import { useAuth } from "../../context/AuthContext";
import BackComponent from "../../components/BackComponent";
import Loading from "../../components/Loading";
import GradedAssignments from "../../components/GradedAssignments";

const StudentCoursePage = () => {
  const [currentCourse, setCurrentCourse] = useState({});
  const { token } = useAuth();
  const { assignments } = useFetchAssignments(GetConfig(token));
  const [gradedAssignments, setGradedAssignments] = useState([]);
  const path = useParams();
  const courseId = path.id;

  useEffect(() => {
    instance
      .get(`api/courses/${courseId}`, GetConfig(token))
      .then((response) => {
        setCurrentCourse(response.data);
      })
      .catch((error) => {
        console.error("Error fetching assignment:", error);
      });
  }, [courseId]);

  useEffect(() => {
    instance
      .get(`api/assessment/student/${courseId}`, GetConfig(token))
      .then((response) => {
        console.log(response.data);
        setGradedAssignments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching assignment:", error);
      });
  }, [courseId]);

  const activeAssignmentInCourse = (courseId) => {
    return assignments.filter(
      (assignment) =>
        assignment.course_id === Number(courseId) &&
        assignment.is_active === 1 &&
        assignment.is_public == 1
    );
  };

  const inActiveAssignmentInCourse = (courseId) => {
    return assignments.filter(
      (assignment) =>
        assignment.course_id === Number(courseId) && assignment.is_active === 0
    );
  };

  const gradedAssignmentsFiltered = Array.isArray(gradedAssignments)
    ? gradedAssignments.filter(
        (assignment) => assignment.is_reviewed === 1
      )
    : [];

  return (
    <main>
      <BackComponent destination='/home' />
      {currentCourse ? (
        <div className='flex justify-around w-full mb-[5rem]'>
          <div >
            <h1 className='text-3xl font-bold text-gray-800'>
              {currentCourse.course_code} {currentCourse.course_name}
            </h1>
            <p className='mt-2 text-gray-700 w-[70%]'>
              {currentCourse.course_description}
            </p>
          </div>

          <div className="w-[40%]">
            <p>
              <span className='font-semibold'>Lecturer:</span>{" "}
              {currentCourse.course_coordinator}
            </p>
            <a
              href={currentCourse.course_link}
              target='_blank'
              className='text-blue-500'
              rel='noopener noreferrer'
            >
              Course page
            </a>
          </div>
        </div>
      ) : (
        <Loading />
      )}

      <h2 className='text-2xl font-medium text-gray-800'>Active assignments</h2>
      <Assignments assignments={activeAssignmentInCourse(courseId)} />
      <h2 className='text-2xl font-medium text-gray-800'>Old assignments</h2>
      <Assignments assignments={inActiveAssignmentInCourse(courseId)} />

      <h2 className='text-2xl font-medium text-gray-800'>My Grades</h2>

      <GradedAssignments assessments={gradedAssignmentsFiltered} />
    </main>
  );
};

export default StudentCoursePage;
