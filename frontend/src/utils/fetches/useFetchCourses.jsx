import { useEffect } from "react";
import instance from "../../utils/axiosInstance";
import { useUserData } from "../../context/UserContext";
import { useAuth } from "../../context/AuthContext";

export const useFetchCourses = () => {
  const { courses, setCourses } = useUserData();
  const { userId, userRole } = useAuth();
  const isLecturer = userRole === "lecturer";

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await instance.get("api/courses", {
          params: {
            student_id: !isLecturer ? userId : undefined,
            course_coordinator: isLecturer ? userId : undefined,
          },
        });

        setCourses(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [userId, setCourses]);

  return { courses };
};
