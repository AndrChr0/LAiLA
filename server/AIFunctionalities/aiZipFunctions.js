import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI({ apiKey: process.env.AI_API_KEY });

const assignmentDetails = `Oblig#1
  Write your personal page
  Due date: check Blackboard
  IDG1292-FALL2022
  Table of Contents
  Preface ....................................................................................................... 3
  Context ...................................................................................................... 4
  Task description ........................................................................................ 5
  Required .................................................................................................... 7
  Tips ........................................................................................................... 9
  Other resources.........................................................................................10
  Deliverables ..............................................................................................11
  
  Preface
  This document describes the first compulsory task (oblig#1) of the course. The
  focus of the task is to create a coherent HTML structure and reflect on the choices
  taken during the design and implementation phases. CSS is allowed and you are
  encouraged to use anything learnt between lectures 1 to 5.
  
  These are all rather simple tasks. So, we expect you to deliver with high quality.
  The best thing you can do for quality assurance is to:
  a) validate all your HTML and CSS code;
  b) find a buddy so you can look through each other's code and give feedback.
  
  Please, do not forget this is an individual task and copying or letting others
  copy your code can be considered plagiarism. If you use fragments of code from
  the internet (Stack Overflow, W3C, etc.), make sure they are properly referenced in the code
  as a comment with the link to the resource you have used.
  
  Finally, also notice it is expected that you write your code from scratch. Therefore,
  downloading HTML templates or using CSS frameworks such as Tailwind CSS or
  Bootstrap is not allowed.
  
  Context
  You have just finished your first academic year at the university, and you are excited
  about the idea of getting a summer job to get some hands-on experience working as a
  web designer. Unfortunately, your work experience is scant, and you need to figure
  out a way of promoting yourself. Then, it comes to your mind the idea of building a
  website that talks about you.
  
  Notice that a personal website is not a resume. Resumes are boring. Personal Web
  sites give us the opportunity of differentiating ourselves from the rest. Some
  advantages of having a personal website are the following:
  • You can emphasise your strengths by driving the user's attention to remarkable
  things about you.
  • It makes you more findable.
  • It gives you the opportunity of building a personal brand.
  • It gives you a differentiating factor from the rest of the people.
  
  This compulsory activity is delivered individually. Feel free to create your real
  portfolio or create a fictional persona if you do not want to make the website about you.
  Avoid lorem ipsum text by all possible means. Semantic tags carry meaning, and
  the context of their content is important to understand whether they are used correctly
  or not.
  
  Task description
  Design and implement your personal portfolio page.
  Your personal website must contain 5 different pages:
  
  - **Home page**: Must include:
    - Image and description about you (use proper semantic tags)
    - Text introducing yourself
    - List of hobbies
    - A quotation from a book, song, or movie
  
  - **Resume/CV page**: Must include:
    - Academic background
    - Work experience
    - List of languages you speak
    - List of skills
  
  - **Portfolio page**: Showcase at least 3 different projects with:
    - Title
    - Short description (5-6 lines)
    - Image
  
  - **About page**: Explain your use of semantic tags, including a sketch of the layout.
  
  - **Contact page**: Must include at least 3 social networks and working links.
  
  Required
  Your assignment will be graded based on:
  • Use of structural and semantic tags.
  • Proper use of HTML elements.
  • Lists and nested lists.
  • Proper file naming and project hierarchy.
  • Readable and formatted code with comments.
  • Separation of CSS (no inline styles).
  • Use of colors, margins, and padding for readability.
  • Coherent styles across all pages.
  • English language usage.
  • No lorem ipsum text.
  • All pages must be linked with a <nav> top menu.
  • No templates, Bootstrap, or CSS frameworks allowed.
  
  Deliverables
  - **A zip file** named \`studentcode-o1-idg12922022.zip\`, containing the full project.
  - **A live version** of your site uploaded via FTP.
  
  Good luck!`;

