import Anthropic from "@anthropic-ai/sdk";
import { aggregatedAssignmentFeedbackSchema } from "../utils/aggregatedFeedbackSchema.js";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function claudeReportGenerator(
  assignmentDescription,
  assignmentCriteria,
  newestStudentFeedback
) {
  const message = await client.messages.create({
    max_tokens: 5000,
    tools: [
      {
        name: "assignmentFeedback-report",
        description:
          "compile feedback to generate an assignement report for a lecturer",
        input_schema: aggregatedAssignmentFeedbackSchema.schema,
      },
    ],
    messages: [
      {
        role: "user",
        content: `
                    You are a strict but fair AI assistant that assists lecturers in aggregating feedback for student assignments.
                    You will receive multiple student feedback JSON objects.
                    Your task is to aggregate them into a single JSON object following the "AggregatedAssignmentFeedback" schema exactly:
                    1) Identify and list the at max 5 most commonly encountered problems (commonProblems).
                    2) Suggest at max 5 actions or improvements (recommendedActions) based on the most pressing issues.
                    3) Highlight strong areas where students performed well (strongAreas).
                    4) Provide any overall suggestions for the lecturer (overallLecturerSuggestions).
                    5) Place any additional notes into the "additionalNotes" field if needed.
                    
                    IMPORTANT:
                    - Your response MUST strictly follow the provided JSON schema in structure, keys, and data types.
                    - Do not include any extra keys, text explanations, or markdown formatting.
                    - Output *only* valid JSON that matches the schema.

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
    model: process.env.ANTHROPIC_REPORT_MODEL,
  });

  const parsedMessage = message.content[1].input;

  return parsedMessage;
}
