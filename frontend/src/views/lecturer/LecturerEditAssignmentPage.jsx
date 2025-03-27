import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import instance from "../../utils/axiosInstance";
import AssignmentCriteriaForm from "../../components/AssignmentCriteriaForm";
import { GetConfig } from "../../utils/GetConfig";
import { useAuth } from "../../context/AuthContext";
import BackComponent from "../../components/BackComponent";

const LecturerEditAssignmentPage = () => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState({});
  const [assignment_title, setAssignmentTitle] = useState("");
  const [assignment_start_date, setAssignmentStart] = useState("");
  const [assignment_end_date, setAssignmentEnd] = useState("");
  const [isActive, setIsActive] = useState("");
  const [isPublic, setIsPublic] = useState("");
  const [assignment_attempts, setAssignmentAttempts] = useState(0);
  const [assignment_description, setAssignmentDescription] = useState("");
  const [allowed_filetype, setAssignmentFiletype] = useState("");
  const [allowed_filetypes, setAssignmentFiletypes] = useState([]);
  const [assignment_criteria, setAssignmentCriteria] = useState({});
  const [passPercentage, setPassPercentage] = useState(70);
  const [maxScore, setMaxScore] = useState(0);

  const { token } = useAuth();

  useEffect(() => {
    instance.get(`/api/assignments/${id}`).then((res) => {
      setAssignment(res.data);
      const filesArray = res.data.allowed_filetypes.split(", ");
      setAssignmentTitle(res.data.assignment_title);
      setAssignmentStart(res.data.assignment_start_date.split("T")[0]);
      setAssignmentEnd(res.data.assignment_end_date.split("T")[0]);
      setIsActive(res.data.is_active);
      setIsPublic(res.data.is_public);
      setAssignmentAttempts(res.data.assignment_attempts);
      setAssignmentDescription(res.data.assignment_description);
      setAssignmentFiletypes(filesArray);
      setAssignmentCriteria(res.data.assignment_criteria);
      setPassPercentage(parseInt(res.data.pass_threshold) * 100);
      setMaxScore(res.data.max_score);
    });
  }, [id]);

  function handleMaxScoreChange(newScore) {
    setMaxScore(newScore);
  }

  function handleCriteriaChange(criteria) {
    setAssignmentCriteria(criteria);
  }

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

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("submitting");
    console.log(assignment_criteria);

    try {
      const res = await instance.patch(
        `/api/assignments/${id}`,
        {
          assignment_title: assignment_title,
          assignment_start_date: assignment_start_date,
          assignment_end_date: assignment_end_date,
          is_active: isActive,
          is_public: isPublic,
          assignment_attempts: assignment_attempts,
          assignment_description: assignment_description,
          allowed_filetypes: allowed_filetypes,
          assignment_criteria: JSON.stringify(assignment_criteria),
          pass_threshold: passPercentage / 100,
          max_score: maxScore,
        },
        GetConfig(token)
      );
      console.log(res);
    } catch (error) {
      console.error("Failed to update assignment", error);
    }
  }

  return (
    <main>
      <BackComponent destination="/home" />
      <h1 className='text-4xl font-normal mb-[1.5em]'>
        <span className='font-bold'>Edit </span> {assignment?.assignment_title}
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col space-y-2'>

        
        <label
          htmlFor='assignment_title'
          className='block text-sm font-medium text-gray-700'
        >
          Title
        </label>
        <input
          type='text'
          id='assignment_title'
          name='assignment_title'
          value={assignment_title || ""}
          onChange={(e) => setAssignmentTitle(e.target.value)}
          className='p-2 mb-4 bg-white border border-gray-400'
        />
        <label htmlFor='assignment_description'>Description</label>
        <textarea
          id='assignment_description'
          name='assignment_description'
          value={assignment_description || ""}
          onChange={(e) => setAssignmentDescription(e.target.value)}
          className='p-2 mb-4 bg-white border border-gray-400'
        />
        <div className="flex w-full gap-4">
          <div className="flex flex-col">
            <label htmlFor='assignment_start_date'>Start Date</label>
            <input
              type='date'
              id='assignment_start_date'
              name='assignment_start_date'
              value={assignment_start_date || ""}
              onChange={(e) => setAssignmentStart(e.target.value)}
              className='w-full p-2 mb-4 bg-white border border-gray-400'
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor='assignment_end_date'>End Date</label>
            <input
              type='date'
              id='assignment_end_date'
              name='assignment_end_date'
              value={assignment_end_date || ""}
              onChange={(e) => setAssignmentEnd(e.target.value)}
              className='w-full p-2 mb-4 bg-white border border-gray-400'
            />
          </div>
      </div>
       
        <div className='flex items-center gap-4'>
          <label htmlFor='is_active'>Active</label>
          <input
            type='checkbox'
            id='is_active'
            name='is_active'
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
        </div>
        <div className='flex items-center gap-4'>
          <label htmlFor='is_public'>Public</label>
          <input
            type='checkbox'
            id='is_public'
            name='is_public'
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
        </div>
        <label htmlFor='assignment_attempts'>Attempts</label>
        <input
          type='number'
          id='assignment_attempts'
          name='assignment_attempts'
          value={assignment_attempts || 0}
          onChange={(e) => setAssignmentAttempts(e.target.value)}
          className='p-2 mb-4 bg-white border border-gray-400'
        />
        <label htmlFor='pass_percentage'>Pass Percentage</label>
        <input
          type='number'
          id='pass_percentage'
          name='pass_percentage'
          value={passPercentage || 70}
          onChange={(e) => setPassPercentage(e.target.value)}
          className='w-16 p-2 mb-4 bg-white border border-gray-400'
        />
        <label htmlFor='max_score'>Max Score</label>
        <input
          type='number'
          id='max_score'
          name='max_score'
          value={maxScore || 0}
          onChange={(e) => setMaxScore(e.target.value)}
          className='w-16 p-2 mb-4 bg-white border border-gray-400'
        />
        <div className='flex flex-col items-start'>
          <label htmlFor='allowed_filetype'>Allowed Filetypes</label>
          <input
            type='text'
            id='allowed_filetype'
            name='allowed_filetype'
            value={allowed_filetype || ""}
            onChange={(e) => setAssignmentFiletype(e.target.value)}
            className='w-40 p-2 mb-4 bg-white border border-gray-400'
          />
          <button
            className='w-40 p-2 mb-4 bg-white border border-gray-400 hover:bg-gray-100 hover:cursor-pointer'
            type='button'
            onClick={handleFileChange}
          >
            Add Filetype
          </button>
        </div>
        <div className='flex flex-wrap gap-2'>
          {allowed_filetypes &&
            allowed_filetypes.map((filetype, index) => (
              <span key={index} className=''>
                <span>{filetype}</span>
                <button
                  className='w-16 mb-4 ml-2 bg-white border border-gray-400 hover:cursor-pointer hover:bg-gray-100'
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

        {assignment?.assignment_criteria && (
          <AssignmentCriteriaForm
            onHandleCriteria={handleCriteriaChange}
            onHandleMaxScoreChange={handleMaxScoreChange}
            criteria={assignment.assignment_criteria}
            isEditing={true}
          />
        )}

        <button
          type='submit'
          className='w-40 p-2 mb-4 bg-white border border-gray-400 hover:bg-gray-100 hover:cursor'
        >
          Update Assignment
        </button>
      </form>
    </main>
  );
};

export default LecturerEditAssignmentPage;
