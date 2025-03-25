import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GetConfig } from "../../utils/GetConfig";
import { useAuth } from "../../context/AuthContext";
import Assessments from "../../components/Assessments";
import instance from "../../utils/axiosInstance";

const FinalAssessmentsPage = () => {
  const { token } = useAuth();
  const [assessments, setAssessments] = useState([]);
  const path = useParams();
  const assignmentId = path.id;

  useEffect(() => {
    instance
      .get(`api/assessment/lecturer/${assignmentId}`, GetConfig(token))
      .then((res) => {
        setAssessments(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const isNotReviewed = (assignmentId) => {
    return assessments.filter(
      (assessment) =>
        assessment.assignment_id === Number(assignmentId) &&
        assessment.is_reviewed === 0
    );
  };

  const isReviewed = (assignmentId) => {
    return assessments.filter(
      (assessment) =>
        assessment.assignment_id === Number(assignmentId) &&
        assessment.is_reviewed === 1
    );
  };

  return (
    <>
      <h2 className="flex items-center gap-3">
        <span className="text-3xl font-normal">AI Suggested Grade</span>
        <div className="w-auto h-auto px-3 py-[0.5px] text-white bg-purple-700 rounded">
          AI
        </div>
      </h2>
      <Assessments assessments={isNotReviewed(assignmentId)} />
      <h2 className="flex items-center gap-3">
        <span className="text-3xl font-normal">Final Grades</span>
        <div className="w-auto h-auto px-3 py-[0.5px] text-white bg-blue-400 rounded">
          Lecturer
        </div>
      </h2>
      <Assessments assessments={isReviewed(assignmentId)} />
    </>
  );
};

export default FinalAssessmentsPage;
