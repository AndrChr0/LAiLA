import React from "react";
import { useState, useEffect } from "react";
import AssignmentCriteriaForm from "../../components/AssignmentCriteriaForm";
import instance from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import ToolTip from "../../shared/ToolTip";
import { GetConfig } from "../../utils/GetConfig";
import BackComponent from "../../components/BackComponent";
import { Link } from "react-router-dom";

function NewAssignmentPage() {
  const { userId } = useAuth();
  const { token } = useAuth();

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // TODO: refactor state usage
  const [assignment_title, setAssignmentTitle] = useState("");
  const [assignment_start_date, setAssignmentStart] = useState("");
  const [assignment_end_date, setAssignmentEnd] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isPublic, setIsPublic] = useState(true);
  const [assignment_attempts, setAssignmentAttempts] = useState(1);
  const [assignment_description, setAssignmentDescription] = useState("");
  const [allowed_filetype, setAssignmentFiletype] = useState("");
  const [allowed_filetypes, setAssignmentFiletypes] = useState([]);
  const [assignment_criteria, setAssignmentCriteria] = useState({});
  const [passPercentage, setPassPercentage] = useState(70);
  const [maxScore, setMaxScore] = useState(0);
  const [lecturerCourses, setLecturerCourses] = useState([]);
  const [courseId, setCourseId] = useState(0);

  useEffect(() => {
    instance
      .get(`api/courses?course_coordinator=${userId}`, GetConfig(token))
      .then((response) => {
        setLecturerCourses(response.data);
        setCourseId(response.data[0].course_id);
      });
  }, [userId]);

  console.log("Courses:", lecturerCourses);

  function handleMaxScoreChange(newScore) {
    setMaxScore(newScore);
  }

  function handleCriteriaChange(criteria) {
    setAssignmentCriteria(criteria);
  }

  function handleIsActiveChange() {
    setIsActive(!isActive);
  }

  function handleIsPublicChange() {
    setIsPublic((prev) => {
      const newIsPublic = !prev;
      if (!newIsPublic) {
        setIsActive(false);
      }
      return newIsPublic;
    });
  }

  console.log("isPublic:", isPublic);
  console.log("isActive:", isActive);

  function handleFileChange() {
    if (!allowed_filetype) {
      return;
    }

    if (allowed_filetypes.includes(allowed_filetype)) {
      return;
    }

    if (allowed_filetype.startsWith(".")) {
      setAssignmentFiletypes([...allowed_filetypes, allowed_filetype]);
    } else {
      setAssignmentFiletypes([...allowed_filetypes, `.${allowed_filetype}`]);
    }
    setAssignmentFiletype("");
  }
  console.log("filetypes:", allowed_filetypes);

  function handleSubmit(e) {
    e.preventDefault();

    if (!assignment_title) {
      setErrorMsg("Please enter an assignment title");
      return;
    }
    if (!assignment_start_date) {
      setErrorMsg("Please enter an assignment start date");
      return;
    }

    if (!assignment_end_date) {
      setErrorMsg("Please enter an assignment end date");
      return;
    }
    if (!assignment_description) {
      setErrorMsg("Please enter an assignment description");
      return;
    }

    if (!assignment_criteria) {
      setErrorMsg("Please enter assignment criteria");
      return;
    }

    if (allowed_filetypes.length === 0) {
      setErrorMsg("Please enter allowed filetypes");
      return;
    }

    if (!assignment_attempts) {
      setErrorMsg("Please enter assignment attempts");
      return;
    }

    if (!passPercentage) {
      setErrorMsg("Please enter pass percentage");
      return;
    }

    instance
      .post(
        "api/assignments",
        {
          assignment_title: assignment_title,
          assignment_start_date: assignment_start_date,
          assignment_end_date: assignment_end_date,
          is_active: isActive,
          is_public: isPublic,
          assignment_description: assignment_description,
          assignment_criteria: JSON.stringify(assignment_criteria),
          course_id: courseId,
          max_score: maxScore,
          pass_threshold: passPercentage / 100,
          assignment_attempts: assignment_attempts,
          allowed_filetypes: allowed_filetypes,
        },
        GetConfig(token)
      )
      .then((response) => {
        console.log(response.data);
        setSuccessMsg("Assignment created successfully");
        setErrorMsg("");
      });
  }

  console.log("course ID", courseId);
  return (
    <main>
      <BackComponent destination="/home" />
      <h1 className="text-3xl font-light">New Assignment</h1>
      <div className="flex flex-col pt-4 mx-auto my-0 ">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col">
            <label htmlFor="course">Select Course</label>
            <select
              className="p-2 mb-4 bg-white border border-gray-400"
              name="course"
              id="course"
              onChange={(e) => setCourseId(e.target.value)}
            >
              {lecturerCourses.map((course) => (
                <option key={course.course_id} value={course.course_id}>
                  {course.course_name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="assignment_title">Assignment Title</label>
            <input
              onChange={(e) => setAssignmentTitle(e.target.value)}
              value={assignment_title}
              className="p-2 mb-4 bg-white border border-gray-400"
              type="text"
              name="assignment_title"
              id="assignment_title"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="assignment_start">Start Date</label>
            <input
              onChange={(e) => setAssignmentStart(e.target.value)}
              value={assignment_start_date}
              className="p-2 mb-4 bg-white border border-gray-400 "
              type="date"
              name="assignment_start"
              id="assignment_start"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="assignment_end">End Date</label>
            <input
              onChange={(e) => setAssignmentEnd(e.target.value)}
              value={assignment_end_date}
              className="p-2 mb-4 bg-white border border-gray-400"
              type="date"
              name="assignment_end"
              id="assignment_end"
            />
          </div>
        </div>

        <div className="flex justify-between w-full h-auto p-4 border border-gray-400 rounded">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <label htmlFor="is_public">Make Public</label>
              <ToolTip toolText="Assignment is publically viewable by students in your course" />
            </div>

            <input
              onChange={handleIsPublicChange}
              checked={isPublic}
              className="mt-1 bg-white border-2 border-blue-500 rounded-sm h-7 w-15 shrink-0 checked:bg-blue-500 checked:border-0"
              type="checkbox"
              name="is_public"
              id="is_public"
            />
          </div>

          {isPublic && (
            <div className="flex flex-col items-center gap-3 ">
              <div className="flex items-center gap-2">
                <label htmlFor="is_active">Is Active</label>
                <ToolTip toolText="Students can recieve feedback on their assignments by Athea AI" />
              </div>
              <input
                onChange={handleIsActiveChange}
                checked={isActive}
                className="mt-1 bg-white border-2 border-blue-500 rounded-sm h-7 w-15 shrink-0 checked:bg-blue-500 checked:border-0"
                type="checkbox"
                name="is_active"
                id="is_active"
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <label htmlFor="assignment_attempts">Attempts allowed</label>
              <ToolTip toolText="Number of attempts allowed for this assignment" />
            </div>

            <input
              onChange={(e) => setAssignmentAttempts(e.target.value)}
              value={assignment_attempts}
              className="w-16 p-2 mb-4 bg-white border border-gray-400"
              min={1}
              max={5}
              type="number"
              name="assignment_attempts"
              id="assignment_attempts"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <label htmlFor="passPercentage">Pass Percentage</label>
              <ToolTip toolText="Percentage value required to indicate a pass or fail grade" />
            </div>

            <input
              onChange={(e) => setPassPercentage(e.target.value)}
              value={passPercentage}
              className="w-16 p-2 mb-4 bg-white border border-gray-400"
              min={0}
              max={100}
              type="number"
              name="passPercentage"
              id="passPercentage"
            />
          </div>
        </div>

        <label htmlFor="assignment_description">
          Paste assignment description
        </label>
        <textarea
          className="h-40 p-2 mb-4 bg-white border border-gray-400"
          onChange={(e) => setAssignmentDescription(e.target.value)}
          name="assignment_description"
          id="assignment_description"
        ></textarea>

        <ToolTip toolText="Add filetypes that will be assessed. Filtypes that are not specified will not be accessed Athea AI." />
        <label htmlFor="assignment_filetypes">
          Add filetypes to be analyzed
        </label>

        <div className="flex gap-2">
          <input
            onChange={(e) => setAssignmentFiletype(e.target.value)}
            value={allowed_filetype}
            className="w-full p-2 mb-4 bg-white border border-gray-400"
            type="text"
            name="assignment_filetypes"
            id="assignment_filetypes"
          />
          <button
            onClick={handleFileChange}
            type="button"
            className="w-20 p-2 mb-4 bg-white border border-gray-400"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-7">
          {allowed_filetypes.map((filetype, index) => (
            <span key={index} className="">
              <span className="flex items-center px-3 py-2 bg-gray-300 rounded-4xl ">
                {filetype}{" "}
                <button
                  className="flex items-center justify-center w-4 h-4 ml-2 text-[10px] text-gray-500 bg-gray-300 border-1 border-gray-500 rounded-full"
                  type="button"
                  onClick={() => {
                    setAssignmentFiletypes(
                      allowed_filetypes.filter((file) => file !== filetype)
                    );
                  }}
                >
                  X
                </button>
              </span>
            </span>
          ))}
        </div>

        <AssignmentCriteriaForm
          onHandleCriteria={handleCriteriaChange}
          onHandleMaxScoreChange={handleMaxScoreChange}
        />
        <button
          type="submit"
          className="p-2 bg-green-600 text-white font-bold mt-4 border border-gray-400 w-28 hover:cursor-pointer hover:bg-green-900"
          onClick={handleSubmit}
        >
          Publish Assignment
        </button>

        {errorMsg && <p className="mt-4 text-red-500">{errorMsg}</p>}

        {successMsg && (
          <>
            <p className="mt-4 text-green-500">{successMsg}</p>
            <Link to="/home" className="text-blue-500 underline">
              Go to Home
            </Link>
          </>
        )}
      </div>
    </main>
  );
}

export default NewAssignmentPage;
