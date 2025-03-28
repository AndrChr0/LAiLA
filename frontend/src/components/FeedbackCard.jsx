import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

function FeedbackCard({ feedback }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div  className="p-4 mb-4 border rounded-lg shadow-sm bg-white">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={toggleExpand}
      >
        <h3 className=''>Attempt #{feedback.attempt_nr}</h3>
        {isExpanded ? <ChevronUp /> : <ChevronDown />}
      </div>

      {isExpanded && (
        <div className='mt-4 transition-all duration-300 ease-in-out'>
          <div className=''>
            <div className='pb-2 pr-4 border-gray-300 '>
              <h4 className='text-lg font-medium'>Feedback:</h4>
              <p className='font-light'>{feedback.general_comment}</p>
            </div>
            <div className=''>
              <h4 className='text-lg font-medium'>Suggested Result:</h4>
              <p
                className={
                  feedback.suggested_result === "pass"
                    ? "text-green-500 font-bold"
                    : feedback.suggested_result === "fail"
                    ? "text-red-500 font-bold"
                    : ""
                }
              >
                {feedback.suggested_result.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeedbackCard;