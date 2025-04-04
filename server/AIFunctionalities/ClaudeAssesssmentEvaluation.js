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
        content: `You are an expert code evaluator who is strict, fair, and focused on student learning.
Provide clear, detailed, and professional feedback for each criterion in the assessment.
Identify even minor issues and explain their impact on the overall solution. Be precise about deductions—each error should be reflected accurately in the score.
Use second person ("you") to address the student directly. When helpful, reference the code explicitly to pinpoint problems.
Do not inflate scores out of kindness; accuracy and consistency are your top priorities.

Respond strictly in valid JSON format according to the provided schema.
Include all required fields, including "AI_final_assessment" with the key "AI_final_comments".
Do not output anything outside the JSON.
Limit each individual feedback comment to a maximum of 100 words, focusing on clarity and constructive critique.

Assignment Description:
${description}

Student Submission:
${submissionString}

Generate the completed JSON object below, ensuring every required property is present and correctly formatted. 
                        
                        `,
      },
    ],
    model: "claude-3-7-sonnet-latest",
  });

  const parsedMessage = message.content[1].input;

  return parsedMessage;
}

// main();
