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
          className="flex justify-around items-center border-2 p-4 w-2/3"
          key={index}>
            <h3>{item.assignment_title}</h3>
            <p>Assessed: {item.submission_date}</p>
            <Link
              className="border-2 p-2 hover:cursor-pointer bg-white hover:bg-gray-200"
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
