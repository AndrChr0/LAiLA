import React, { useState, useEffect } from 'react';
import axios from 'axios';
import instance from '../utils/axiosInstance'
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { useUserData } from "../context/UserContext";

const Courses = ({courses, isLecturer}) => {
  const navigate = useNavigate();
  const { setCourses } = useUserData();
  // const { userId, userRole } = useAuth();
  //  const isLecturer = userRole === "lecturer";

  return (
    <div className="">
    {/* <h2 className="mb-8 text-4xl font-semibold text-gray-800">{isLecturer ? 'Courses You Manage' : 'Enrolled Courses'}</h2> */}
    
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {courses.length > 0 ? (
        courses.map((course, index) => {
            
          const gradients = [
            { from: "from-purple-600", to: "to-fuchsia-500" },
            { from: "from-blue-500", to: "to-teal-400" },
            { from: "from-orange-500", to: "to-pink-500" },
            { from: "from-emerald-500", to: "to-cyan-400" },
            { from: "from-red-500", to: "to-amber-500" },
            { from: "from-indigo-600", to: "to-blue-400" }
          ];
          
          const gradient = gradients[index % gradients.length];
          
          return (
            <div 
              key={course.course_id} 
              onClick={() => {
                navigate(`/courses/${course.course_id}`);
              }}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] cursor-pointer border border-gray-100"
            >
              <div className={`flex items-center justify-center h-32 bg-gradient-to-r ${gradient.from} ${gradient.to}`}>
                <span className="text-2xl font-bold text-white">{course.course_code}</span>
              </div>
              <div className="p-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-800 line-clamp-2">{course.course_name}</h3>
                <p className="text-sm text-gray-500">Course ID: {course.course_id}</p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex items-center justify-center py-12 border border-gray-200 rounded-lg col-span-full bg-gray-50">
          <div className="text-center">
            <p className="mb-4 text-gray-500">No courses found.</p>
          </div>
        </div>
      )}
    </div>
  </div>
  );
};

export default Courses;
