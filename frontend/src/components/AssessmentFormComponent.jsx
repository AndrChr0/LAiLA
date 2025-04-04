import { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";

function AssessmentFormComponent({
  onHandleChange,
  obj,
  onFormValidity,
  onHandleMarkSection,
  markedSections,
  setMarkedSections,
}) {
  const [localValues, setLocalValues] = useState(obj);
  const [allSectionsMarked, setAllSectionsMarked] = useState(false);

  // initialize if markedSections is empty
  useEffect(() => {
    if (
      Object.keys(markedSections).length === 0 &&
      Object.keys(obj).length > 0
    ) {
      const initialMarkedState = {};
      Object.keys(obj).forEach((sectionKey) => {
        initialMarkedState[sectionKey] = false;
      });
      setMarkedSections(initialMarkedState);
    }
  }, [obj, markedSections, setMarkedSections]);

  // update localValues when obj changes from parent
  useEffect(() => {
    setLocalValues(obj);
  }, [obj]);

  // Check if all sections are marked and update parent component
  useEffect(() => {
    const allMarked = Object.values(markedSections).every((marked) => marked);
    setAllSectionsMarked(allMarked);
    if (onFormValidity) {
      onFormValidity(allMarked);
    }
  }, [markedSections, onFormValidity]);

  // debounce to prevent handleChange from being called too frequently
  const debouncedChange = useCallback(
    // https://lodash.com/docs/4.17.15#debounce
    debounce((sectionKey, feedbackKey, value) => {
      onHandleChange(sectionKey, feedbackKey, value);
    }, 300),
    [onHandleChange]
  );

  const handleChange = (sectionKey, feedbackKey, e) => {
    const { value } = e.target;
    setLocalValues((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [feedbackKey]: value,
      },
    }));
    debouncedChange(sectionKey, feedbackKey, value);
  };

  // check if any field in a secion is empty
  const isSectionComplete = (sectionValue) => {
    return Object.values(sectionValue).every((value) => value.trim() !== "");
  };

  return (
    <div className='max-w-4xl mx-auto'>
      {allSectionsMarked && (
        <div className='mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md'>
          All sections have been marked as assessed. You can now submit the
          assessment.
        </div>
      )}

      {Object.entries(localValues).map(([sectionKey, sectionValue]) => {
        const isSectionMarked = markedSections[sectionKey];
        const isComplete = isSectionComplete(sectionValue);

        return (
          <fieldset
            key={sectionKey}
            className={`p-6 my-6 rounded-lg border ${
              isSectionMarked ? "border-green-300" : "border-gray-200"
            } shadow-sm bg-white transition-colors duration-300`}
          >
            <legend
              className={`px-4 py-2 font-bold text-2xl ${
                isSectionMarked
                  ? "bg-green-50 border-green-300"
                  : "bg-white border-gray-300"
              } text-black rounded-md capitalize border-2 flex items-center justify-between`}
            >
              <span>{sectionKey.replace(/_/g, " ").replace(/AI/, "")}</span>
              {isSectionMarked && (
                <span className='text-sm font-normal text-green-600 ml-2'>
                  ✓ Assessed
                </span>
              )}
            </legend>

            <div className='grid gap-6 mt-4'>
              {Object.entries(sectionValue).map(
                ([feedbackKey, feedbackValue]) => (
                  <div key={feedbackKey} className='flex flex-col space-y-2'>
                    <label
                      className='font-medium text-gray-700 flex items-center text-lg'
                      htmlFor={`${sectionKey}-${feedbackKey}`}
                    >
                      {feedbackKey === "AI_final_comments"
                        ? "Final Comments"
                        : feedbackKey.charAt(0).toUpperCase() +
                          feedbackKey
                            .replace(/AI/, "")
                            .replace(/_/g, " ")
                            .replace(/ feedback$/, "")
                            .slice(1)}
                    </label>
                    <textarea
                      id={`${sectionKey}-${feedbackKey}`}
                      type='text'
                      value={feedbackValue}
                      onChange={(e) => handleChange(sectionKey, feedbackKey, e)}
                      className={`p-3 bg-white border ${
                        feedbackValue.trim() === ""
                          ? "border-amber-300"
                          : "border-gray-300"
                      } rounded-lg shadow-sm min-h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200`}
                      placeholder={`Enter feedback for ${feedbackKey.replace(
                        /_/g,
                        " "
                      )}`}
                    />
                  </div>
                )
              )}
            </div>

            <div className='mt-6 flex items-center justify-between'>
              <button
                type='button'
                onClick={() => onHandleMarkSection(sectionKey)}
                className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                  isSectionMarked
                    ? "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isSectionMarked ? "Unmark Section" : "Mark as Assessed"}
              </button>

              {!isComplete && !isSectionMarked && (
                <span className='text-amber-600 text-sm'>
                  All fields must be filled before marking
                </span>
              )}
            </div>
          </fieldset>
        );
      })}

      {!allSectionsMarked ? (
        <div className='mt-4 p-3 bg-amber-50 border border-amber-200 text-amber-700 rounded-md'>
          All sections must be marked as assessed before submission.
        </div>
      ) : (
        <div className='mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md'>
          All sections have been marked as assessed. You can now submit the
          assessment.
        </div>
      )}
    </div>
  );
}

export default AssessmentFormComponent;
