import { Link } from "react-router-dom";

function GradedAssignments({ assessments }) {
  return (
    <div>
      {assessments &&
        assessments.map((item, index) => (
          <div
            className='flex flex-col md:flex-row justify-between items-center bg-white rounded-lg p-6 mb-4 w-full transition-all duration-200 border border-gray-200   '
            key={index}
          >
            <div className='flex flex-col w-full md:w-1/2 mb-4 md:mb-0'>
              <h3 className='text-xl font-semibold text-gray-800'>
                {item.assignment_title}
              </h3>
              <p className='text-sm text-gray-600 mt-1'>
                Assessed: {item.submission_date}
              </p>
            </div>
            <Link
              className='flex items-center gap-1 px-3 py-1 text-sm text-black bg-white border border-gray-300 rounded hover:cursor-pointer transition-all duration-300  hover:scale-[1.02]'
              to={`/student/final-assessment/${item.assessment_id}`}
            >
              View Grade
            </Link>
          </div>
        ))}
    </div>
  );
}

export default GradedAssignments;
