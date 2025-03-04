import React, { useState } from "react";

function AssignmentCriteriaForm() {
  const [schemaName, setSchemaName] = useState("new_schema");
  const [sections, setSections] = useState([
    {
      sectionId: crypto.randomUUID(),
      sectionName: "navigation",
      subsections: [
        {
          subsectionId: crypto.randomUUID(),
          subsectionName: "navigation_menu",
          scoreDescription:
            "Criteria (0-3) 0 -> no menu, 1 -> partial, 2 -> good, 3 -> perfect",
          feedbackDescription: "Feedback on navigation menu",
        },
      ],
    },
  ]);

  // add new section
  const handleAddSection = () => {
    setSections((prev) => [
      ...prev,
      {
        sectionId: crypto.randomUUID(),
        sectionName: `section_${prev.length + 1}`,
        subsections: [],
      },
    ]);
  };

  // remove a section
  const handleRemoveSection = (sectionId) => {
    setSections((prev) => prev.filter((s) => s.sectionId !== sectionId));
  };

  // change section name
  const handleSectionNameChange = (sectionId, newName) => {
    setSections((prev) => {
      return prev.map((s) => {
        if (s.sectionId === sectionId) {
          return { ...s, sectionName: newName };
        }
        return s;
      });
    });
  };

  // new subsection to a section
  const handleAddSubsection = (sectionId) => {
    setSections((prev) => {
      return prev.map((s) => {
        if (s.sectionId === sectionId) {
          const newSub = {
            subsectionId: crypto.randomUUID(),
            subsectionName: `subsection_${s.subsections.length + 1}`,
            scoreDescription: "Criteria (0-3) ...",
            feedbackDescription: "Feedback on ...",
          };
          return { ...s, subsections: [...s.subsections, newSub] };
        }
        return s;
      });
    });
  };

  // remove a subsection
  const handleRemoveSubsection = (sectionId, subsectionId) => {
    setSections((prev) => {
      return prev.map((s) => {
        if (s.sectionId === sectionId) {
          const updatedSubs = s.subsections.filter(
            (sub) => sub.subsectionId !== subsectionId
          );
          return { ...s, subsections: updatedSubs };
        }
        return s;
      });
    });
  };

  // change subsection name/score/feedback
  const handleSubsectionChange = (sectionId, subsectionId, field, value) => {
    // field: "subsectionName", "scoreDescription" or "feedbackDescription"
    setSections((prev) => {
      return prev.map((s) => {
        if (s.sectionId === sectionId) {
          const updatedSubs = s.subsections.map((sub) => {
            if (sub.subsectionId === subsectionId) {
              return { ...sub, [field]: value };
            }
            return sub;
          });
          return { ...s, subsections: updatedSubs };
        }
        return s;
      });
    });
  };

  const generateJsonSchema = () => {
    const schemaObject = {
      name: schemaName,
      schema: {
        type: "object",
        properties: {},
      },
    };

    // For each section, build the properties
    sections.forEach((section) => {
      const sectionKey = section.sectionName;
      const sectionProperties = {};
      const requiredFields = [];

      // for each subsection, create two fields: *_score and *_feedback
      section.subsections.forEach((sub) => {
        const scoreKey = `${sub.subsectionName.replace(/\s+/g, "_")}_score`;
        const feedbackKey = `${sub.subsectionName.replace(
          /\s+/g,
          "_"
        )}_feedback`;

        sectionProperties[scoreKey] = {
          type: "integer",
          description: sub.scoreDescription || "No score description provided.",
        };

        sectionProperties[feedbackKey] = {
          type: "string",
          description:
            sub.feedbackDescription || "No feedback description provided.",
        };

        requiredFields.push(scoreKey, feedbackKey);
      });

      schemaObject.schema.properties[sectionKey] = {
        type: "object",
        properties: sectionProperties,
        required: requiredFields,
      };
    });

    schemaObject.schema.properties.AI_final_assessment = {
      type: "object",
      properties: {
        AI_final_comments: {
          type: "string",
          description:
            "General comments about the submission as a whole. What was good, what was bad, what could be improved.",
        },
      },
      required: ["AI_final_comments"],
    };

    return schemaObject;
  };

  const handleGenerateClick = () => {
    const generated = generateJsonSchema();
    console.log("Generated JSON Schema:", generated);
  };

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md'>
      <h2 className='text-2xl font-bold mb-4'>Assignment Criteria Form</h2>

      <div className='mb-4'>
        <label className='block font-semibold mb-1'>Schema Name:</label>
        <input
          className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          type='text'
          value={schemaName}
          onChange={(e) => setSchemaName(e.target.value)}
        />
      </div>

      <hr className='my-4' />

      <h3 className='text-xl font-bold mb-2'>Sections</h3>
      {sections.map((section) => (
        <div
          key={section.sectionId}
          className='mb-6 p-4 border border-gray-200 rounded-md'
        >
          <div className='flex items-center justify-between mb-2'>
            <div className='flex-1'>
              <label className='block font-medium mb-1'>Section Name:</label>
              <input
                className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                type='text'
                value={section.sectionName}
                onChange={(e) =>
                  handleSectionNameChange(section.sectionId, e.target.value)
                }
              />
            </div>
            <button
              className='ml-4 bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
              onClick={() => handleRemoveSection(section.sectionId)}
            >
              Remove Section
            </button>
          </div>

          <div className='mt-4'>
            <h4 className='text-lg font-semibold mb-2'>Subsections</h4>
            {section.subsections.map((sub) => (
              <div
                key={sub.subsectionId}
                className='mb-4 p-4 border border-gray-200 rounded-md'
              >
                <div className='mb-3'>
                  <label className='block font-medium mb-1'>
                    Subsection Name:
                  </label>
                  <input
                    className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    type='text'
                    value={sub.subsectionName}
                    onChange={(e) =>
                      handleSubsectionChange(
                        section.sectionId,
                        sub.subsectionId,
                        "subsectionName",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className='mb-3'>
                  <label className='block font-medium mb-1'>
                    Score Description:
                  </label>
                  <input
                    className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    type='text'
                    value={sub.scoreDescription}
                    onChange={(e) =>
                      handleSubsectionChange(
                        section.sectionId,
                        sub.subsectionId,
                        "scoreDescription",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className='mb-3'>
                  <label className='block font-medium mb-1'>
                    Feedback Description:
                  </label>
                  <input
                    className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    type='text'
                    value={sub.feedbackDescription}
                    onChange={(e) =>
                      handleSubsectionChange(
                        section.sectionId,
                        sub.subsectionId,
                        "feedbackDescription",
                        e.target.value
                      )
                    }
                  />
                </div>

                <button
                  className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
                  onClick={() =>
                    handleRemoveSubsection(section.sectionId, sub.subsectionId)
                  }
                >
                  Remove Subsection
                </button>
              </div>
            ))}

            <button
              className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600'
              onClick={() => handleAddSubsection(section.sectionId)}
            >
              + Add Subsection
            </button>
          </div>
        </div>
      ))}

      <button
        className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-4'
        onClick={handleAddSection}
      >
        + Add Section
      </button>

      <hr className='my-4' />

      <button
        className='bg-purple-500 text-white px-6 py-3 rounded-md hover:bg-purple-600'
        onClick={handleGenerateClick}
      >
        Generate JSON Schema
      </button>
    </div>
  );
}

export default AssignmentCriteriaForm;
