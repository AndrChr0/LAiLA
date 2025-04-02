import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function claudeAssessmentEvaluation(
  submission,
  criteria,
  description
) {
  const parsedCriteria = JSON.parse(criteria);
  const submissionString = submission.join("");

  const message = await client.messages.create({
    max_tokens: 5000,
    tools: [
      {
        name: "evaluate_student_submission",
        description: "Evaluate a student submission",
        input_schema: parsedCriteria.schema,
      },
    ],
    messages: [
      {
        role: "user",
        content: `You are a strict but fair code evaluator with high standards. 
                        Provide detailed, honest feedback that identifies even minor issues. 
                        Be precise about deductions - a single error should impact scores accordingly. 
                        Maintain a professional tone while being direct about shortcomings.
                        When aproppriate, refrence the code directly when providing feedback. 
                        Never inflate scores out of kindness; accuracy is your priority. 
                        Allways address the student directly and use second person pronouns.
                        Evaluate the following student submission according to the provided assessment criteria.
        
                        Assignment Description: ${description} 
        
                        Student Submission: ${submissionString}
                   
                        You must return valid JSON with *exactly* the structure specified by the schema.
Include every required property, such as "AI_final_assessment" with a key "AI_final_comments".
Do not omit any required sections or fields.
Do not provide any text outside of the JSON.
                   
                        Allways address the student directly and use second person pronouns.  
                        Fill out the JSON object and return a response strictly in the given format.
                        
                        `,
      },
    ],
    model: "claude-3-7-sonnet-latest",
  });

  const parsedMessage = message.content[1].input;

  return parsedMessage;
}

// main();
