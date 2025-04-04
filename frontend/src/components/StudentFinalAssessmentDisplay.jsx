function StudentFinalAssessmentDisplay({ obj }) {
  return (
    <div className='mx-auto my-6 space-y-4'>
      {Object.entries(obj).map(([sectionKey, sectionValue]) => (
        <fieldset
          key={sectionKey}
          className='border border-gray-200 rounded-md p-4 bg-white shadow-sm'
        >
          <h2 className='mb-2 text-2xl font-bold text-gray-800 capitalize'>
            {sectionKey.replace(/_/g, " ").replace(/AI/, "")}
          </h2>
          <div className='space-y-3'>
            {Object.entries(sectionValue).map(
              ([feedbackKey, feedbackValue]) => (
                <div key={feedbackKey} className='flex flex-col space-y-1'>
                  <h3 className='text-lg font-semibold text-gray-700'>
                    {feedbackKey === "AI_final_comments"
                      ? "Final Comments"
                      : feedbackKey.charAt(0).toUpperCase() +
                        feedbackKey
                          .replace(/AI/, "")
                          .replace(/_/g, " ")
                          .replace(/ feedback$/, "")
                          .slice(1)}
                  </h3>
                  <p className='text-gray-600'>{feedbackValue}</p>
                </div>
              )
            )}
          </div>
        </fieldset>
      ))}
    </div>
  );
}

export default StudentFinalAssessmentDisplay;
