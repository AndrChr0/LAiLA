import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import instance from "../../utils/axiosInstance";
import AssignmentCriteriaForm from "../../components/AssignmentCriteriaForm";

const LecturerEditAssignmentPage = () => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState({});
  const [maxScore, setMaxScore] = useState(0);
  const [assignment_criteria, setAssignmentCriteria] = useState({});

  useEffect(() => {
    instance.get(`/api/assignments/${id}`).then((res) => {
      console.log(res.data);
      setAssignment(res.data);
      setMaxScore(res.data.max_score);
    });
  }, [id]);

  function handleMaxScoreChange(newScore) {
    setMaxScore(newScore);
  }

  function handleCriteriaChange(criteria) {
    setAssignmentCriteria(criteria);
  }

  //   allowed_filetypes
  // :
  // ".css, .html, .md, .txt"
  // assignment_attempts
  // :
  // 5
  // assignment_criteria
  // :
  // {name: 'oblig_2_darling', schema: {…}}
  // assignment_description
  // :
  // "Oblig#2    From wireframe to finished website
  // assignment_end_date
  // :
  // "2025-04-30T22:00:00.000Z"
  // assignment_id
  // :
  // 2
  // assignment_start_date
  // :
  // "2025-03-13T23:00:00.000Z"
  // assignment_title
  // :
  // "14-03-25 Web Coding Oblig 2 TEST CASE"
  // course_id
  // :
  // 1
  // is_active
  // :
  // 1
  // max_score
  // :
  // 30
  // pass_threshold
  // :
  // "0.70"

  return (
    <>
      <h1>Edit {assignment?.assignment_title}</h1>

      {assignment?.assignment_criteria && (
        <AssignmentCriteriaForm
          onHandleCriteria={handleCriteriaChange}
          onHandleMaxScoreChange={handleMaxScoreChange}
          criteria={assignment.assignment_criteria}
          isEditing={true}
        />
      )}
    </>
  );
};

export default LecturerEditAssignmentPage;
