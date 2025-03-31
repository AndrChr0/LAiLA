import { useState, useCallback } from "react";
import { debounce } from "lodash";

function AssessmentFormComponent({ onHandleChange, obj }) {
  const [localValues, setLocalValues] = useState(obj);

  // debounce to prevent handleChange from being called too frequently
  const debouncedChange = useCallback(
    // https://lodash.com/docs/4.17.15#debounce
    debounce((sectionKey, feedbackKey, value) => {
      onHandleChange(sectionKey, feedbackKey, value);
    }, 300),
    []
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

  return (
    <div>
      {Object.entries(localValues).map(([sectionKey, sectionValue]) => (
        <fieldset key={sectionKey} className="p-2 my-2 rounded-md ">
          <h2 className="text-2xl font-bold capitalize">
            {sectionKey.replace(/_/g, " ").replace(/AI/, "")}
          </h2>
          {Object.entries(sectionValue).map(([feedbackKey, feedbackValue]) => (
            <div key={feedbackKey} className="flex flex-col">
              <label
                className="font-bold"
                htmlFor={`${sectionKey}-${feedbackKey}`}
              >
                {feedbackKey.charAt(0).toUpperCase() +
                  feedbackKey
                    .replace(/AI/, "")
                    .replace(/_/g, " ")
                    .replace(/ feedback$/, "")
                    .slice(1)}{" "}
              </label>
              <textarea
                id={`${sectionKey}-${feedbackKey}`}
                type="text"
                value={feedbackValue}
                onChange={(e) => handleChange(sectionKey, feedbackKey, e)}
                className="p-1 bg-white border border-gray-300 rounded-md field-sizing-content"
              />
            </div>
          ))}
        </fieldset>
      ))}
    </div>
  );
}

export default AssessmentFormComponent;
