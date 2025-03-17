import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.AI_API_KEY });

const aggregatedAssignmentFeedbackSchema = {
  name: "AggregatedAssignmentFeedback",
  strict: true,
  schema: {
    type: "object",
    description:
      "Schema for aggregated AI feedback across multiple student submissions.",
    additionalProperties: false,
    properties: {
      // common problems
      commonProblems: {
        type: "array",
        description:
          "List of the most commonly encountered problems or low-scoring areas among students.",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            problemName: {
              type: "string",
              description:
                "Name or identifier for the problem/requirement area.",
            },
            description: {
              type: "string",
              description: "Brief explanation of the nature of this problem.",
            },
            occurrences: {
              type: "integer",
              description:
                "Number of students affected by this particular issue.",
            },

            recommendedActions: {
              type: "array",
              description:
                "Actions or suggestions to fix or improve this problem.",
              items: { type: "string" },
            },
          },
          required: [
            "problemName",
            "description",
            "occurrences",
            "recommendedActions",
          ],
        },
      },
      //   strong areas
      strongAreas: {
        type: "array",
        description:
          "List of areas or requirements most students performed well in.",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            areaName: {
              type: "string",
              description:
                "Name of the requirement or topic students excelled in.",
            },
            description: {
              type: "string",
              description: "Brief explanation of this strong area.",
            },
          },
          required: ["areaName", "description"],
        },
      },
      overallLecturerSuggestions: {
        type: "array",
        description:
          "General suggestions or feedback for the lecturer based on the student submissions.",
        items: { type: "string" },
      },
      additionalNotes: {
        type: "string",
        description:
          "Any additional observations or free-form notes that do not fit neatly into the above categories.",
      },
    },
    required: [
      "commonProblems",
      "strongAreas",
      "overallLecturerSuggestions",
      "additionalNotes",
    ],
  },
};

