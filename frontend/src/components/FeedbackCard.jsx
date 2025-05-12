import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CircleAlert } from 'lucide-react';

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
            <div className='border-t-1 pt-2'>
              {/* <h4 className='text-lg font-medium'>Suggested Result:</h4> */}
            
              {feedback.suggested_result === "pass" ? (
                <span className='inline-block px-3 py-1 text-sm font-medium  bg-gray-100 rounded-full'>
                  Based on the assignment requirements, your submission might pass during manual review.
                </span>
              ) : (
                <span className='inline-block px-3 py-1 text-sm font-medium bg-gray-100  rounded-full'>
                  Based on the assignment requirements, your delivery might not be sufficient for a passing grade.
                </span>
              )}
              <p className=' text-sm text-gray-500 italic font-semibold mt-2 flex items-center gap-1 '>
          <CircleAlert />  This feedback is AI generated and not the final assessment.
          </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeedbackCard;