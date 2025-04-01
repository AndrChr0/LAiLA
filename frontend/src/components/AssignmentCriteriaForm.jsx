import React, { useEffect, useState } from "react";
import { VscFeedback } from "react-icons/vsc";
import { GoTrophy } from "react-icons/go";
import { PiSignatureThin, PiRoadHorizonLight } from "react-icons/pi";
import { FiChevronDown, FiChevronUp, FiTrash2, FiPlus } from "react-icons/fi";

function AssignmentCriteriaForm({
  onHandleCriteria,
  onHandleMaxScoreChange,
  isEditing = false,
  criteria = {},
}) {
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
          maxScore: 3,
        },
      ],
    },
  ]);
  const [expandedSections, setExpandedSections] = useState({});
  const [expandedSubsections, setExpandedSubsections] = useState({});

  useEffect(() => {
    if (isEditing) {
      const loadedSections = [];
      // skip the final assessment section
      for (const sectionName in criteria.schema.properties) {
        if (sectionName === "AI_final_assessment") {
          continue;
        }
        // loop over the top-level sections
        const sectionProps = criteria.schema.properties[sectionName].properties;
        const section = {
          sectionId: crypto.randomUUID(),
          sectionName,
          subsections: [],
        };

        // group subsection fields by their base name
        const subsectionMap = new Map();

        for (const propName in sectionProps) {
          const property = sectionProps[propName];
          let baseName = propName.replace(/(_score|_feedback|_max_score)$/, "");

          if (!subsectionMap.has(baseName)) {
            subsectionMap.set(baseName, {
              subsectionId: crypto.randomUUID(),
              subsectionName: baseName,
              scoreDescription: "",
              feedbackDescription: "",
              maxScore: 3,
            });
          }

          const subObj = subsectionMap.get(baseName);

          if ((propName.endsWith("_score") && !propName.endsWith("_max_score"))) {
            subObj.scoreDescription = property.description || "";
          } else if (propName.endsWith("_feedback")) {
            subObj.feedbackDescription = property.description || "";
          } else if (propName.endsWith("_max_score")) {
            subObj.maxScore = property.default || 3;
          }

          subsectionMap.set(baseName, subObj);
        }

        section.subsections = Array.from(subsectionMap.values());
        loadedSections.push(section);
      }
      setSections(loadedSections);
    }
  }, [isEditing, criteria]);

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
    setSections((prev) =>
      prev.map((s) => (s.sectionId === sectionId ? { ...s, sectionName: newName } : s))
    );
  };

  // add a new subsection to a section
  const handleAddSubsection = (sectionId) => {
    setSections((prev) =>
      prev.map((s) => {
        if (s.sectionId === sectionId) {
          const newSub = {
            subsectionId: crypto.randomUUID(),
            subsectionName: `criteria_${s.subsections.length + 1}`,
            scoreDescription: "Criteria (0-3) ...",
            feedbackDescription: "Feedback on ...",
            maxScore: 3,
          };
          return { ...s, subsections: [...s.subsections, newSub] };
        }
        return s;
      })
    );
  };

  // remove a subsection
  const handleRemoveSubsection = (sectionId, subsectionId) => {
    setSections((prev) =>
      prev.map((s) => {
        if (s.sectionId === sectionId) {
          const updatedSubs = s.subsections.filter((sub) => sub.subsectionId !== subsectionId);
          return { ...s, subsections: updatedSubs };
        }
        return s;
      })
    );
  };

  // change subsection name/score/feedback
  const handleSubsectionChange = (sectionId, subsectionId, field, value) => {
    setSections((prev) =>
      prev.map((s) => {
        if (s.sectionId === sectionId) {
          const updatedSubs = s.subsections.map((sub) =>
            sub.subsectionId === subsectionId ? { ...sub, [field]: value } : sub
          );
          return { ...s, subsections: updatedSubs };
        }
        return s;
      })
    );
  };

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const toggleSubsection = (subsectionId) => {
    setExpandedSubsections((prev) => ({
      ...prev,
      [subsectionId]: !prev[subsectionId],
    }));
  };

  const generateJsonSchema = () => {
    const schemaObject = {
      name: "assignment_criteria",
      schema: {
        type: "object",
        properties: {},
      },
    };

    sections.forEach((section) => {
      const sectionKey = section.sectionName.replace(/\s+/g, "_").toLowerCase();
      const sectionProperties = {};
      const requiredFields = [];

      section.subsections.forEach((sub) => {
        const baseKey = sub.subsectionName.replace(/\s+/g, "_").toLowerCase();
        const scoreKey = `${baseKey}_score`;
        const feedbackKey = `${baseKey}_feedback`;

        sectionProperties[scoreKey] = {
          type: "integer",
          description: sub.scoreDescription || "No score description provided.",
        };

        sectionProperties[feedbackKey] = {
          type: "string",
          description: sub.feedbackDescription || "No feedback description provided.",
        };

        sectionProperties[`${baseKey}_max_score`] = {
          type: "integer",
          description: "Maximum score for this subsection.",
          default: sub.maxScore || 3,
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
            "Provide a detailed analysis of the submission with constructive feedback. Identify specific areas that need improvement, explain why they're problematic, and offer actionable suggestions for enhancement. While you may briefly acknowledge strengths if relevant, focus 80% of your response on constructive critique and specific recommendations for improvement.",
        },
      },
      required: ["AI_final_comments"],
    };

    return schemaObject;
  };

  // Auto-update whenever sections change
  useEffect(() => {
    const generated = generateJsonSchema();
    let totalMaxScore = 0;
    sections.forEach((section) => {
      section.subsections.forEach((sub) => {
        totalMaxScore += Number(sub.maxScore || 0);
      });
    });
    onHandleCriteria(generated);
    console.log("Generated JSON Schema:", generated);
    console.log("Total Max Score:", totalMaxScore);
    onHandleMaxScoreChange(totalMaxScore);
  }, [sections]);

  return (
    <div className="w-full p-6 mx-auto bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold">Assignment Criteria Builder</h2>
        <p className="max-w-4xl mb-4">
          Create guidelines for the Athea AI tutor to follow. A section references a larger piece of work, while subsections are smaller parts of the section.
        </p>

        <div className="p-4 mb-4 rounded-lg bg-blue-50">
          <h3 className="mb-2 font-semibold">Each subsection needs:</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="flex items-center justify-center w-6 h-6 mr-2 bg-blue-100 rounded-full">
                <PiSignatureThin />
              </span>
              A <span className="mx-1 font-bold">name</span>
            </li>
            <li className="flex items-center">
              <span className="flex items-center justify-center w-6 h-6 mr-2 bg-blue-100 rounded-full">
                <VscFeedback />
              </span>
              A <span className="mx-1 font-bold">feedback description</span> telling the AI what to provide feedback on
            </li>
            <li className="flex items-center">
              <span className="flex items-center justify-center w-6 h-6 mr-2 bg-blue-100 rounded-full">
                <GoTrophy />
              </span>
              A <span className="mx-1 font-bold">max score</span> representing the highest score that can be given
            </li>
            <li className="flex items-center">
              <span className="flex items-center justify-center w-6 h-6 mr-2 bg-blue-100 rounded-full">
                <PiRoadHorizonLight />
              </span>
              A <span className="mx-1 font-bold">score description</span> detailing requirements for different scores
            </li>
          </ul>
        </div>
      </div>

      <hr className="my-6" />

      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Sections</h3>
          <button
            className="flex items-center px-4 py-2 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600"
            onClick={handleAddSection}
          >
            <FiPlus className="mr-2" /> Add Section
          </button>
        </div>

        {sections.length === 0 ? (
          <div className="py-10 text-center border-2 border-gray-300 border-dashed rounded-lg bg-gray-50">
            <p className="mb-4 text-gray-500">No sections added yet</p>
            <button
              className="px-4 py-2 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600"
              onClick={handleAddSection}
            >
              <FiPlus className="inline mr-2" /> Add Your First Section
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {sections.map((section, sectionIndex) => (
              <div key={section.sectionId} className="overflow-hidden border border-gray-200 rounded-lg">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer bg-gray-50"
                  onClick={() => toggleSection(section.sectionId)}
                >
                  <div className="flex items-center flex-1">
                    <span className="flex items-center justify-center w-8 h-8 mr-3 text-white bg-blue-500 rounded-full">
                      {sectionIndex + 1}
                    </span>
                    <input
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      placeholder="Section name"
                      value={section.sectionName.replaceAll("_", " ")}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleSectionNameChange(section.sectionId, e.target.value);
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="flex items-center ml-4">
                    <button
                      className="p-2 text-red-500 hover:text-red-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveSection(section.sectionId);
                      }}
                    >
                      <FiTrash2 size={18} />
                    </button>
                    {expandedSections[section.sectionId] ? (
                      <FiChevronUp size={24} className="ml-2 text-gray-500" />
                    ) : (
                      <FiChevronDown size={24} className="ml-2 text-gray-500" />
                    )}
                  </div>
                </div>

                {expandedSections[section.sectionId] && (
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold">Criterias</h4>
                      <button
                        className="flex items-center bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md transition-colors"
                        onClick={() => handleAddSubsection(section.sectionId)}
                      >
                        <FiPlus className="mr-1" /> Add Criteria
                      </button>
                    </div>

                    {section.subsections.length === 0 ? (
                      <div className="py-8 text-center border-2 border-gray-300 border-dashed rounded-lg bg-gray-50">
                        <p className="mb-3 text-gray-500">No criteria added yet</p>
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md transition-colors"
                          onClick={() => handleAddSubsection(section.sectionId)}
                        >
                          <FiPlus className="inline mr-1" /> Add Criteria
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {section.subsections.map((sub, subIndex) => (
                          <div key={sub.subsectionId} className="overflow-hidden border border-gray-200 rounded-md">
                            <div
                              className="flex items-center justify-between p-3 cursor-pointer bg-gray-50"
                              onClick={() => toggleSubsection(sub.subsectionId)}
                            >
                              <div className="flex items-center">
                                <span className="flex items-center justify-center w-6 h-6 mr-2 text-sm text-white bg-green-500 rounded-full">
                                  {subIndex + 1}
                                </span>
                                <span className="font-medium">
                                  {sub.subsectionName.replaceAll('_', ' ') || "Unnamed subsection"}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded mr-2">
                                  Max: {sub.maxScore} pts
                                </span>
                                <button
                                  className="text-red-500 hover:text-red-700 p-1.5 mr-1"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveSubsection(section.sectionId, sub.subsectionId);
                                  }}
                                >
                                  <FiTrash2 size={16} />
                                </button>
                                {expandedSubsections[sub.subsectionId] ? (
                                  <FiChevronUp size={20} className="text-gray-500" />
                                ) : (
                                  <FiChevronDown size={20} className="text-gray-500" />
                                )}
                              </div>
                            </div>

                            {expandedSubsections[sub.subsectionId] && (
                              <div className="grid grid-cols-1 gap-3 p-3 border-t border-gray-200">
                                <div>
                                  <label className="block mb-1 font-medium">
                                    <PiSignatureThin className="inline-block mr-1" />
                                    Criteria Name:
                                  </label>
                                  <input
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type="text"
                                    placeholder="Enter name"
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

                                <div>
                                  <label className="block mb-1 font-medium">
                                    <VscFeedback className="inline-block mr-1" />
                                    Feedback Description:
                                  </label>
                                  <textarea
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="What should the AI provide feedback on?"
                                    rows="2"
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

                                <div>
                                  <label className="block mb-1 font-medium">
                                    <GoTrophy className="inline-block mr-1" />
                                    Max Score:
                                  </label>
                                  <input
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type="number"
                                    min="1"
                                    max="100"
                                    value={sub.maxScore}
                                    onChange={(e) =>
                                      handleSubsectionChange(
                                        section.sectionId,
                                        sub.subsectionId,
                                        "maxScore",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>

                                <div>
                                  <label className="block mb-1 font-medium">
                                    <PiRoadHorizonLight className="inline-block mr-1" />
                                    Score Description:
                                  </label>
                                  <textarea
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Detail the requirements for different score levels"
                                    rows="3"
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
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AssignmentCriteriaForm;
