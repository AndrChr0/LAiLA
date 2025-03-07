// import React, { useState, useEffect } from 'react';
// import instance from '../utils/axiosInstance';

// const Assignments = ({ is_active }) => {
//     const [assignments, setAssignments] = useState([]);
//     const isLecturer = false; 
//     const userId = 2; 

//     useEffect(() => {
//       const fetchAssignments = async () => {
//         try {
//           const response = await instance.get("api/assignments", {
//             params: { 
//                 student_id: !isLecturer ? userId : undefined,
//                 course_coordinator: isLecturer ? userId : undefined,
//             },
//           });
//           console.log("Assignments API Response:", response.data);

//           const filteredAssignments = Array.isArray(response.data) 
//           ? response.data.filter(assignment => 
//               is_active === 1 ? assignment.is_active === 1 : assignment.is_active === 0) 
//           : [];

//           setAssignments(filteredAssignments);
//         } catch (error) {
//           console.error("Error fetching assignments:", error);
//           setAssignments([]); 
//         }
//       };

//       fetchAssignments();
//     }, [isLecturer, userId, is_active]); 

//     return (
//       <div>
//         <h2>Assignments</h2>
//         {assignments.length > 0 ? (
//           <div>
//             {assignments.map((assignment) => (
//               <div key={assignment.assignment_id}>
//                 {assignment.assignment_name} (Due: {assignment.assignment_end_date}) (Course id: {assignment.course_id})
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No assignments found.</p>
//         )}
//       </div>
//     );
// };

// export default Assignments;

import React, { useState, useEffect } from 'react';
import instance from '../utils/axiosInstance';

const Assignments = ({ is_active }) => {
  const [assignments, setAssignments] = useState([]);
  const isLecturer = false;
  const userId = 2;

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await instance.get("api/assignments", {
          params: {
            student_id: !isLecturer ? userId : undefined,
            course_coordinator: isLecturer ? userId : undefined,
          },
        });
        console.log("Assignments API Response:", response.data);

        const filteredAssignments = Array.isArray(response.data) 
         ? response.data.filter(assignment => 
           is_active === 1 ? assignment.is_active === 1 : assignment.is_active === 0) 
       : [];

        setAssignments(filteredAssignments);
      } catch (error) {
        console.error("Error fetching assignments:", error);
        setAssignments([]);
      }
    };

    fetchAssignments();
  }, [isLecturer, userId, is_active]);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
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
    <div >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Assignments</h2>
        <div className="text-sm text-gray-500">
          {is_active == 1 ? 'Showing active assignments' : 'Showing inactive assignments'}
        </div>
      </div>

     {assignments.length > 0 && (
        <div className="">
          {assignments.map((assignment) => {
            const dueSoon = isDueSoon(assignment.assignment_end_date);
            const overdue = isOverdue(assignment.assignment_end_date);
            
            return (
              <div 
                key={assignment.assignment_id} 
                className={`p-4 border rounded-lg transition-all hover:shadow-md flex items-center justify-between mb-4
                  ${overdue ? 'border-red-300 bg-red-50' : 
                    dueSoon ? 'border-yellow-300 bg-yellow-50' : 
                    'border-gray-200 bg-gray-50'}`}
              >

                <div>
                    <div className="flex items-center gap-2 mb-2">
                    {assignment.is_active === 1 ? (
                        <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                        Active
                        </span>
                    ): <span className="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">
                    Inactive
                    </span>}
                    <h3 className="mb-1 text-lg font-semibold text-gray-800">
                        {assignment.assignment_name} (Course ID: {assignment.course_id})
                    </h3>
                    
                    </div>
                    
                    
                    <div className={`text-sm font-medium ${
                    overdue ? 'text-red-600' : 
                    dueSoon ? 'text-yellow-600' : 
                    'text-gray-600'
                    }`}>
                    Due: {formatDate(assignment.assignment_end_date)}
                    {overdue && ' (Overdue)'}
                    {dueSoon && !overdue && ' (Due soon)'}
                    </div>

                </div>
               
                
                <div className="">
                  <button className="px-3 py-1 text-sm text-white transition-colors bg-blue-600 rounded hover:bg-blue-700">
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Assignments;
