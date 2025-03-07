import React from "react";
import { useState } from "react";
import AssignmentCriteriaForm from "../../components/AssignmentCriteriaForm";
import axios from "axios";

function NewAssignmentPage() {

  // propably refactor state usage
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

  console.log("Max Score:", maxScore);

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
    setIsPublic(prev => {
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
      setAssignmentFiletypes([
        ...allowed_filetypes,
        `.${allowed_filetype}`,
      ]);
    }
    setAssignmentFiletype("");
  }
  console.log("filetypes:", allowed_filetypes);



  

  function handleSubmit(e) {
  let assignmentData = new FormData();

    e.preventDefault();
    console.log("Assignment Title:", assignment_title);
    console.log("Assignment Start:", assignment_start_date);
    console.log("Assignment End:", assignment_end_date);
    console.log("Assignment Attempts:", assignment_attempts);
    console.log("Assignment Description:", assignment_description);
    console.log("Assignment Filetypes:", allowed_filetypes);
    console.log("Assignment Criteria:", assignment_criteria);
    console.log("Pass Percentage:", passPercentage);
    console.log("Is Active:", isActive);
    console.log("Is Public:", isPublic);
    console.log("Max Score:", maxScore);

  assignmentData.append("assignment_title", assignment_title);
   assignmentData.append("assignment_start_date", assignment_start_date);
   assignmentData.append("assignment_end_date", assignment_end_date);
   assignmentData.append("is_active", isActive);
   assignmentData.append("is_public", isPublic);
   assignmentData.append("assignment_description", assignment_description);
   assignmentData.append("assignment_criteria", JSON.stringify(assignment_criteria));
   assignmentData.append("course_id", 1); 
   assignmentData.append("max_score", maxScore  ); 
   assignmentData.append("pass_threshold", passPercentage); 
   assignmentData.append("assignment_attempts", assignment_attempts);
   assignmentData.append("allowed_filetypes", allowed_filetypes);
console.log("assignment data", assignmentData);
    axios.post("http://localhost:5310/api/assignments", {
      assignment_title: assignment_title,
      assignment_start_date: assignment_start_date,
      assignment_end_date: assignment_end_date,
      is_active: isActive,
      is_public: isPublic,
      assignment_description: assignment_description,
      assignment_criteria: JSON.stringify(assignment_criteria),
      course_id: 1,
      max_score: maxScore,
      pass_threshold: passPercentage,
      assignment_attempts: assignment_attempts,
      allowed_filetypes: allowed_filetypes
    })
    .then((response) => {
      console.log(response.data);
    })

  } 

  return (
    <>
      <h1 className='text-3xl font-light'>New Assignment</h1>
      <div className='flex flex-col w-11/12 md:w-2/3 mx-auto my-0 pt-4'>
        <label htmlFor='assignment_title'>Assignment Title</label>
        <input
          onChange={(e) => setAssignmentTitle(e.target.value)}
          value={assignment_title}
          className='border border-gray-400 p-2 mb-4'
          type='text'
          name='assignment_title'
          id='assignment_title'
        />

        <label htmlFor='assignment_start'>Start Date</label>
        <input
          onChange={(e) => setAssignmentStart(e.target.value)}
          value={assignment_start_date}
          className='border border-gray-400 p-2 w-36 mb-4'
          type='date'
          name='assignment_start'
          id='assignment_start'
        />

        <label htmlFor='assignment_end'>End Date</label>
        <input
          onChange={(e) => setAssignmentEnd(e.target.value)}
          value={assignment_end_date}
          className='border border-gray-400 p-2 w-36 mb-4'
          type='date'
          name='assignment_end'
          id='assignment_end'
        />
    <div className="flex items-center py-8">
        <label htmlFor='is_public'>Make Public</label>
        <input
          onChange={handleIsPublicChange}
          checked={isPublic}
          className='border border-gray-400 w-16'
          type='checkbox'
          name='is_public'
          id='is_public'
        />
    </div>

    {isPublic && (
      <div className="flex items-center py-8">
        <label htmlFor='is_active'>Is Active</label>
        <input
          onChange={handleIsActiveChange}

          checked={isActive}
          className='border border-gray-400 w-16'
          type='checkbox'
          name='is_active'
          id='is_active'
        />
      </div>
    )}

        <label htmlFor='assignment_attempts'>Assignment Attempts</label>
        <input
          onChange={(e) => setAssignmentAttempts(e.target.value)}
          value={assignment_attempts}
          className='border border-gray-400 p-2 w-16 mb-4'
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
          className='border border-gray-400 p-2 mb-4 h-40'
          onChange={(e) => setAssignmentDescription(e.target.value)}
          name='assignment_description'
          id='assignment_description'
        ></textarea>

        <label htmlFor='assignment_filetypes'>
          Add filetypes to be analyzed
        </label>
        <input
          onChange={(e) => setAssignmentFiletype(e.target.value)}
          value={allowed_filetype}
          className='border border-gray-400 p-2 mb-4'
          type='text'
          name='assignment_filetypes'
          id='assignment_filetypes'
        />
        <button
          onClick={handleFileChange}
          type='button'
          className='border border-gray-400 p-2 w-20 mb-4'
        >
          Add
        </button>
        <div className='flex flex-wrap gap-2'>
          {allowed_filetypes.map((filetype, index) => (
            <span key={index} className=''>
              <span>{filetype}</span>
              <button
                className='border border-gray-400 w-16 mb-4 ml-2'
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

        <label htmlFor='passPercentage'>Pass Percentage</label>
        <input
          onChange={(e) => setPassPercentage(e.target.value)}
          value={passPercentage}
          className='border border-gray-400 p-2 w-16 mb-4'
          min={0}
          max={100}
          type='number'
          name='passPercentage'
          id='passPercentage'
        />
        <AssignmentCriteriaForm onHandleCriteria={handleCriteriaChange} onHandleMaxScoreChange={handleMaxScoreChange} />
        <button
          type='submit'
          className='border border-gray-400 p-2 w-28 mt-4'
          onClick={handleSubmit}
        >
          Publish Assignment
        </button>
      </div>
    </>
  );
}

export default NewAssignmentPage;
