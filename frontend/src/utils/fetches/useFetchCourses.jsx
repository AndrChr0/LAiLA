import { useEffect, useState } from "react";
import instance from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";

export const useFetchCourses = (config) => {
  const [ courses, setCourses ] = useState([]);
  const { userId, userRole } = useAuth();
  const isLecturer = userRole === "lecturer";

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await instance.get("api/courses", config, {
          params: {
            student_id: !isLecturer ? userId : undefined,
            course_coordinator: isLecturer ? userId : undefined,
          },
        });

        setCourses(response.data || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      }
    };

    fetchCourses();
  }, [userId, setCourses]);

  return { courses };
};