const studentFeedback = [
  {
    reflections: {
      own_mockup_score: 3,
      own_mockup_feedback:
        "You provided a detailed and reflective analysis of your own mock-up. You clearly explained the design challenges, your modifications, and even gave a rating to your mock-up. The reflection is thorough and shows you thought through the design decisions, although a bit more detail on how these choices impacted implementation could improve clarity further.",
      own_mockup_max_score: 1,
      sustainability_score: 3,
      main_difficulties_score: 3,
      sustainability_feedback:
        "Your sustainability reflection is strong. You described the specific measures taken, such as adjusting image formats and sizes, and quantified the savings. This shows a clear understanding of sustainable web design practices. More detailed comparisons or additional measures could further enrich this reflection.",
      sustainability_max_score: 3,
      main_difficulties_feedback:
        "You clearly articulated the main challenges encountered with the mock-up, including issues with layout adaptation between mobile and desktop and the complications in using certain CSS properties. Your explanation provided insight into how these difficulties influenced your decisions and modifications.",
      main_difficulties_max_score: 3,
    },
    requirements: {
      z_index_score: 1,
      nth_child_score: 1,
      typefaces_score: 1,
      z_index_feedback:
        "You correctly used the z-index property (e.g., on the h1 element in about-style.css) to manage element stacking.",
      z_index_max_score: 1,
      nth_child_feedback:
        "You utilized the nth-child pseudo-class (e.g., for the list items in .text-seven) successfully.",
      typefaces_feedback:
        "You integrated two different typefaces as required, loading them via @font-face and applying them appropriately in your CSS.",
      nth_child_max_score: 1,
      typefaces_max_score: 1,
      linear_gradient_score: 1,
      linear_gradient_feedback:
        "A linear gradient is correctly applied as a background in your CSS, fulfilling the requirement.",
      linear_gradient_max_score: 1,
      css_custom_emoticons_score: 1,
      different_font_sizes_score: 1,
      fixed_background_image_score: 1,
      css_custom_emoticons_feedback:
        "Custom emoticons have been implemented using the ::marker pseudo-element for the prize categories.",
      different_font_sizes_feedback:
        "Different font sizes are used (for example, h1 uses viewport units and p uses rem units), ensuring typographic variety.",
      css_custom_emoticons_max_score: 1,
      different_font_sizes_max_score: 1,
      fixed_background_image_feedback:
        "A background image with a fixed attachment is applied to the main element, meeting the requirement.",
      fixed_background_image_max_score: 1,
      mobile_and_desktop_versions_score: 1,
      absolute_or_fixed_positioning_score: 1,
      mobile_and_desktop_versions_feedback:
        "You implemented responsive design using media queries effectively to cater to both mobile and desktop versions.",
      mobile_and_desktop_versions_max_score: 1,
      absolute_or_fixed_positioning_feedback:
        "You demonstrated the use of absolute positioning (e.g., the h1 element) and fixed backgrounds, aligning with the assignment demands.",
      absolute_or_fixed_positioning_max_score: 1,
      pseudo_classes_and_pseudo_elements_score: 1,
      pseudo_classes_and_pseudo_elements_feedback:
        "Pseudo-classes and pseudo-elements are correctly used, such as the ::first-letter in paragraphs and ::marker for list items.",
      pseudo_classes_and_pseudo_elements_max_score: 1,
    },
    crucial_checks: {
      validation_errors_score: 1,
      positioning_problems_score: 1,
      validation_errors_feedback:
        "Your HTML and CSS code show no validation errors and appear well-formed.",
      validation_errors_max_score: 1,
      positioning_problems_feedback:
        "There are no apparent positioning issues, and the layout adapts well without overflow or misalignment.",
      positioning_problems_max_score: 1,
    },
    general_comments: {
      seo_score: 1,
      design_score: 1,
      seo_feedback:
        "The pages have clear and meaningful titles, meta tags, and alt attributes that contribute to effective search engine optimization.",
      seo_max_score: 1,
      design_feedback:
        "Your design is coherent with well aligned elements and consistent styling. Minor layout adjustments were mentioned in your reflections, but overall the design meets the criteria.",
      design_max_score: 1,
      CSS_optimization_score: 1,
      code_readablilty_score: 1,
      user_readability_score: 1,
      project_structure_score: 1,
      naming_conventions_score: 1,
      CSS_optimization_feedback:
        "CSS rules are grouped logically, and comments along with naming conventions make for understandable and maintainable code.",
      code_readablilty_feedback:
        "The code is well structured, indented, and easy to follow.",
      user_readability_feedback:
        "The website content is presented clearly and is easily readable by users.",
      CSS_optimization_max_score: 3,
      code_readablilty_max_score: 1,
      project_structure_feedback:
        "The project is organized with separate folders for HTML, CSS, and assets, in line with the assignment requirements.",
      user_readability_max_score: 1,
      naming_conventions_feedback:
        "File and element naming conventions are consistently applied and clear.",
      project_structure_max_score: 1,
      naming_conventions_max_score: 1,
      semantic_structural_tags_score: 1,
      semantic_structural_tags_feedback:
        "You employed semantic tags (header, main, footer, article, section) effectively to structure the content.",
      semantic_structural_tags_max_score: 1,
      bringing_css_and_html_together_score: 1,
      bringing_css_and_html_together_feedback:
        "CSS is properly implemented as external files with no inline styles, fulfilling the integration requirement.",
      bringing_css_and_html_together_max_score: 1,
    },
    AI_final_assessment: {
      AI_final_comments:
        "Overall, you have delivered a well-structured and carefully implemented project. Your reflections are thorough, demonstrating deep insight into both the design challenges and the sustainability measures taken. The technical requirements, such as the use of responsive design, specific CSS properties, and semantic structure, are met seamlessly. There is minor room for improvement in elaborating on the impact of the changes made, but your submission clearly meets and, in many areas, exceeds the expected standards. Great work!",
    },
  },
  {
    reflections: {
      own_mockup_score: 2,
      own_mockup_feedback:
        "You reflected on your own mock-up by identifying specific design mistakes (e.g. confusing descriptions regarding background images versus fixed elements and ambiguity in font size decisions) and the potential impact on the group implementing it. However, deeper analysis on how these choices could be improved would strengthen your reflection.",
      own_mockup_max_score: 1,
      sustainability_score: 2,
      main_difficulties_score: 3,
      sustainability_feedback:
        "You described several measures taken to reduce the carbon footprint such as image format choices, reducing image sizes, and using illustrations. While you provided concrete examples such as saving 29 KB, a more detailed discussion on why these choices matter for sustainability would improve the reflection.",
      sustainability_max_score: 3,
      main_difficulties_feedback:
        "Your reflection on the challenges with the implemented mock-up is clear and detailed. You explain issues like the conflicting use of gradients, differences between desktop and mobile layouts, and difficulties with positioning. This shows a good understanding of the main difficulties in adapting the mock-up for development.",
      main_difficulties_max_score: 3,
    },
    requirements: {
      z_index_score: 1,
      nth_child_score: 1,
      typefaces_score: 1,
      z_index_feedback:
        "You correctly used z-index (e.g., on the h1 element) to layer content appropriately.",
      z_index_max_score: 1,
      nth_child_feedback:
        "The nth-child pseudo-class is used to style list items, as seen in the first list item styling.",
      typefaces_feedback:
        "Two different typefaces were implemented using @font-face rules which meets the requirement.",
      nth_child_max_score: 1,
      typefaces_max_score: 1,
      linear_gradient_score: 1,
      linear_gradient_feedback:
        "A linear gradient is applied to the background, fulfilling the requirement.",
      linear_gradient_max_score: 1,
      css_custom_emoticons_score: 1,
      different_font_sizes_score: 1,
      fixed_background_image_score: 1,
      css_custom_emoticons_feedback:
        "Custom emoticons have been implemented using pseudo-elements (::marker) for list items.",
      different_font_sizes_feedback:
        "You have used various font sizes (e.g., h1 in vw, h2 in rem) to differentiate elements.",
      css_custom_emoticons_max_score: 1,
      different_font_sizes_max_score: 1,
      fixed_background_image_feedback:
        "A background image with background-attachment: fixed is set on the main element.",
      fixed_background_image_max_score: 1,
      mobile_and_desktop_versions_score: 1,
      absolute_or_fixed_positioning_score: 1,
      mobile_and_desktop_versions_feedback:
        "You implemented different styles for mobile and desktop using media queries, correctly adapting the layout.",
      mobile_and_desktop_versions_max_score: 1,
      absolute_or_fixed_positioning_feedback:
        "Absolute positioning is used (e.g., for the h1 element), fulfilling this requirement.",
      absolute_or_fixed_positioning_max_score: 1,
      pseudo_classes_and_pseudo_elements_score: 1,
      pseudo_classes_and_pseudo_elements_feedback:
        "Pseudo-classes and pseudo-elements are used (such as ::first-letter and ::marker), meeting the criteria.",
      pseudo_classes_and_pseudo_elements_max_score: 1,
    },
    crucial_checks: {
      validation_errors_score: 1,
      positioning_problems_score: 1,
      validation_errors_feedback:
        "No apparent validation errors were found in the HTML or CSS code.",
      validation_errors_max_score: 1,
      positioning_problems_feedback:
        "The layout and positioning work as intended without any major overflow or alignment issues.",
      positioning_problems_max_score: 1,
    },
    general_comments: {
      seo_score: 1,
      design_score: 1,
      seo_feedback:
        "Appropriate meta tags, page titles, and descriptive content are in place, contributing to good SEO practices.",
      seo_max_score: 1,
      design_feedback:
        "The design is coherent and consistent with well-aligned elements, clear spacing, and appropriate color choices.",
      design_max_score: 1,
      CSS_optimization_score: 1,
      code_readablilty_score: 1,
      user_readability_score: 1,
      project_structure_score: 1,
      naming_conventions_score: 1,
      CSS_optimization_feedback:
        "Your CSS is structured using external stylesheets and grouped rules, showing optimized coding practices.",
      code_readablilty_feedback:
        "The code is neatly indented and structured, making it easy to read and follow.",
      user_readability_feedback:
        "The website presents content in a clear and user-friendly manner with adequate spacing and alignment.",
      CSS_optimization_max_score: 3,
      code_readablilty_max_score: 1,
      project_structure_feedback:
        "The project is organized with separate HTML pages and clear folder structure, meeting assignment requirements.",
      user_readability_max_score: 1,
      naming_conventions_feedback:
        "Files and folders are properly named using consistent conventions.",
      project_structure_max_score: 1,
      naming_conventions_max_score: 1,
      semantic_structural_tags_score: 1,
      semantic_structural_tags_feedback:
        "Semantic elements like header, main, footer, section, article, aside, and figure are used appropriately.",
      semantic_structural_tags_max_score: 1,
      bringing_css_and_html_together_score: 1,
      bringing_css_and_html_together_feedback:
        "CSS is linked externally, which fulfills the assignment requirements perfectly.",
      bringing_css_and_html_together_max_score: 1,
    },
    AI_final_assessment: {
      AI_final_comments:
        "Overall, your submission meets the assignment requirements and demonstrates a clear understanding of both design and technical aspects. Your reflections are detailed regarding the main difficulties and sustainability measures, though your self-reflection could benefit from deeper analysis of how to improve your mock-up design. The CSS implementation is robust, employing techniques such as fixed backgrounds, custom emoticons via pseudo-elements, and responsive media queries. The HTML structure is semantic and well-organized. For future improvements, consider providing more in-depth explanations in your reflections and refining CSS grouping to enhance maintainability.",
    },
  },
  {
    reflections: {
      own_mockup_score: 0,
      own_mockup_feedback:
        "You did not include any reflection regarding your own mock-up. There is no discussion or rating of the mock-up's quality or explanation of what was done.",
      own_mockup_max_score: 1,
      sustainability_score: 0,
      main_difficulties_score: 0,
      sustainability_feedback:
        "There is no dedicated reflection on sustainability measures or discussion of how you reduced the digital carbon footprint of the newsletter.",
      sustainability_max_score: 3,
      main_difficulties_feedback:
        "No section discussing the main difficulties encountered with the mock-up or implementation choices is present in your submission.",
      main_difficulties_max_score: 3,
    },
    requirements: {
      z_index_score: 0,
      nth_child_score: 0,
      typefaces_score: 1,
      z_index_feedback:
        "You did not use any z-index property in your CSS code.",
      z_index_max_score: 1,
      nth_child_feedback:
        "The nth-child pseudo-class is not used anywhere in your CSS.",
      typefaces_feedback:
        "You have made use of two different typefaces (Helvetica/Arial for headings and Verdana/Geneva/Tahoma for paragraphs and lists).",
      nth_child_max_score: 1,
      typefaces_max_score: 1,
      linear_gradient_score: 1,
      linear_gradient_feedback:
        "A linear gradient is applied within the header background, meeting the requirement.",
      linear_gradient_max_score: 1,
      css_custom_emoticons_score: 0,
      different_font_sizes_score: 1,
      fixed_background_image_score: 1,
      css_custom_emoticons_feedback:
        "There is no use of custom CSS emoticons for the prize categories.",
      different_font_sizes_feedback:
        "Different font sizes are used (e.g., h1 at 40px and h2 at 20px), fulfilling the requirement.",
      css_custom_emoticons_max_score: 1,
      different_font_sizes_max_score: 1,
      fixed_background_image_feedback:
        "The header includes a background image with background-attachment: fixed, which meets the requirement.",
      fixed_background_image_max_score: 1,
      mobile_and_desktop_versions_score: 0,
      absolute_or_fixed_positioning_score: 0,
      mobile_and_desktop_versions_feedback:
        "You did not implement any media queries to differentiate between mobile and desktop layouts.",
      mobile_and_desktop_versions_max_score: 1,
      absolute_or_fixed_positioning_feedback:
        "There is no evidence of using absolute or fixed positioning on specific elements in your CSS.",
      absolute_or_fixed_positioning_max_score: 1,
      pseudo_classes_and_pseudo_elements_score: 0,
      pseudo_classes_and_pseudo_elements_feedback:
        "The CSS does not contain any pseudo-classes or pseudo-elements.",
      pseudo_classes_and_pseudo_elements_max_score: 1,
    },
    crucial_checks: {
      validation_errors_score: 0,
      positioning_problems_score: 1,
      validation_errors_feedback:
        "There appears to be a validation issue in the header CSS rule, particularly with the background shorthand (e.g., the ordering of 'fixed' and the URL may cause errors).",
      validation_errors_max_score: 1,
      positioning_problems_feedback:
        "No significant positioning problems such as overflowing elements or horizontal scroll issues were detected.",
      positioning_problems_max_score: 1,
    },
    general_comments: {
      seo_score: 0,
      design_score: 1,
      seo_feedback:
        "The title tag is generic ('Document') and lacks a meaningful description. File names and metadata do not support proper SEO.",
      seo_max_score: 1,
      design_feedback:
        "The design is simple and structurally aligned; however, it lacks responsiveness and visual enhancements which could improve the overall aesthetic.",
      design_max_score: 1,
      CSS_optimization_score: 1,
      code_readablilty_score: 1,
      user_readability_score: 1,
      project_structure_score: 0,
      naming_conventions_score: 1,
      CSS_optimization_feedback:
        "Your CSS is basic and mostly clear, though it could be better organized and optimized by grouping related rules.",
      code_readablilty_feedback:
        "The code is well structured and easy to read with proper indentation.",
      user_readability_feedback:
        "The content is presented in a clear manner, though improvements in responsiveness could benefit end-user readability.",
      CSS_optimization_max_score: 3,
      code_readablilty_max_score: 1,
      project_structure_feedback:
        "The project is incomplete: only a main page is provided and the required reflection page is missing.",
      user_readability_max_score: 1,
      naming_conventions_feedback:
        "Filenames (index.html, styles.css) adhere to standard naming conventions.",
      project_structure_max_score: 1,
      naming_conventions_max_score: 1,
      semantic_structural_tags_score: 1,
      semantic_structural_tags_feedback:
        "You have used semantic tags such as <header>, <main>, and <footer> appropriately.",
      semantic_structural_tags_max_score: 1,
      bringing_css_and_html_together_score: 1,
      bringing_css_and_html_together_feedback:
        "CSS is correctly linked externally in your HTML files.",
      bringing_css_and_html_together_max_score: 1,
    },
    AI_final_assessment: {
      AI_final_comments:
        "Your submission presents a basic HTML structure and CSS styling which addresses some of the visual requirement such as the use of background images, linear gradients, and varied typefaces. However, several key aspects of the assignment are missing. The reflection page, which was critical for discussing mock-up quality, sustainability measures, and the challenges faced, is completely absent. Additionally, important technical requirements such as media queries for responsiveness, use of pseudo-classes/elements, nth-child, and explicit use of absolute or fixed positioning properties are not implemented. There may also be validation issues in your CSS background shorthand. Focusing on these missing elements and correcting potential syntax errors will considerably improve your overall project quality.",
    },
  },
];

// export default
async function aggregateAssignmentFeedback() {
  //   criteria,
  //   const jsonCriteria = JSON.parse(criteria);

  const completion = await openai.chat.completions.create({
    model: "o3-mini",
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
            Here are the JSON feedback objects from multiple students: ${studentFeedback}
    
            

            Please produce the final aggregated feedback JSON following the schema. 
            Make sure to include:
            - "assignmentInfo" with "assignmentId", "title", "dateGenerated", and "totalSubmissions".
            - "commonProblems" array (with "problemName", "description", "occurrences", "averageScore", and "recommendedActions").
            - "strongAreas" array (with "areaName", "description", "averageScore", and "numStudentsAboveThreshold").
            - "overallLecturerSuggestions" (string).
            - "additionalNotes" (string, if any).
    
            No extra explanations or text outside the JSON, please. Just the final JSON object.
          `,
      },
    ],
  });

  const res = completion.choices[0].message.content;
  console.log(res);
}

aggregateAssignmentFeedback();
