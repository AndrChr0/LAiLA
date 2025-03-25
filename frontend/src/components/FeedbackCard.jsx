import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

function FeedbackCard({ feedback, keyValue }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div key={keyValue} className="border rounded-lg p-4 mb-4 shadow-sm">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleExpand}
      >
        <h3 className='font-bold'>Attempt #{feedback.attempt_nr}</h3>
        {isExpanded ? <ChevronUp /> : <ChevronDown />}
      </div>

      {isExpanded && (
        <div className='mt-4 transition-all duration-300 ease-in-out'>
          <div className=''>
            <div className=' pb-2 border-gray-300 pr-4 '>
              <h4 className='font-medium text-lg'>Feedback:</h4>
              <p className='font-light'>{feedback.general_comment}</p>
            </div>
            <div className=''>
              <h4 className='font-medium text-lg'>Suggested Result:</h4>
              <p
                className={
                  feedback.suggested_result === "pass"
                    ? "text-green-500 font-bold"
                    : feedback.suggested_result === "fail"
                    ? "text-red-500 font-bold"
                    : ""
                }
              >
                {feedback.suggested_result}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeedbackCard;