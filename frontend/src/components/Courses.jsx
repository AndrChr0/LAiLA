import React, { useState, useEffect } from 'react';
import axios from 'axios';
import instance from '../utils/axiosInstance'
import { useNavigate } from 'react-router-dom';

const Courses = ({ userId, isLecturer }) => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
        try {
          const response = await instance.get('api/courses', {
            params: { 
                student_id: !isLecturer ? userId : undefined,
                course_coordinator: isLecturer ? userId : undefined,
              },
          });
      
          console.log("API Response:", response.data); 
      
          setCourses(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      };
      

    if (userId) {
      fetchCourses();
    }
  }, [userId, isLecturer]);

  return (
    <div>
      <h2 className="mb-5 text-4xl font-normal">{isLecturer ? 'Courses You Manage' : 'Enrolled Courses'}</h2>
      <div className='flex gap-5'>
        {courses.length > 0 ? (
          courses.map(course => (
            <div className='w-[200px] h-[200px] bg-fuchsia-500 hover:cursor-pointer' key={course.course_id} onClick={() => navigate(`/courses/${course.course_id}`)}>
              {course.course_name} ({course.course_code})
            </div>
          ))
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
