import React from "react";
import { useState, useEffect } from "react";
import AssignmentCriteriaForm from "../../components/AssignmentCriteriaForm";
import instance from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import ToolTip from "../../shared/ToolTip";
import { GetConfig } from "../../utils/GetConfig";

function NewAssignmentPage() {
  const { userId } = useAuth();
  const { token } = useAuth();

  // TODO: refactor state usage
  const [assignment_title, setAssignmentTitle] = useState("");
  const [assignment_start_date, setAssignmentStart] = useState("");
  const [assignment_end_date, setAssignmentEnd] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isPublic, setIsPublic] = useState(true);
  const [assignment_attempts, setAssignmentAttempts] = useState(0);
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
    instance
      .post("api/assignments", {
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
      })
      .then((response) => {
        console.log(response.data);
      });
  }

  console.log("course ID", courseId);
  return (
    <>
      <h1 className='text-3xl font-light'>New Assignment</h1>
      <div className='flex flex-col w-11/12 pt-4 mx-auto my-0 md:w-2/3'>
        <label htmlFor='course'>Select Course</label>
        <select
          className='p-2 mb-4 bg-white border border-gray-400'
          name='course'
          id='course'
          onChange={(e) => setCourseId(e.target.value)}
        >
          {lecturerCourses.map((course) => (
            <option key={course.course_id} value={course.course_id}>
              {course.course_name}
            </option>
          ))}
        </select>

        <label htmlFor='assignment_title'>Assignment Title</label>
        <input
          onChange={(e) => setAssignmentTitle(e.target.value)}
          value={assignment_title}
          className='p-2 mb-4 bg-white border border-gray-400'
          type='text'
          name='assignment_title'
          id='assignment_title'
        />

        <label htmlFor='assignment_start'>Start Date</label>
        <input
          onChange={(e) => setAssignmentStart(e.target.value)}
          value={assignment_start_date}
          className='p-2 mb-4 bg-white border border-gray-400 w-36'
          type='date'
          name='assignment_start'
          id='assignment_start'
        />

        <label htmlFor='assignment_end'>End Date</label>
        <input
          onChange={(e) => setAssignmentEnd(e.target.value)}
          value={assignment_end_date}
          className='p-2 mb-4 bg-white border border-gray-400 w-36'
          type='date'
          name='assignment_end'
          id='assignment_end'
        />
        <div className='flex items-center py-8'>
          <div className='flex gap-4'>
            <ToolTip toolText='Assignment is publically viewable by students in your course' />
            <label htmlFor='is_public'>Make Public</label>
          </div>

          <input
            onChange={handleIsPublicChange}
            checked={isPublic}
            className='w-16 bg-white border border-gray-400'
            type='checkbox'
            name='is_public'
            id='is_public'
          />
        </div>

        {isPublic && (
          <div className='flex items-center py-8'>
            <div className='flex gap-4'>
              <ToolTip toolText='Students can recieve feedback on their assignments by Athea AI' />
              <label htmlFor='is_active'>Is Active</label>
            </div>
            <input
              onChange={handleIsActiveChange}
              checked={isActive}
              className='w-16 border border-gray-400'
              type='checkbox'
              name='is_active'
              id='is_active'
            />
          </div>
        )}

        <ToolTip toolText='Number of attempts allowed for this assignment' />
        <label htmlFor='assignment_attempts'>Assignment Attempts</label>
        <input
          onChange={(e) => setAssignmentAttempts(e.target.value)}
          value={assignment_attempts}
          className='w-16 p-2 mb-4 bg-white border border-gray-400'
          min={0}
          max={5}
          type='number'
          name='assignment_attempts'
          id='assignment_attempts'
        />

        <label htmlFor='assignment_description'>
          Paste assignment description
        </label>
        <textarea
          className='h-40 p-2 mb-4 bg-white border border-gray-400'
          onChange={(e) => setAssignmentDescription(e.target.value)}
          name='assignment_description'
          id='assignment_description'
        ></textarea>

        <ToolTip toolText='Add filetypes that will be assessed. Filtypes that are not specified will not be accessed Athea AI.' />
        <label htmlFor='assignment_filetypes'>
          Add filetypes to be analyzed
        </label>
        <input
          onChange={(e) => setAssignmentFiletype(e.target.value)}
          value={allowed_filetype}
          className='p-2 mb-4 bg-white border border-gray-400'
          type='text'
          name='assignment_filetypes'
          id='assignment_filetypes'
        />
        <button
          onClick={handleFileChange}
          type='button'
          className='w-20 p-2 mb-4 bg-white border border-gray-400'
        >
          Add
        </button>
        <div className='flex flex-wrap gap-2'>
          {allowed_filetypes.map((filetype, index) => (
            <span key={index} className=''>
              <span>{filetype}</span>
              <button
                className='w-16 mb-4 ml-2 bg-white border border-gray-400'
                type='button'
                onClick={() => {
                  setAssignmentFiletypes(
                    allowed_filetypes.filter((file) => file !== filetype)
                  );
                }}
              >
                Remove
              </button>
            </span>
          ))}
        </div>

        <ToolTip toolText='Percentage value required to indicate a pass or fail grade' />
        <label htmlFor='passPercentage'>Pass Percentage</label>
        <input
          onChange={(e) => setPassPercentage(e.target.value)}
          value={passPercentage}
          className='w-16 p-2 mb-4 bg-white border border-gray-400'
          min={0}
          max={100}
          type='number'
          name='passPercentage'
          id='passPercentage'
        />
        <AssignmentCriteriaForm
          onHandleCriteria={handleCriteriaChange}
          onHandleMaxScoreChange={handleMaxScoreChange}
        />
        <button
          type='submit'
          className='p-2 mt-4 border border-gray-400 w-28'
          onClick={handleSubmit}
        >
          Publish Assignment
        </button>
      </div>
    </>
  );
}

export default NewAssignmentPage;
