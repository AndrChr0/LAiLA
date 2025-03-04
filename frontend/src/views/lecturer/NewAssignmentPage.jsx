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
  }

  return (
    <>
      <h1 className='text-3xl font-semibold'>New Assignment</h1>
      <form className='flex flex-col md:w-1/3 mx-auto my-0'>
        <label htmlFor='assignment_title'>Assignment Title</label>
        <input
          onChange={(e) => setAssignmentTitle(e.target.value)}
          value={assignment_title}
          className='border border-gray-400 p-2'
          type='text'
          name='assignment_title'
          id='assignment_title'
        />

        <label htmlFor='assignment_start'>Start Date</label>
        <input
          onChange={(e) => setAssignmentStart(e.target.value)}
          value={assignment_start}
          className='border border-gray-400 p-2'
          type='date'
          name='assignment_start'
          id='assignment_start'
        />

        <label htmlFor='assignment_end'>End Date</label>
        <input
          onChange={(e) => setAssignmentEnd(e.target.value)}
          value={assignment_end}
          className='border border-gray-400 p-2'
          type='date'
          name='assignment_end'
          id='assignment_end'
        />

        <label htmlFor='assignment_attempts'>Assignment Attempts</label>
        <input
          onChange={(e) => setAssignmentAttempts(e.target.value)}
          value={assignment_attempts}
          className='border border-gray-400 p-2 w-16'
          min={0}
          max={5}
          type='number'
          name='assignment_attempts'
          id='assignment_attempts'
        />

        <label htmlFor='assignment_description'>
          Upload assignment description
        </label>
        <textarea
          className='border border-gray-400 p-2'
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
          className='border border-gray-400 p-2'
          type='text'
          name='assignment_filetypes'
          id='assignment_filetypes'
        />
        <button
          onClick={handleFileChange}
          type='button'
          className='border border-gray-400 p-2 w-20'
        >
          Add
        </button>
        <div className='flex flex-row gap-4 pt-4'>
          {assignment_filetypes.map((filetype, index) => (
            <span key={index} className='border border-gray-400 p-2 '>
              <p>{filetype}</p>
              <button
                className='border border-gray-400 w-16'
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
        <button
          type='submit'
          className='border border-gray-400 p-2 w-28'
          onClick={handleSubmit}
        >
          Start Assignment
        </button>
      </form>
      <AssignmentCriteriaForm />
    </>
  );
}

export default NewAssignmentPage;
