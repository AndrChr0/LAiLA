import { useEffect, useState } from "react";
import instance from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";

export const useFetchAssignments = (config) => {
  const [assignments, setAssignments] = useState([]);
  const { userId, userRole } = useAuth();
  const isLecturer = userRole === "lecturer";

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await instance.get("api/assignments", config, {
          params: {
            student_id: !isLecturer ? userId : undefined,
            course_coordinator: isLecturer ? userId : undefined,
          },
        });

        setAssignments(response.data || []);
        console.log("Assignments fetched:", response.data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
        setAssignments([]);
      }
    };

    fetchAssignments();
  }, [userId, setAssignments]);

  return { assignments };
};
