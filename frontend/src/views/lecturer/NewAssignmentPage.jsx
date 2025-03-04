import React from "react";
import { useState } from "react";
import AssignmentCriteriaForm from "../../components/AssignmentCriteriaForm";

function NewAssignmentPage() {
  const [assignment_title, setAssignmentTitle] = useState("");
  const [assignment_start, setAssignmentStart] = useState("");
  const [assignment_end, setAssignmentEnd] = useState("");
  const [assignment_attempts, setAssignmentAttempts] = useState(0);
  const [assignment_description, setAssignmentDescription] = useState("");
  const [assignment_filetype, setAssignmentFiletype] = useState("");
  const [assignment_filetypes, setAssignmentFiletypes] = useState([]);
  const [assignment_criteria, setAssignmentCriteria] = useState({});

  function handleCriteriaChange(criteria) {
    setAssignmentCriteria(criteria);
  }

  function handleFileChange() {
    if (!assignment_filetype) {
      return;
    }

    if (assignment_filetypes.includes(assignment_filetype)) {
      return;
    }

    if (assignment_filetype.startsWith(".")) {
      setAssignmentFiletypes([...assignment_filetypes, assignment_filetype]);
    } else {
      setAssignmentFiletypes([
        ...assignment_filetypes,
        `.${assignment_filetype}`,
      ]);
    }
    setAssignmentFiletype("");
  }
  console.log("filetypes:", assignment_filetypes);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Assignment Title:", assignment_title);
    console.log("Assignment Start:", assignment_start);
    console.log("Assignment End:", assignment_end);
    console.log("Assignment Attempts:", assignment_attempts);
    console.log("Assignment Description:", assignment_description);
    console.log("Assignment Filetypes:", assignment_filetypes);
    console.log("Assignment Criteria:", assignment_criteria);
  }

  return (
    <>
      <h1 className='text-3xl font-light'>New Assignment</h1>
      <div className='flex flex-col w-11/12 md:w-1/3 mx-auto my-0 pt-4'>
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
          value={assignment_start}
          className='border border-gray-400 p-2 w-36 mb-4'
          type='date'
          name='assignment_start'
          id='assignment_start'
        />

        <label htmlFor='assignment_end'>End Date</label>
        <input
          onChange={(e) => setAssignmentEnd(e.target.value)}
          value={assignment_end}
          className='border border-gray-400 p-2 w-36 mb-4'
          type='date'
          name='assignment_end'
          id='assignment_end'
        />

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
          value={assignment_filetype}
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
          {assignment_filetypes.map((filetype, index) => (
            <span key={index} className=''>
              <span>{filetype}</span>
              <button
                className='border border-gray-400 w-16 mb-4 ml-2'
                type='button'
                onClick={() => {
                  setAssignmentFiletypes(
                    assignment_filetypes.filter((file) => file !== filetype)
                  );
                }}
              >
                Remove
              </button>
            </span>
          ))}
        </div>
        <AssignmentCriteriaForm onHandleCriteria={handleCriteriaChange} />
        <button
          type='submit'
          className='border border-gray-400 p-2 w-28 mt-4'
          onClick={handleSubmit}
        >
          Start Assignment
        </button>
      </div>
    </>
  );
}

export default NewAssignmentPage;
