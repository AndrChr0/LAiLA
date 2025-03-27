import React from "react";
import { useAuth } from "../context/AuthContext";
import { MdOpenInNew } from "react-icons/md";
import { FaFileSignature } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Assessments = ({ assessments }) => {
  const { userRole } = useAuth();
  const navigate = useNavigate();

  const handleOnClickGrade = (assessment_id) => {
    navigate(`/grade-assessment/${assessment_id}`);
  };

  return (
    <>
      <div className="mb-[100px]">
        {assessments.length > 0 ? (
          assessments.map((assessment) => {
            return (
              <div
                key={assessment.assessment_id}
                className={`p-4 border rounded-lg transition-all  flex items-center justify-between mb-4 border-gray-200 bg-white `}
              >
                <div>
                  <div className="flex items-center gap-2">
                    {assessment.assessment_result === "pass" ? (
                      <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                        PASS
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">
                        FAIL
                      </span>
                    )}
                    <h2 className="px-2 py-1 text-xs font-medium bg-gray-100 rounded-full text-gray">{assessment.submission_date}</h2>
                    <h3 className="text-lg font-medium text-gray-800">
                      {assessment.student_name}
                    </h3>
                   
                  </div>

                  <div className="text-sm font-medium text-gray-600"></div>
                </div>

                <div className="">
                  {userRole === "student" ? (
                    <button
                      onClick={""}
                      className="flex items-center gap-1 px-3 py-1 text-sm text-black bg-white border border-gray-300 rounded hover:cursor-pointer transition-all duration-300  hover:scale-[1.02]"
                    >
                      View Details
                    </button>
                  ) : (
                    <div className="flex gap-3">
                      {assessment.is_reviewed === 0 ? (
                        <button
                          onClick={() =>
                            handleOnClickGrade(assessment.assessment_id)
                          }
                          className="flex items-center gap-1 px-3 py-1 text-sm text-black transition-all duration-300  hover:scale-[1.02] bg-white border border-gray-300 rounded hover:cursor-pointer"
                        >
                          Grade <FaFileSignature />
                        </button>
                      ) : (
                        <button
                        onClick={() =>
                          handleOnClickGrade(assessment.assessment_id)
                        }
                          className="flex items-center gap-1 px-3 py-1 text-sm text-black transition-all duration-300  hover:scale-[1.02] bg-white border border-gray-300 rounded hover:cursor-pointer"
                        >
                          Edit grade <FaFileSignature />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p>No assessments.
          </p>
        )}
      </div>
    </>
  );
};

export default Assessments;
