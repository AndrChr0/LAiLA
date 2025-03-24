import React from 'react'
import { useParams, Link } from "react-router-dom";
import { useFetchAssignments } from '../../utils/fetches/useFetchAssignments'
import { GetConfig} from "../../utils/GetConfig"
import { useAuth } from "../../context/AuthContext";
import Assessments from '../../components/Assessments';

const FinalAssessmentsPage = () => {
      const { token } = useAuth();
      const { assignments } = useFetchAssignments(GetConfig(token));
      const path = useParams();
      const courseId = path.id;



  return (
    <>
        <Assessments />
    </>
  )
}

export default FinalAssessmentsPage