// const jsonSchema = {
//   name: "idg1292_oblig1",
//   schema: {
//     type: "object",
//     properties: {
//       navigation: {
//         type: "object",
//         properties: {
//           navigation_menu_score: {
//             type: "integer",
//             description:
//               "The page has a navigation menu and it is easy to navigate (all pages) 0 -> no navigation menu or not all pages linked, 1 -> navigation menu but not all pages, 2 -> Yes but some improvements (UX, target!=blank, etc.), 3 -> Perfect",
//           },
//           navigation_menu_feedback: {
//             type: "string",
//             description:
//               "Feedback on the navigation menu and ease of navigation",
//           },
//           proper_html_tags_score: {
//             type: "integer",
//             description:
//               "Criteria (0-3) 0 -> bad, validation errors, etc. 1 -> somewhat ok but with many improvements 2 -> good in general but some extra semantic tags could be used (maybe other semantic tags would be better) 3 -> perfect.",
//           },
//           proper_html_tags_feedback: {
//             type: "string",
//             description: "Feedback on HTML tag usage",
//           },
//         },
//         required: [
//           "navigation_menu_score",
//           "navigation_menu_feedback",
//           "proper_html_tags_score",
//           "proper_html_tags_feedback",
//         ],
//       },
//       home_page: {
//         type: "object",
//         properties: {
//           content_requirements_score: {
//             type: "integer",
//             description:
//               "Criteria (0-3) 0 -> most of the requirements not met, 1 -> few requirements met, 2 -> most of the requirements met, 3 -> all requirements met.",
//           },
//           content_requirements_feedback: {
//             type: "string",
//             description:
//               "Fullfils the following requirements: Image and description about you, Text introducing yourself, List of hobbies, A quotation from a book, song, or movie.",
//           },
//           proper_html_tags_score: {
//             type: "integer",
//             description:
//               "Criteria (0-3) 0 -> bad, validation errors, etc. 1 -> somewhat ok but with many improvements 2 -> good in general but some extra semantic tags could be used (maybe other semantic tags would be better) 3 -> perfect.",
//           },
//           proper_html_tags_feedback: {
//             type: "string",
//             description: "Feedback on semantic HTML usage",
//           },
//         },
//         required: [
//           "content_requirements_score",
//           "content_requirements_feedback",
//           "proper_html_tags_score",
//           "proper_html_tags_feedback",
//         ],
//       },
//       resume_page: {
//         type: "object",
//         properties: {
//           content_requirements_score: {
//             type: "integer",
//             description:
//               "Criteria (0-3) 0 -> most of the requirements not met, 1 -> few requirements met, 2 -> most of the requirements met, 3 -> all requirements met.",
//           },
//           content_requirements_feedback: {
//             type: "string",
//             description:
//               "Feedback on to what degree the following requirements is fulfilled: Academic background, Work experience, List of languages you speak, List of skills.",
//           },
//           proper_html_tags_score: {
//             type: "integer",
//             description:
//               "Criteria (0-3) 0 -> bad, validation errors, etc. 1 -> very improvable 2 -> ok with very few improvements (maybe other semantic tags would be better) 3 -> perfect.",
//           },
//           proper_html_tags_feedback: {
//             type: "string",
//             description: "Feedback on semantic HTML usage",
//           },
//         },
//         required: [
//           "content_requirements_score",
//           "content_requirements_feedback",
//           "proper_html_tags_score",
//           "proper_html_tags_feedback",
//         ],
//       },
//       portfolio: {
//         type: "object",
//         properties: {
//           projects_score: {
//             type: "integer",
//             description:
//               "Criteria (0-3) 0 -> most of the requirements not met, 1 -> few requirements met, 2 -> most of the requirements met, 3 -> all requirements met.",
//           },
//           projects_feedback: {
//             type: "string",
//             description:
//               "Feedback on project descriptions. There should be three projects with title, short description, and image.",
//           },
//           proper_html_tags_score: {
//             type: "integer",
//             description: "Score for proper HTML usage",
//           },
//           proper_html_tags_feedback: {
//             type: "string",
//             description:
//               "Criteria (0-3) 0 -> bad, validation errors, etc. 1 -> very improvable 2 -> ok with very few improvements (maybe other semantic tags would be better) 3 -> perfect.",
//           },
//         },
//         required: [
//           "projects_score",
//           "projects_feedback",
//           "proper_html_tags_score",
//           "proper_html_tags_feedback",
//         ],
//       },
//       contact_page: {
//         type: "object",
//         properties: {
//           content_requirements_score: {
//             type: "integer",
//             description:
//               "Criteria (0-3) 0 -> most of the requirements not met, 1 -> few requirements met, 2 -> most of the requirements met, 3 -> all requirements met.",
//           },
//           content_requirements_feedback: {
//             type: "string",
//             description:
//               "Show all your contact information as well as links to your social websites (e.g.: Facebook, Twitter, LinkedIn, Instagram, etc.). You must include at least 3 different social networks. The links must work properly. However, you don’t need to link them to your real social networks if you don’t want to do so. A link to the main page of the social platform would suffice. Do not forget to include an email address and phone number.",
//           },
//           proper_html_tags_score: {
//             type: "integer",
//             description: "Score for correct HTML elements",
//           },
//           proper_html_tags_feedback: {
//             type: "string",
//             description:
//               "Criteria (0-3) 0 -> bad, validation errors, etc. 1 -> very improvable 2 -> ok with very few improvements (maybe other semantic tags would be better) 3 -> perfect.",
//           },
//         },
//         required: [
//           "content_requirements_score",
//           "content_requirements_feedback",
//           "proper_html_tags_score",
//           "proper_html_tags_feedback",
//         ],
//       },
//       about: {
//         type: "object",
//         properties: {
//           reflection_score: {
//             type: "integer",
//             description:
//               "Criteria (0-3) 0 -> most of the requirements not met, 1 -> few requirements met, 2 -> most of the requirements met, 3 -> all requirements met (sketch is expected).",
//           },
//           reflection_feedback: {
//             type: "string",
//             description:
//               "Feedback on reflection level of process and preperation",
//           },
//         },
//         required: ["reflection_score", "reflection_feedback"],
//       },
//       general_comments: {
//         type: "object",
//         properties: {
//           use_of_semantic_structural_tags_score: {
//             type: "integer",
//             description:
//               "Criteria (0-1) 0 -> no semantic tags or not fullfilling requirements, 1 -> otherwise",
//           },
//           use_of_semantic_structural_tags_feedback: {
//             type: "string",
//             description: "Feedback on the use of semantic and structural tags",
//           },
//           project_structure_score: {
//             type: "integer",
//             description:
//               "Criteria (0-1) (read about page with reflection) 0 if wrong structure (overstructured and not well reasoned). 1 otherwise.",
//           },
//           project_structure_feedback: {
//             type: "string",
//             description: "Feedback on project structure",
//           },
//           bringing_css_and_html_together_score: {
//             type: "integer",
//             description:
//               "Criteria (0-1) 0 -> no external 1 -> use external CSS(no inline or embedded). Embed only under proper circumstances.",
//           },
//           bringing_css_and_html_together_feedback: {
//             type: "string",
//             description: "Feedback on bringing CSS and HTML together",
//           },
//           css_optimization_score: {
//             type: "integer",
//             description:
//               "Criteria (0-1) 0 -> hard to maintain CSS, 1 -> good css, grouping things together, reusing CSS rules, good naming conventions, etc.",
//           },
//           css_optimization_feedback: {
//             type: "string",
//             description: "Feedback on CSS optimization",
//           },
//           code_readability_score: {
//             type: "integer",
//             description:
//               "Criteria (0-1) 1 -> Very well structured code, easy to read 0-> otherwise",
//           },

