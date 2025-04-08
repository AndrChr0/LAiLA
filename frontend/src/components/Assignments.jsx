import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MdOpenInNew } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaFileSignature } from "react-icons/fa";

const Assignments = ({ assignments }) => {
  const navigate = useNavigate();
  const { userRole } = useAuth();

  const handleViewDetails = (assignmentId) => {
    navigate(`/assignment-assessment/${assignmentId}`);
  };

  const handleViewReport = (assignmentId) => {
    navigate(`/assignment-report/${assignmentId}`);
  };

  const handleEditAssignment = (assignmentId) => {
    navigate(`/edit-assignment/${assignmentId}`);
  };
  const handleOnClickGrade = (assignmentId) => {
    navigate(`/final-assessment/${assignmentId}`);
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  const isOverdue = (dateString) => {
    try {
      const dueDate = new Date(dateString);
      const today = new Date();
      return dueDate < today;
    } catch (error) {
      return false;
    }
  };

  return (
    <div>
      {assignments.length > 0 ? (
        assignments.map((assignment) => {
          const overdue = isOverdue(assignment.assignment_end_date);
          return (
            <div
              key={assignment.assignment_id}
              className={`p-4 border rounded-lg transition-all  flex items-center justify-between mb-4 border-gray-200 bg-white `}
            >
              <div>
                <div className='flex items-center gap-2 mb-2'>
                  {assignment.is_active === 1 ? (
                    <span className='px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full'>
                      Active
                    </span>
                  ) : (
                    <span className='px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full'>
                      Inactive
                    </span>
                  )}

                  {assignment.is_public === 1 && userRole === "lecturer" ? (
                    <span className='px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-full'>
                      Public
                    </span>
                  ) : assignment.is_public === 0 && userRole === "lecturer" ? (
                    <span className='px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-full'>
                      Not Public
                    </span>
                  ) : null}

                  <h3 className='mb-1 text-lg font-medium text-gray-800'>
                    <span className="text-gray-500 ">{assignment.course_code} {assignment.course_name}:{" "}</span> 
                    {assignment.assignment_title}
                  </h3>
                </div>

                <div className='text-sm font-medium text-gray-600'>
                  {overdue ? "Overdued: " : "Due: "}{" "}
                  {formatDate(assignment.assignment_end_date)}
                </div>
              </div>

              <div className=''>
                {userRole === "student" ? (
                  <button
                    onClick={() => handleViewDetails(assignment.assignment_id)}
                    className='flex items-center gap-1 px-3 py-1 text-sm text-black bg-white border border-gray-300 rounded hover:cursor-pointer transition-all duration-300  hover:scale-[1.02]'
                  >
                    Open Assignment
                  </button>
                ) : (
                  <div className='flex gap-3'>
                    {assignment.is_active === 0 && (
                      <button
                        onClick={() =>
                          handleOnClickGrade(assignment.assignment_id)
                        }
                        className='flex items-center gap-1 px-3 py-1 text-sm text-black transition-all duration-300  hover:scale-[1.02] bg-white border border-gray-300 rounded hover:cursor-pointer'
                      >
                        Grades <FaFileSignature />
                        <div className='flex items-center justify-center w-[25px] h-[25px] bg-[#9AEFFF] absolute rounded-full translate-x-[55px] translate-y-[-15px]  '>
                          {assignment.total_assessments_not_reviewed}
                        </div>
                      </button>
                    )}

                    <button
                      onClick={() => handleViewReport(assignment.assignment_id)}
                      className='flex items-center gap-1 px-3 py-1 text-sm text-black transition-all duration-300  hover:scale-[1.02] bg-white border border-gray-300 rounded hover:cursor-pointer'
                    >
                      View report <MdOpenInNew />
                    </button>

                    <button
                      onClick={() =>
                        handleEditAssignment(assignment.assignment_id)
                      }
                      className='flex items-center gap-1 px-3 py-1 text-sm text-black transition-all duration-300  hover:scale-[1.02] bg-white border border-gray-300 rounded hover:cursor-pointer'
                    >
                      Edit <CiEdit />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <p className="pt-2 pb-30">No assignments found.</p>
      )}
    </div>
  );
};

export default Assignments;
