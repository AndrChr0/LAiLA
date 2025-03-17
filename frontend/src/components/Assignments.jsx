import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MdOpenInNew } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

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

  const isDueSoon = (dateString) => {
    try {
      const dueDate = new Date(dateString);
      const today = new Date();
      const diffTime = dueDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7 && diffDays >= 0;
    } catch (e) {
      return false;
    }
  };

  const isOverdue = (dateString) => {
    try {
      const dueDate = new Date(dateString);
      const today = new Date();
      return dueDate < today;
    } catch (e) {
      return false;
    }
  };

  return (
    <div className='mb-[100px]'>
      {assignments.length > 0 ? (
        assignments.map((assignment) => {
          const dueSoon = isDueSoon(assignment.assignment_end_date);
          const overdue = isOverdue(assignment.assignment_end_date);

          return (
            
            <div
              key={assignment.assignment_id}
              // className={`p-4 border rounded-lg transition-all  flex items-center justify-between mb-4
              //   ${
              //     overdue
              //       ? "border-red-300 bg-red-50"
              //       : dueSoon
              //       ? "border-yellow-300 bg-yellow-50"
              //       : "border-gray-200 bg-white "
              //   }`}
              

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

                  {/* <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-600">
                    {assignment.course_code} {" "}
                    {assignment.course_name}: {" "}
                    </div>
                    <h3 className='mb-1 text-lg font-medium text-gray-800'>
                    {assignment.assignment_title} (Course ID:{" "}
                    {assignment.course_id})
                  </h3>
                  </div> */}

                  <h3 className='mb-1 text-lg font-medium text-gray-800'>
                  {assignment.course_code} {" "}
                  {assignment.course_name}: {" "}
                  {assignment.assignment_title} 
                  </h3>
                       
                  
                </div>
        
                <div
                  // className={`text-sm font-medium  ${
                  //   overdue
                  //     ? "text-red-600"
                  //     : dueSoon
                  //     ? "text-yellow-600"
                  //     : "text-gray-600"
                  // }`}

                  className="text-sm font-medium text-gray-600"
                >
                  Due: {formatDate(assignment.assignment_end_date)}
                  {overdue && " (Overdue)"}
                  {dueSoon && !overdue && " (Due soon)"}
                </div>
              </div>

              <div className=''>
                {userRole === "student" ?(
                   <button
                   onClick={() => handleViewDetails(assignment.assignment_id)}
                   className='flex items-center gap-1 px-3 py-1 text-sm text-black bg-white border border-gray-300 rounded hover:cursor-pointer transition-all duration-300  hover:scale-[1.02]'
                 >
                   View Details
                 </button>
                ) : (
                  <div className="flex gap-2">
                
                <button
                  onClick={() => handleViewReport(assignment.assignment_id)}
                  className='flex items-center gap-1 px-3 py-1 text-sm text-black transition-all duration-300  hover:scale-[1.02] bg-white border border-gray-300 rounded hover:cursor-pointer'
                >View report <MdOpenInNew />
                </button>

                <button
                onClick={() => handleEditAssignment(assignment.assignment_id)}
                className='flex items-center gap-1 px-3 py-1 text-sm text-black transition-all duration-300  hover:scale-[1.02] bg-white border border-gray-300 rounded hover:cursor-pointer'
                >Edit <CiEdit />
                </button>
                </div>
              )}
               
              </div>
            </div>
          );
        })
      ) : (
        <p>No assignments found.</p>
      )}
    </div>
  );
};

export default Assignments;
