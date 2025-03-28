import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GetConfig } from "../../utils/GetConfig";
import { useAuth } from "../../context/AuthContext";
import Assessments from "../../components/Assessments";
import instance from "../../utils/axiosInstance";
import BackComponent from "../../components/BackComponent";

const FinalAssessmentsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();
  const [assessments, setAssessments] = useState([]);
  const [assignment, setAssignment] = useState([]);
  const path = useParams();
  const assignmentId = path.id;

  useEffect(() => {
    instance
      .get(`api/assignments/${assignmentId}`, GetConfig(token))
      .then((res) => {
        setAssignment(res.data);
        console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);

        console.log(err);
      });
  }
  , []);

  useEffect(() => {
    instance
      .get(`api/assessment/lecturer/${assignmentId}`, GetConfig(token))
      .then((res) => {
        setAssessments(res.data);
        console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);

        console.log(err);
      });
  }, []);

  if (isLoading){
    return <div>Loading...</div>
  }


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
      <main>
        <BackComponent destination={`/courses/${assignment.course_id}`} />
        <div className="p-4 bg-gray-200 rounded-lg mb-[50px]">
          {assessments.length > 0 ? (
            <h1 className="text-2xl">{assessments[0].assignment_title}</h1>
          ): <h1 className="text-2xl">{assignment.assignment_title}</h1>}
        </div>

        <h2 className="flex items-center gap-3 mb-[20px]">
          <span className="text-3xl font-normal">AI Suggested Grade</span>
          <div className="w-auto h-auto px-3 py-[0.5px] text-white bg-purple-700 rounded">
            AI
          </div>
        </h2>
        <Assessments assessments={isNotReviewed(assignmentId)} />

        <h2 className="flex items-center gap-3 mb-[20px]">
          <span className="text-3xl font-normal">Final Grades</span>
          <div className="w-auto h-auto px-3 py-[0.5px] text-white bg-blue-400 rounded">
            Lecturer
          </div>
        </h2>
        <Assessments assessments={isReviewed(assignmentId)} />
      </main>
    </>

);
};

export default FinalAssessmentsPage;
