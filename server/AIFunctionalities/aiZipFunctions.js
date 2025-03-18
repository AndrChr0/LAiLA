import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI({ apiKey: process.env.AI_API_KEY });

export default async function evaluateSubmission(
  submission,
  criteria,
  description
) {
  // evaluateSubmission(zipContents, criteriaString, description);
  const submissionString = submission.join("");

  const jsonCriteria = JSON.parse(criteria);

  const completion = await openai.chat.completions.create({
    model: process.env.AI_MODEL,
    // migth need to change this to a different effort lvl
    reasoning_effort: "medium",
    response_format: { type: "json_schema", json_schema: jsonCriteria },
    messages: [
      {
        role: "system",
        content: `You are a strict but fair code evaluator with high standards. 
          Provide detailed, honest feedback that identifies even minor issues. 
          Be precise about deductions - a single error should impact scores accordingly. 
          Maintain a professional tone while being direct about shortcomings.
          When aproppriate, refrence the code directly when providing feedback. 
          Never inflate scores out of kindness; accuracy is your priority. 
          Allways address the student directly and use second person pronouns.`,
      },
      {
        role: "user",
        content: `Evaluate the following student submission according to the provided assessment criteria.
        Allways address the student directly and use second person pronouns.  
            Fill out the JSON object and return a response strictly in the given format. 
 
            Assessment Criteria: ${criteria} 
 
            Assignment Description: ${description} 
 
            Student Submission: ${submissionString}`,
      },
    ],
  });

  return JSON.parse(completion.choices[0].message.content);
}
