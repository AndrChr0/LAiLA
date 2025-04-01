import { Link } from "react-router-dom";

function GradedAssignments({ assessments }) {
  console.log("gradd ass: ", assessments);

  assessments.map((item, index) => {
    console.log(item.assignment_title, index);
  });
  return (
    <div>
      {assessments &&
        assessments.map((item, index) => (
          <div
            className='flex flex-col md:flex-row justify-between items-center bg-white rounded-lg shadow-md p-6 mb-4 w-full transition-all duration-200 hover:shadow-lg border-l-4 border-blue-500'
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
              className='w-full md:w-auto px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-colors duration-200 text-center'
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
