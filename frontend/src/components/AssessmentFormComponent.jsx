import { useState } from "react";

function AssessmentFormComponent({ obj }) {
  const [assessment, setAssessment] = useState(obj);


  const handleChange = (sectionKey, feedbackKey, newValue) => {
    setAssessment((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [feedbackKey]: newValue,
      },
    }));
  };

  console.log(assessment);
return (
    <div>
        <h1>Assessment Form</h1>
        {Object.entries(assessment).map(([sectionKey, sectionValue]) => (
            <fieldset key={sectionKey} className="border border-gray-300 rounded-md p-2 my-2">
                <h2
                className="font-bold text-2xl"
                >{sectionKey.replace(/_/g, " ")}</h2>
                {Object.entries(sectionValue).map(([feedbackKey, feedbackValue]) => (
                    <div key={feedbackKey} 
                    className="flex flex-col" 
                    >
                        <label
                        className="font-bold"
                        htmlFor={`${sectionKey}-${feedbackKey}`}>
                        {feedbackKey.replace(/_/g, " ").replace(/ feedback$/, "")}                        </label>
                        <input
                            id={`${sectionKey}-${feedbackKey}`}
                            type="text"
                            value={feedbackValue}
                            onChange={(e) =>
                                handleChange(sectionKey, feedbackKey, e.target.value)
                            }
                            className="border border-gray-300 rounded-md p-1 bg-white"
                        />
                    </div>
                ))}
            </fieldset>
        ))}
    </div>
);
}

export default AssessmentFormComponent;
