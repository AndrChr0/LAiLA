import OpenAI from "openai";
import dotenv from "dotenv";
import { aggregatedAssignmentFeedbackSchema } from "../utils/aggregatedFeedbackSchema.js";
dotenv.config({ path: "../.env" }); // load shared env
dotenv.config(); // load server env
const openai = new OpenAI({ apiKey: process.env.GPT_API_KEY });

export async function aggregateAssignmentFeedback(
  assignmentDescription,
  assignmentCriteria,
  newestStudentFeedback
) {
  const completion = await openai.chat.completions.create({
    model: process.env.GPT_REPORT_MODEL,
    response_format: {
      type: "json_schema",
      json_schema: aggregatedAssignmentFeedbackSchema,
    },
    messages: [
      {
        role: "system",
        content: `
                    You are a strict but fair AI assistant that assists lecturers in aggregating feedback for student assignments.
                    You will receive multiple student feedback JSON objects.
                    Your task is to aggregate them into a single JSON object following the "AggregatedAssignmentFeedback" schema exactly:
                    1) Identify and list the most commonly encountered problems (commonProblems).
                    2) Suggest actions or improvements (recommendedActions) where necessary.
                    3) Highlight strong areas where students performed well (strongAreas).
                    4) Provide any overall suggestions for the lecturer (overallLecturerSuggestions).
                    5) Place any additional notes into the "additionalNotes" field if needed.
                    
                    IMPORTANT:
                    - Your response MUST strictly follow the provided JSON schema in structure, keys, and data types.
                    - Do not include any extra keys, text explanations, or markdown formatting.
                    - Output *only* valid JSON that matches the schema.
                `,
      },
      {
        role: "user",
        content: `
                    Here is the asignment description: ${assignmentDescription}
                    Here is the assignment criteria: ${assignmentCriteria}
                    Here are the JSON feedback objects from multiple students: ${newestStudentFeedback}

                    Please produce the final aggregated feedback JSON following the schema. 
                    Make sure to include:
                    - Common problems
                    - Recommended actions
                    - Strong areas
                    - Any additional notes if needed

                    No extra explanations or text outside the JSON, please. Just the final JSON object.
                `,
      },
    ],
  });

  return JSON.parse(completion.choices[0].message.content);
}