//           code_readability_feedback: {
//             type: "string",
//             description: "Feedback on code readability",
//           },
//           user_readability_score: {
//             type: "integer",
//             description:
//               "Criteria (0-1) 0 -> bad (spacing, margins, alignment, overlapping) 1 -> good or very good",
//           },
//           user_readability_feedback: {
//             type: "string",
//             description: "Feedback on user readability",
//           },
//           seo_score: {
//             type: "integer",
//             description:
//               "Criteria (0-1) All pages have a proper title (different per page and meaningful). Each page has a different short description, also meaningful. Files and images have coherent names describing the contents. 0 -> not met 1 -> almost everything above met.",
//           },
//           seo_feedback: {
//             type: "string",
//             description: "Feedback on SEO",
//           },
//           naming_conventions_score: {
//             type: "integer",
//             description:
//               "Criteria (0-1) The files are properly named. No capital letters, no spaces, use '-' to split words (but we accept '_'), names describe the content of the file (especially images), etc. 0 -> not met 1 -> most of the criteria above met.",
//           },
//           naming_conventions_feedback: {
//             type: "string",
//             description: "Feedback on naming conventions",
//           },
//           design_score: {
//             type: "integer",
//             description:
//               "Criteria (0-1) -> 0 or 1. Use objective facts. Elements well aligned, good spacing, coherent and consistent design (same headings among pages and colors, elements not overflowing parent container).",
//           },
//           design_feedback: {
//             type: "string",
//             description: "Feedback on design",
//           },
//         },

//         required: [
//           "use_of_semantic_structural_tags_score",
//           "use_of_semantic_structural_tags_feedback",
//           "project_structure_score",
//           "project_structure_feedback",
//           "bringing_css_and_html_together_score",
//           "bringing_css_and_html_together_feedback",
//           "css_optimization_score",
//           "css_optimization_feedback",
//           "code_readability_score",
//           "code_readability_feedback",
//           "user_readability_score",
//           "user_readability_feedback",
//           "seo_score",
//           "seo_feedback",
//           "naming_conventions_score",
//           "naming_conventions_feedback",
//           "design_score",
//           "design_feedback",
//         ],
//       },
//       final_assessments: {
//         type: "object",
//         properties: {
//           validation_errors_check: {
//             type: "string",
//             description:
//               "Determine if there are any validation errors in the HTML or CSS code.",
//           },
//           positioning_errors_check: {
//             type: "string",
//             description:
//               "check if any elements are overflowing their parent container, if the elements are well aligned, if there is good spacing between elements, etc.",
//           },
//           final_comments: {
//             type: "string",
//             description:
//               "General comments about the project as a whole. What was good, what was bad, what could be improved, etc.",
//           },
//         },
//         required: [
//           "validation_errors_check",
//           "positioning_errors_check",
//           "final_comments",
//         ],
//       },
//     },
//   },
// };

export default async function evaluateSubmission(
  submission,
  criteria,
  description
) {
  // evaluateSubmission(zipContents, criteriaString, description);
  const submissionString = submission.join("");

  const jsonCriteria = JSON.parse(criteria);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_schema", json_schema: jsonCriteria },
    messages: [
      {
        role: "system",
        content:
          "You are a strict but fair code evaluator with high standards. Provide detailed, honest feedback that identifies even minor issues. Be precise about deductions - a single error should impact scores accordingly. Maintain a professional tone while being direct about shortcomings. Never inflate scores out of kindness; accuracy is your priority.",
      },
      {
        role: "user",
        content: `Evaluate the following student submission according to the provided assessment criteria.  
            Fill out the JSON object and return a response strictly in the given format. 
 
            Assessment Criteria: ${criteria} 
 
            Assignment Description: ${description} 
 
            Student Submission: ${submissionString}`,
      },
    ],
  });

  return JSON.parse(completion.choices[0].message.content);
}
