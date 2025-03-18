import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI({ apiKey: process.env.AI_API_KEY });

const aggregatedAssignmentFeedbackSchema = {
    name: "AggregatedAssignmentFeedback",
    strict: true,
    schema: {
        type: "object",
        description: "Schema for aggregated AI feedback across multiple student submissions.",
        additionalProperties: false,
        properties: {
            // common problems
            commonProblems: {
                type: "array",
                description: "List of the most commonly encountered problems or low-scoring areas among students.",
                items: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                        problemName: {
                            type: "string",
                            description: "Name or identifier for the problem/requirement area.",
                        },
                        description: {
                            type: "string",
                            description: "Brief explanation of the nature of this problem.",
                        },
                        occurrences: {
                            type: "integer",
                            description: "Number of students affected by this particular issue.",
                        },

                        recommendedActions: {
                            type: "array",
                            description: "Actions or suggestions to fix or improve this problem.",
                            items: {
                                type: "string"
                            },
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
                description: "List of areas or requirements most students performed well in.",
                items: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                        areaName: {
                            type: "string",
                            description: "Name of the requirement or topic students excelled in.",
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
                description: "General suggestions or feedback for the lecturer based on the student submissions.",
                items: {
                    type: "string"
                },
            },
            additionalNotes: {
                type: "string",
                description: "Any additional observations or free-form notes that do not fit neatly into the above categories.",
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

// placeholders
// const newestStudentFeedback = [
//   {
//     reflections: {
//       own_mockup_score: 3,
//       own_mockup_feedback:
//         "You provided a detailed and reflective analysis of your own mock-up. You clearly explained the design challenges, your modifications, and even gave a rating to your mock-up. The reflection is thorough and shows you thought through the design decisions, although a bit more detail on how these choices impacted implementation could improve clarity further.",
//       own_mockup_max_score: 1,
//       sustainability_score: 3,
//       main_difficulties_score: 3,
//       sustainability_feedback:
//         "Your sustainability reflection is strong. You described the specific measures taken, such as adjusting image formats and sizes, and quantified the savings. This shows a clear understanding of sustainable web design practices. More detailed comparisons or additional measures could further enrich this reflection.",
//       sustainability_max_score: 3,
//       main_difficulties_feedback:
//         "You clearly articulated the main challenges encountered with the mock-up, including issues with layout adaptation between mobile and desktop and the complications in using certain CSS properties. Your explanation provided insight into how these difficulties influenced your decisions and modifications.",
//       main_difficulties_max_score: 3,
//     },
//     requirements: {
//       z_index_score: 1,
//       nth_child_score: 1,
//       typefaces_score: 1,
//       z_index_feedback:
//         "You correctly used the z-index property (e.g., on the h1 element in about-style.css) to manage element stacking.",
//       z_index_max_score: 1,
//       nth_child_feedback:
//         "You utilized the nth-child pseudo-class (e.g., for the list items in .text-seven) successfully.",
//       typefaces_feedback:
//         "You integrated two different typefaces as required, loading them via @font-face and applying them appropriately in your CSS.",
//       nth_child_max_score: 1,
//       typefaces_max_score: 1,
//       linear_gradient_score: 1,
//       linear_gradient_feedback:
//         "A linear gradient is correctly applied as a background in your CSS, fulfilling the requirement.",
//       linear_gradient_max_score: 1,
//       css_custom_emoticons_score: 1,
//       different_font_sizes_score: 1,
//       fixed_background_image_score: 1,
//       css_custom_emoticons_feedback:
//         "Custom emoticons have been implemented using the ::marker pseudo-element for the prize categories.",
//       different_font_sizes_feedback:
//         "Different font sizes are used (for example, h1 uses viewport units and p uses rem units), ensuring typographic variety.",
//       css_custom_emoticons_max_score: 1,
//       different_font_sizes_max_score: 1,
//       fixed_background_image_feedback:
//         "A background image with a fixed attachment is applied to the main element, meeting the requirement.",
//       fixed_background_image_max_score: 1,
//       mobile_and_desktop_versions_score: 1,
//       absolute_or_fixed_positioning_score: 1,
//       mobile_and_desktop_versions_feedback:
//         "You implemented responsive design using media queries effectively to cater to both mobile and desktop versions.",
//       mobile_and_desktop_versions_max_score: 1,
//       absolute_or_fixed_positioning_feedback:
//         "You demonstrated the use of absolute positioning (e.g., the h1 element) and fixed backgrounds, aligning with the assignment demands.",
//       absolute_or_fixed_positioning_max_score: 1,
//       pseudo_classes_and_pseudo_elements_score: 1,
//       pseudo_classes_and_pseudo_elements_feedback:
//         "Pseudo-classes and pseudo-elements are correctly used, such as the ::first-letter in paragraphs and ::marker for list items.",
//       pseudo_classes_and_pseudo_elements_max_score: 1,
//     },
//     crucial_checks: {
//       validation_errors_score: 1,
//       positioning_problems_score: 1,
//       validation_errors_feedback:
//         "Your HTML and CSS code show no validation errors and appear well-formed.",
//       validation_errors_max_score: 1,
//       positioning_problems_feedback:
//         "There are no apparent positioning issues, and the layout adapts well without overflow or misalignment.",
//       positioning_problems_max_score: 1,
//     },
//     general_comments: {
//       seo_score: 1,
//       design_score: 1,
//       seo_feedback:
//         "The pages have clear and meaningful titles, meta tags, and alt attributes that contribute to effective search engine optimization.",
//       seo_max_score: 1,
//       design_feedback:
//         "Your design is coherent with well aligned elements and consistent styling. Minor layout adjustments were mentioned in your reflections, but overall the design meets the criteria.",
//       design_max_score: 1,
//       CSS_optimization_score: 1,
//       code_readablilty_score: 1,
//       user_readability_score: 1,
//       project_structure_score: 1,
//       naming_conventions_score: 1,
//       CSS_optimization_feedback:
//         "CSS rules are grouped logically, and comments along with naming conventions make for understandable and maintainable code.",
//       code_readablilty_feedback:
//         "The code is well structured, indented, and easy to follow.",
//       user_readability_feedback:
//         "The website content is presented clearly and is easily readable by users.",
//       CSS_optimization_max_score: 3,
//       code_readablilty_max_score: 1,
//       project_structure_feedback:
//         "The project is organized with separate folders for HTML, CSS, and assets, in line with the assignment requirements.",
//       user_readability_max_score: 1,
//       naming_conventions_feedback:
//         "File and element naming conventions are consistently applied and clear.",
//       project_structure_max_score: 1,
//       naming_conventions_max_score: 1,
//       semantic_structural_tags_score: 1,
//       semantic_structural_tags_feedback:
//         "You employed semantic tags (header, main, footer, article, section) effectively to structure the content.",
//       semantic_structural_tags_max_score: 1,
//       bringing_css_and_html_together_score: 1,
//       bringing_css_and_html_together_feedback:
//         "CSS is properly implemented as external files with no inline styles, fulfilling the integration requirement.",
//       bringing_css_and_html_together_max_score: 1,
//     },
//     AI_final_assessment: {
//       AI_final_comments:
//         "Overall, you have delivered a well-structured and carefully implemented project. Your reflections are thorough, demonstrating deep insight into both the design challenges and the sustainability measures taken. The technical requirements, such as the use of responsive design, specific CSS properties, and semantic structure, are met seamlessly. There is minor room for improvement in elaborating on the impact of the changes made, but your submission clearly meets and, in many areas, exceeds the expected standards. Great work!",
//     },
//   },
//   {
//     reflections: {
//       own_mockup_score: 2,
//       own_mockup_feedback:
//         "You reflected on your own mock-up by identifying specific design mistakes (e.g. confusing descriptions regarding background images versus fixed elements and ambiguity in font size decisions) and the potential impact on the group implementing it. However, deeper analysis on how these choices could be improved would strengthen your reflection.",
//       own_mockup_max_score: 1,
//       sustainability_score: 2,
//       main_difficulties_score: 3,
//       sustainability_feedback:
//         "You described several measures taken to reduce the carbon footprint such as image format choices, reducing image sizes, and using illustrations. While you provided concrete examples such as saving 29 KB, a more detailed discussion on why these choices matter for sustainability would improve the reflection.",
//       sustainability_max_score: 3,
//       main_difficulties_feedback:
//         "Your reflection on the challenges with the implemented mock-up is clear and detailed. You explain issues like the conflicting use of gradients, differences between desktop and mobile layouts, and difficulties with positioning. This shows a good understanding of the main difficulties in adapting the mock-up for development.",
//       main_difficulties_max_score: 3,
//     },
//     requirements: {
//       z_index_score: 1,
//       nth_child_score: 1,
//       typefaces_score: 1,
//       z_index_feedback:
//         "You correctly used z-index (e.g., on the h1 element) to layer content appropriately.",
//       z_index_max_score: 1,
//       nth_child_feedback:
//         "The nth-child pseudo-class is used to style list items, as seen in the first list item styling.",
//       typefaces_feedback:
//         "Two different typefaces were implemented using @font-face rules which meets the requirement.",
//       nth_child_max_score: 1,
//       typefaces_max_score: 1,
//       linear_gradient_score: 1,
//       linear_gradient_feedback:
//         "A linear gradient is applied to the background, fulfilling the requirement.",
//       linear_gradient_max_score: 1,
//       css_custom_emoticons_score: 1,
//       different_font_sizes_score: 1,
//       fixed_background_image_score: 1,
//       css_custom_emoticons_feedback:
//         "Custom emoticons have been implemented using pseudo-elements (::marker) for list items.",
//       different_font_sizes_feedback:
//         "You have used various font sizes (e.g., h1 in vw, h2 in rem) to differentiate elements.",
//       css_custom_emoticons_max_score: 1,
//       different_font_sizes_max_score: 1,
//       fixed_background_image_feedback:
//         "A background image with background-attachment: fixed is set on the main element.",
//       fixed_background_image_max_score: 1,
//       mobile_and_desktop_versions_score: 1,
//       absolute_or_fixed_positioning_score: 1,
//       mobile_and_desktop_versions_feedback:
//         "You implemented different styles for mobile and desktop using media queries, correctly adapting the layout.",
//       mobile_and_desktop_versions_max_score: 1,
//       absolute_or_fixed_positioning_feedback:
//         "Absolute positioning is used (e.g., for the h1 element), fulfilling this requirement.",
//       absolute_or_fixed_positioning_max_score: 1,
//       pseudo_classes_and_pseudo_elements_score: 1,
//       pseudo_classes_and_pseudo_elements_feedback:
//         "Pseudo-classes and pseudo-elements are used (such as ::first-letter and ::marker), meeting the criteria.",
//       pseudo_classes_and_pseudo_elements_max_score: 1,
//     },
//     crucial_checks: {
//       validation_errors_score: 1,
//       positioning_problems_score: 1,
//       validation_errors_feedback:
//         "No apparent validation errors were found in the HTML or CSS code.",
//       validation_errors_max_score: 1,
//       positioning_problems_feedback:
//         "The layout and positioning work as intended without any major overflow or alignment issues.",
//       positioning_problems_max_score: 1,
//     },
//     general_comments: {
//       seo_score: 1,
//       design_score: 1,
//       seo_feedback:
//         "Appropriate meta tags, page titles, and descriptive content are in place, contributing to good SEO practices.",
//       seo_max_score: 1,
//       design_feedback:
//         "The design is coherent and consistent with well-aligned elements, clear spacing, and appropriate color choices.",
//       design_max_score: 1,
//       CSS_optimization_score: 1,
//       code_readablilty_score: 1,
//       user_readability_score: 1,
//       project_structure_score: 1,
//       naming_conventions_score: 1,
//       CSS_optimization_feedback:
//         "Your CSS is structured using external stylesheets and grouped rules, showing optimized coding practices.",
//       code_readablilty_feedback:
//         "The code is neatly indented and structured, making it easy to read and follow.",
//       user_readability_feedback:
//         "The website presents content in a clear and user-friendly manner with adequate spacing and alignment.",
//       CSS_optimization_max_score: 3,
//       code_readablilty_max_score: 1,
//       project_structure_feedback:
//         "The project is organized with separate HTML pages and clear folder structure, meeting assignment requirements.",
//       user_readability_max_score: 1,
//       naming_conventions_feedback:
//         "Files and folders are properly named using consistent conventions.",
//       project_structure_max_score: 1,
//       naming_conventions_max_score: 1,
//       semantic_structural_tags_score: 1,
//       semantic_structural_tags_feedback:
//         "Semantic elements like header, main, footer, section, article, aside, and figure are used appropriately.",
//       semantic_structural_tags_max_score: 1,
//       bringing_css_and_html_together_score: 1,
//       bringing_css_and_html_together_feedback:
//         "CSS is linked externally, which fulfills the assignment requirements perfectly.",
//       bringing_css_and_html_together_max_score: 1,
//     },
//     AI_final_assessment: {
//       AI_final_comments:
//         "Overall, your submission meets the assignment requirements and demonstrates a clear understanding of both design and technical aspects. Your reflections are detailed regarding the main difficulties and sustainability measures, though your self-reflection could benefit from deeper analysis of how to improve your mock-up design. The CSS implementation is robust, employing techniques such as fixed backgrounds, custom emoticons via pseudo-elements, and responsive media queries. The HTML structure is semantic and well-organized. For future improvements, consider providing more in-depth explanations in your reflections and refining CSS grouping to enhance maintainability.",
//     },
//   },
//   {
//     reflections: {
//       own_mockup_score: 0,
//       own_mockup_feedback:
//         "You did not include any reflection regarding your own mock-up. There is no discussion or rating of the mock-up's quality or explanation of what was done.",
//       own_mockup_max_score: 1,
//       sustainability_score: 0,
//       main_difficulties_score: 0,
//       sustainability_feedback:
//         "There is no dedicated reflection on sustainability measures or discussion of how you reduced the digital carbon footprint of the newsletter.",
//       sustainability_max_score: 3,
//       main_difficulties_feedback:
//         "No section discussing the main difficulties encountered with the mock-up or implementation choices is present in your submission.",
//       main_difficulties_max_score: 3,
//     },
//     requirements: {
//       z_index_score: 0,
//       nth_child_score: 0,
//       typefaces_score: 1,
//       z_index_feedback:
//         "You did not use any z-index property in your CSS code.",
//       z_index_max_score: 1,
//       nth_child_feedback:
//         "The nth-child pseudo-class is not used anywhere in your CSS.",
//       typefaces_feedback:
//         "You have made use of two different typefaces (Helvetica/Arial for headings and Verdana/Geneva/Tahoma for paragraphs and lists).",
//       nth_child_max_score: 1,
//       typefaces_max_score: 1,
//       linear_gradient_score: 1,
//       linear_gradient_feedback:
//         "A linear gradient is applied within the header background, meeting the requirement.",
//       linear_gradient_max_score: 1,
//       css_custom_emoticons_score: 0,
//       different_font_sizes_score: 1,
//       fixed_background_image_score: 1,
//       css_custom_emoticons_feedback:
//         "There is no use of custom CSS emoticons for the prize categories.",
//       different_font_sizes_feedback:
//         "Different font sizes are used (e.g., h1 at 40px and h2 at 20px), fulfilling the requirement.",
//       css_custom_emoticons_max_score: 1,
//       different_font_sizes_max_score: 1,
//       fixed_background_image_feedback:
//         "The header includes a background image with background-attachment: fixed, which meets the requirement.",
//       fixed_background_image_max_score: 1,
//       mobile_and_desktop_versions_score: 0,
//       absolute_or_fixed_positioning_score: 0,
//       mobile_and_desktop_versions_feedback:
//         "You did not implement any media queries to differentiate between mobile and desktop layouts.",
//       mobile_and_desktop_versions_max_score: 1,
//       absolute_or_fixed_positioning_feedback:
//         "There is no evidence of using absolute or fixed positioning on specific elements in your CSS.",
//       absolute_or_fixed_positioning_max_score: 1,
//       pseudo_classes_and_pseudo_elements_score: 0,
//       pseudo_classes_and_pseudo_elements_feedback:
//         "The CSS does not contain any pseudo-classes or pseudo-elements.",
//       pseudo_classes_and_pseudo_elements_max_score: 1,
//     },
//     crucial_checks: {
//       validation_errors_score: 0,
//       positioning_problems_score: 1,
//       validation_errors_feedback:
//         "There appears to be a validation issue in the header CSS rule, particularly with the background shorthand (e.g., the ordering of 'fixed' and the URL may cause errors).",
//       validation_errors_max_score: 1,
//       positioning_problems_feedback:
//         "No significant positioning problems such as overflowing elements or horizontal scroll issues were detected.",
//       positioning_problems_max_score: 1,
//     },
//     general_comments: {
//       seo_score: 0,
//       design_score: 1,
//       seo_feedback:
//         "The title tag is generic ('Document') and lacks a meaningful description. File names and metadata do not support proper SEO.",
//       seo_max_score: 1,
//       design_feedback:
//         "The design is simple and structurally aligned; however, it lacks responsiveness and visual enhancements which could improve the overall aesthetic.",
//       design_max_score: 1,
//       CSS_optimization_score: 1,
//       code_readablilty_score: 1,
//       user_readability_score: 1,
//       project_structure_score: 0,
//       naming_conventions_score: 1,
//       CSS_optimization_feedback:
//         "Your CSS is basic and mostly clear, though it could be better organized and optimized by grouping related rules.",
//       code_readablilty_feedback:
//         "The code is well structured and easy to read with proper indentation.",
//       user_readability_feedback:
//         "The content is presented in a clear manner, though improvements in responsiveness could benefit end-user readability.",
//       CSS_optimization_max_score: 3,
//       code_readablilty_max_score: 1,
//       project_structure_feedback:
//         "The project is incomplete: only a main page is provided and the required reflection page is missing.",
//       user_readability_max_score: 1,
//       naming_conventions_feedback:
//         "Filenames (index.html, styles.css) adhere to standard naming conventions.",
//       project_structure_max_score: 1,
//       naming_conventions_max_score: 1,
//       semantic_structural_tags_score: 1,
//       semantic_structural_tags_feedback:
//         "You have used semantic tags such as <header>, <main>, and <footer> appropriately.",
//       semantic_structural_tags_max_score: 1,
//       bringing_css_and_html_together_score: 1,
//       bringing_css_and_html_together_feedback:
//         "CSS is correctly linked externally in your HTML files.",
//       bringing_css_and_html_together_max_score: 1,
//     },
//     AI_final_assessment: {
//       AI_final_comments:
//         "Your submission presents a basic HTML structure and CSS styling which addresses some of the visual requirement such as the use of background images, linear gradients, and varied typefaces. However, several key aspects of the assignment are missing. The reflection page, which was critical for discussing mock-up quality, sustainability measures, and the challenges faced, is completely absent. Additionally, important technical requirements such as media queries for responsiveness, use of pseudo-classes/elements, nth-child, and explicit use of absolute or fixed positioning properties are not implemented. There may also be validation issues in your CSS background shorthand. Focusing on these missing elements and correcting potential syntax errors will considerably improve your overall project quality.",
//     },
//   },
// ];
const assignmentDescription = `"Oblig#2
    From wireframe to finished website
    Due date: Check blackboard
    IDG1292 – Fall 2023
    Table of Contents
    Preface ..................................................................................................................................................................... 3
    Scenario.................................................................................................................................................................... 3
    Part I – Lab 8 Sketching......................................................................................................................................... 4
    Goal of the day........................................................................................................................................................................... 4
    Lab Description ......................................................................................................................................................................... 4
    Preparation ................................................................................................................................................................................ 5
    Designing the mock-up................................................................................................................................................................ 5
    Wrap up and delivery................................................................................................................................................................. 6
    Example of mock-up.................................................................................................................................................................. 6
    Part II – Development...........................................................................................................................................10
    Context ................................................................................................................................................................................... 10
    Task Description ..................................................................................................................................................................... 10
    Requirements ........................................................................................................................................................................... 10
    Reflection page.......................................................................................................................................................................... 11
    Deliverables ............................................................................................................................................................................. 12
    Preface
    This is the second compulsory activity of the course (oblig#2). This compulsory assignment will
    be done in groups that are randomly formed during the lab session (see Part I – Lab 8 Sketching). The
    assignment consists of two parts:
    • Part I - rapid prototyping: done as part of lab8 “creating paper mock-ups; sustainable design”.
    Notice that the results from the lab session must be included in the delivery.
    • Part II – implementation of a newsletter based on mock-ups done in the lab session. The
    focus of the task is to create a coherent HTML structure based on the mock-up received and
    reflect on the choices taken during the design and implementation phases. The group is
    encouraged to use anything learned between lectures 1 to 8.
    These are all rather simple tasks done in groups. So, we expect you to deliver with high quality. The
    best thing you can do for quality assurance is to:
    a) Validate all your HTML and CSS code.
    b) Make sure everyone participates in the group work and give everyone a chance to present
    and discuss their thoughts.
    Please do not forget that copying or letting others copy your code can be considered
    plagiarism. If you use fragments of code from the internet (stack overflow, w3c, etc.), make sure they
    are properly referred to in the code as a comment with the link to the resource you have used.
    Finally, also notice it is expected that you write your code from scratch. Therefore, downloading
    HTML templates or using CSS frameworks such as Tailwind CSS or Bootstrap is not allowed. and
    Grid Layout is not allowed either.
    Scenario
    Darling, the student organisation, is hosting a Halloween party as part of their fundraising efforts
    for an upcoming study trip. They have dedicated considerable time to planning the event and are keen
    to use digital channels to maximise student participation. Nevertheless, they are mindful of the
    environmental impact associated with digital platforms, particularly websites. Consequently, they've
    made a deliberate choice to design their website and newsletters with a minimal carbon footprint to
    prioritise sustainability.
    They decided to hire two different teams of novice web designers to design and implement the
    newsletter. The first team will be in charge of sketching the newsletter (see Part I – Lab 8 Sketching).
    The second team will be responsible for the development of the project (see Part II – Development).
    Part I – Lab 8 Sketching
    This part of the oblig is done during the lab session.
    Please scan the QR code you will find in the classroom, and you will be assigned to a group.
    Goal of the day
    The lab session has different goals and ambitions since it consists of the first part of oblig 2. On
    the one hand, you will practice your sketching and prototyping skills in groups. On the other hand,
    your sketches will be used as part of the second compulsory assignment – Part II, where other students
    will have to implement your designs using your instructions.
    After finishing this lab session, you will:
    • have used a mobile stencil created in IDG1000 to create/sketch a website mock-up on paper
    (used by others as part of their second compulsory assignment)
    • understand the importance of planning a website beforehand to make the coding process
    more efficient
    • have designed, as a group, something you are proud of
    • know more about sustainable web design (https://sustainablewebdesign.org/)
    Lab Description
    As explained before, your work might be used by other students as part of the
    description of their second compulsory activity (oblig#2 – part 2). Therefore, we will
    ask your group to upload your designs this week to BB (more information there).
    Make sure you do not include any names or sensitive information in your sketches.
    During the lab session, your team will have to design the newsletter (who better than young web
    designers?).
    Darling has provided you with the contents they want to send out with the Halloween invitation
    newsletter (“text-content.pdf” or “text-content.txt”).
    Use the stencil template (made in IDG1000) to create a paper mock-up of the newsletter. Design
    the mock-up following a mobile first-approach. Then, include an additional view showing how one
    element would change using media queries.
    Preparation
    Find your group and start an introduction round where you say your name and study program. The
    group will be provided with three A3 papers and a stencil template (or, pick one of the stencil
    templates from one member of the group if you have them available). Nominate a member of the
    group to be in charge of writing and another member responsible for uploading the files to Blackboard
    when the lab session is finished.
    Designing the mock-up
    Start by discussing the design you envision within your group, and then translate your ideas onto
    A3 sheets. You may require multiple A3 sheets to illustrate the entire webpage fully. Encourage
    creativity throughout this process.
    Your mock-up should encompass the following elements (refer to the \"Example of Mock-Up\"
    below for guidance):
    • Text Content: Include all the content from \"text-content.pdf,\" with each piece of text
    labelled as Text#N. For each element you add to the mock-up, provide a description for
    the developers, ensuring it's easy to comprehend.
    • Media Queries: present an additional view that demonstrates how a specific element
    would adapt using media queries to address different screen sizes.
    • Group Number: clearly indicate your group number on the mock-up.
    In addition to that, you must design the website to ensure the following elements or CSS code will
    be included with the final implementation:
    • Background Image: while you do not need to locate an image, be sure to describe where
    and how you intend to incorporate it into the mock-up.
    • Two different Type Faces and their sizes
    • A Background image with a background-attachment: fixed
    • At least one element that uses absolute positioning or fixed positioning (the use of this
    form of positioning must be coherent)
    • Images or graphic elements
    • At least two elements that overlap each other
    • A linear gradient
    • Pseudo-classes and pseudo-elements
    • A custom emoticon for each one of the prize categories (scariest, funniest, most creative)
    that will be used to replace the bullet points of the list
    Aim for clarity, precision, and completeness when designing and describing your mock-up. Your
    goal is to make the design and descriptions explicit enough that another person can implement the
    design without requiring additional instructions from you.
    Wrap up and delivery
    Upon completing the assignment, please follow these steps to submit the lab:
    • Scan all the papers and compile them into a single PDF document. Name the document
    as \"groupX-design.pdf\" (replace X with your group number).
    • Create a folder and label it as \"lab8-groupX.\"
    • Place the PDF document inside this folder.
    • If you have any additional files or documents related to the lab, feel free to include them
    in the folder.
    • Compress the entire folder into a ZIP file.
    • Choose one member of the group to submit the lab on Blackboard. Navigate to
    \"Learning materials\" -> \"Labs\" -> \"Lab 8\" -> \"Upload Lab 8\" to make your submission.
    This step is very important since all the mock-ups done during the lab session will be shared with
    other groups for Part II. Please be aware that the mock-ups will be shared on Blackboard, and they
    will be utilised as part of the second part of the assignment and, therefore, other students will have
    access to view them.
    Example of mock-up
    This is just an example, be aware that it might not be the best design. For instance, it may not be
    the best approach having the image after the text in one article, and the image between the heading
    and the text in the other articles. Therefore, be creative and create your own mock-up.
    Part II – Development
    Context
    Darling hired your group to carry out the development of the newsletter. As part of the contract,
    you have received the following documents:
    • “text-content.pdf” and “text-content.txt”: both files contain the contents they want to send
    with the first newsletter. Both files contain the same text stored in different formats.
    • Zip file with the mock-ups you must follow to implement the HTML newsletter (each group
    will receive an email with information about the mock-up your group must implement and a link to a zip file).
    They also remind you that they want to develop a low-carbon footprint newsletter; therefore,
    you must pay attention to your code and your page size. They also want you to write a reflection
    about all the measures you have taken to reduce the newsletter's carbon footprint.
    Task Description
    In this assignment, you will need to create a responsive website based on the mock-up you received.
    The website should adapt to two screen sizes: one for mobile devices and one for larger screens (bigger
    than 960px). To achieve this, you should use media queries in your CSS code. The website should
    include all the information and elements from the mock-up, such as images, text, links, and layout.
    Try to match the mock-up as closely as possible. Also, notice that if you do not receive enough
    information or media files, you will have to make assumptions or create/find them on your own.
    The final website should consist of two pages. The first page is the main page where you implement
    the mock-up design. The second page is a reflection page where you discuss the choices you made
    and the challenges you faced while creating the website. The reflection should also describe the steps
    you took from start to finish and what you learned from this assignment. In addition, the reflection
    should include a list of measures you took to reduce your website's carbon footprint and make it more
    sustainable. You should also reflect on the quality of the mock-up you received, how it affected your
    implementation and decisions, and what suggestions you have for improving it. (See Reflection page
    section for more details).
    Please read all the requirements carefully before you start working on the assignment.
    Requirements
    In addition to all the information received with the mock-ups, you must find a way to meet the
    following requirements.
    You must:
    • Implement two pages (main page and reflection page)
    • Include a Link to the reflection page (check the provided text with the mock-up)
    • Implement Mobile and Desktop versions (One media query for larger screens 960px –
    mobile-first)
    • Use Two different Type Faces. This must be part of the mock-up received. If not, you must
    explain it in the reflection and decide which ones to use
    • Set a Background image with a background-attachment: fixed
    • Find the images for each article that either follow the instructions received with the mock-up
    or that matches the theme of the article (use royalty free images)
    • Find a way to use relative and absolute positioning as part of the implementation (if you have
    to do changes in the design you have received to accommodate this requirement, you must
    explain it in the reflection page)
    • Use different font sizes
    • Use a Linear gradient
    • Use Pseudo-classes and pseudo-elements
    • Add the custom emoticons for each one of the prize categories (scariest, funniest, most
    creative) using CSS – they cannot be coded as part of the HTML content (check pseudoelements and list-style-type)
    • Use the nth-child pseudo-class
    • Use the Z-Index in at least one of the elements
    You CANNOT:
    • Use Grid layout in this assignment
    • Use bootstrap or similar libraries
    Reflection page
    The reflection page must be divided in 3 parts or sections:
    • Section 1 – reflection about the implemented mock-up: Explain the main difficulties using
    the mock-up the group has received. Was all the information you needed available in the
    mock-up? What changes have you made to meet the requirements imposed in the
    description? Explain the changes and/or actions you took to implement the requirements
    (e.g.: explain how you used absolute positioning and the changes you had to do to meet these
    requirements). Finish this part of the reflection by rating the mock-up from 1 to 5 (being 5
    very good).
    • Section 2 – reflection about sustainability: explain all the measures you took to reduce your
    page's carbon footprint and size. How many “kbs” have you saved after applying those
    measures? How difficult was it? Give specific examples (e.g., if you change the format of a
    picture, show a table with the size before and after).
    • Section 3 – self-reflection of own mock-up: in retrospect, do you think your mock-up was
    good enough? Do you think other groups had challenges implementing it? What would you
    do differently now? Finish this part of the reflection by rating the mock-up from 1 to 5 (being
    5 very good).
    Deliverables
    The project must be delivered in a zip file which will contain two folders: part1/ and part2/.
    Follow the instructions:
    • Create the root folder and name it “groupX-o2-idg1292-2023”
    (replace X by your group number)
    • Create two folders inside the root ( “part1” and “part2”)
    o part1/: this folder will contain the mock-ups created by
    your group during lab 8. If your group did not attend
    the lab session, the group must do the task first and
    include it here.
    o part2/: this folder contains the implementation of your
    project. This is, this folder contains the complete
    website (i.e.: HTML pages, folders, assets, images, etc.).
    This is also the folder you must upload in your folk site.
    • Valid HTML and CSS code – Feel free to use the code
    validator.
    • README file (.txt or .md) in the root folder of your project
    with any relevant comment the examiner should know when
    grading the task.
    • The README file must contain the names of all the group
    members, and the folk site link to the projects (only one of the
    members of the group needs to deploy the file).
    • Compress the root folder in a zip file (only use zip to compress
    the assignment).
    • Deliver the assignment in Blackboard (only 1 member of the
    group).
    IMPORTANT
    All the members of the group are
    responsible for validating that the
    project was properly delivered.
    After uploading the assignment in
    Blackboard, double check that
    everything is in order.
     Projects delivered after the
    deadline will be marked as
    “not delivered”.
     Projects delivered as “drafts”
    in Blackboard will be
    considered as “not delivered”.
     Projects delivered with a
    format different than .zip will
    be considered as “not
    delivered”
     Corrupted zip files will be
    considered as “not delivered”
     Projects with validation error
    (s) will be graded as “not
    approved”`;
const assignmentCriteria = `'{"name": "oblig_2_darling", "schema": {"type": "object", "properties": {"reflections": 
  {"type": "object", "required": ["main_difficulties_score", "main_difficulties_feedback", "sustainability_score",
     "sustainability_feedback", "own_mockup_score", "own_mockup_feedback"], "properties": 
     {"own_mockup_score": {"type": "integer", "description": "Criteria (0-3) 0 -> missing reflection 1 -> weak reflection. Just making a statement and not explaining
       why 2 -> Good reflection. Explain why their mockup was good/not good. 3 -> Good reflection. Very reflective. Explain why their mockup was good/not good and show/explain ho"}, "own_mockup_feedback": {"type": "string", "description": "to what degree has the student reflected around their own mock up "}, "own_mockup_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "sustainability_score": {"type": "integer", "description": "Criteria (0-3) 0 -> missing reflection 1 -> weak reflection. Only descriptive and procedural 2 -> ok reflection. Describes the process but also explains why some decisions are taken or why the received mock-up could be improved 3 -> Perfect. Very reflective. Clearly explain"}, "main_difficulties_score": {"type": "integer", "description": "Criteria (0-3) 0 -> missing reflection 1 -> weak reflection. Only descriptive and procedural 2 -> ok reflection. Describes the process but also explains why some decisions are taken or why the received mock-up could be improved 3 -> Perfect. Very reflective. Clearly explain"}, "sustainability_feedback": {"type": "string", "description": "has the students reflected around the sustainability choises they have made in the project"},
        "sustainability_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}, "main_difficulties_feedback": {"type": "string", "description": "has the students explained the main difficuties using the mock up in a well writen and reflective manner"}, "main_difficulties_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}}}, "requirements": {"type": "object", "required": ["mobile_and_desktop_versions_score", "mobile_and_desktop_versions_feedback", "typefaces_score", "typefaces_feedback", "fixed_background_image_score", "fixed_background_image_feedback", "absolute_or_fixed_positioning_score", "absolute_or_fixed_positioning_feedback", "different_font_sizes_score", "different_font_sizes_feedback", "linear_gradient_score", "linear_gradient_feedback", "pseudo_classes_and_pseudo_elements_score", "pseudo_classes_and_pseudo_elements_feedback", "nth_child_score", "nth_child_feedback", "css_custom_emoticons_score", "css_custom_emoticons_feedback", "z_index_score", "z_index_feedback"], "properties": {"z_index_score": {"type": "integer", "description": "Criteria (0-1) 0 -> not fulfilled 1 -> fulfilled"}, "nth_child_score": {"type": "integer", "description": "Criteria (0-1) 0 -> not fulfilled 1 -> fulfilled"}, "typefaces_score": {"type": "integer", "description": "Criteria (0-1) 0 -> not fulfilled 1 -> fulfilled"},
         "z_index_feedback": {"type": "string", "description": "has the students used z-index in their CSS code"}, "z_index_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "nth_child_feedback": {"type": "string", "description": "has the students used nth_child pseudo class in their CSS"}, "typefaces_feedback": {"type": "string", "description": "Check if the group used two different typefaces for their project."}, "nth_child_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."},
         "typefaces_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "linear_gradient_score": {"type": "integer", "description": "Criteria (0-1) 0 -> not fulfilled 1 -> fulfilled"}, "linear_gradient_feedback": {"type": "string", "description": "Has the students used linear gradient in their CSS"}, "linear_gradient_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "css_custom_emoticons_score": {"type": "integer", "description": "Criteria (0-1) 0 -> not fulfilled 1 -> fulfilled"}, "different_font_sizes_score": {"type": "integer", "description": "Criteria (0-1) 0 -> not fulfilled 1 -> fulfilled"}, "fixed_background_image_score": {"type": "integer", "description": "Criteria (0-1) 0 -> not fulfilled 1 -> fulfilled"}, "css_custom_emoticons_feedback": {"type": "string", "description": "has the students used css to add custom emoticons for each of the prize categories"}, 
         "different_font_sizes_feedback": {"type": "string", "description": "has the students used different font sizes"}, "css_custom_emoticons_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "different_font_sizes_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."},
         "fixed_background_image_feedback": {"type": "string", "description": "Has the students set a background image on their page using bacground-attachement: fixed"}, "fixed_background_image_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "mobile_and_desktop_versions_score": {"type": "integer", "description": "Criteria (0-1) 0 -> not fulfilled 1 -> fulfilled"}, "absolute_or_fixed_positioning_score": {"type": "integer", "description": "Criteria (0-1) 0 -> not fulfilled 1 -> fulfilled"}, "mobile_and_desktop_versions_feedback": {"type": "string", "description": "Check if the group implemented mobile and desktop friendly layouts, one for larger screens and one for mobile screens using media queries"}, "mobile_and_desktop_versions_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "absolute_or_fixed_positioning_feedback": {"type": "string", "description": "Has the students used absolute og fixed positioning in their CSS"}, "absolute_or_fixed_positioning_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "pseudo_classes_and_pseudo_elements_score": {"type": "integer", "description": "Criteria (0-1) 0 -> not fulfilled 1 -> fulfilled"}, "pseudo_classes_and_pseudo_elements_feedback": {"type": "string", "description": "has the students used pseudo casses and elements"}, 
         "pseudo_classes_and_pseudo_elements_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}}}, "crucial_checks": {"type": "object", "required": ["validation_errors_score", "validation_errors_feedback", "positioning_problems_score", "positioning_problems_feedback"], "properties": {"validation_errors_score": {"type": "integer", "description": "Criteria (0-1) are there validation errors in the html or CSS code? any errors = 0 points, else 1 point"}, "positioning_problems_score": {"type": "integer", "description": "Positioning problems (0-1) (design) (elements overflowing parent, horizontal scroll, etc.). Flex/Grid, templates and Bootstrap are not allowed, if they are used, score = 0. "}, "validation_errors_feedback": {"type": "string", "description": "are there validation errors in the html or CSS code"}, "validation_errors_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "positioning_problems_feedback": {"type": "string", "description": "are there any positioning problems in the project"}, "positioning_problems_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}}}, "general_comments": {"type": "object", "required": ["semantic_structural_tags_score", "semantic_structural_tags_feedback", "project_structure_score", "project_structure_feedback", "bringing_css_and_html_together_score",
          "bringing_css_and_html_together_feedback", "CSS_optimization_score", "CSS_optimization_feedback", "code_readablilty_score", "code_readablilty_feedback", "user_readability_score", "user_readability_feedback", "seo_score", "seo_feedback", "naming_conventions_score", "naming_conventions_feedback", "design_score", "design_feedback"], "properties": {"seo_score": {"type": "integer", "description": "Criteria (0-1) All pages have a proper title (different per page and meaningful). Each page has a different short description. Also meaningful. Files and images have coherent names describing the contents. 0 -> not met 1 -> almost everything above met"}, 
         "design_score": {"type": "integer", "description": "Criteria (0-1) -> 0 or 1. Use objective facts. Elements well aligned, good spacing, coherent and consistent design (same headings among pages and colors, elements not overflowing parent container.)"}, "seo_feedback": {"type": "string", "description": "How well has the students implemented search engine optimization in their project"}, "seo_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "design_feedback": {"type": "string", "description": "How well has students implemented well aligned elements , good spacing, coherent and consistent design (same headings among pages and colors, elements not overflowing parent container.)"}, "design_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "CSS_optimization_score": {"type": "integer", "description": "Criteria (0-1) 0 -> hard to maintain CSS, 1 -> good CSS, grouping things together, reusing CSS rules, good naming conventions, etc."}, "code_readablilty_score": {"type": "integer", "description": "Criteria (0-1) 1 -> Very well structured code, easy to read. 0 -> otherwise."}, "user_readability_score": {"type": "integer", "description": "Criteria (0-1) 0 -> bad (spacing, margins, alignment, overlapping) 1 -> good or very good"}, "project_structure_score": {"type": "integer", "description": "Criteria (0-1) (read about page with reflection) 0 if wrong structure (overstructured and not well reasoned). 1 otherwise."},
          "naming_conventions_score": {"type": "integer", "description": "Criteria (0-1) The files are properly named. No capital letters, no spaces, use “-” to split words (but we accept “_”), names describe the content of the file (especially images), etc. 0 -> not met 1 -> most of the criteria above met"}, "CSS_optimization_feedback": {"type": "string", "description": "Are the student using well written optimized css?"}, "code_readablilty_feedback": {"type": "string", "description": "is the code well structured and easy to read?"},
          "user_readability_feedback": {"type": "string", "description": "How does well is the contents presented to the user "}, "CSS_optimization_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}, "code_readablilty_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "project_structure_feedback": {"type": "string", "description": "How well has the students structured the project files according to the assignment description "}, "user_readability_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "naming_conventions_feedback": {"type": "string", "description": "are the students using proper naming conventions?"}, "project_structure_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "naming_conventions_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "semantic_structural_tags_score": {"type": "integer", "description": "Criteria (0-1) 0 -> no semantic tags or not fulfilling requirements, 1 -> otherwise."}, "semantic_structural_tags_feedback": {"type": "string", "description": "how well has the students done proper use of semantic structural tags (including elements required in the description such as acronyms and abbreviations, nested lists, etc.). For example, breaking <p> with <br> is not a proper use."}, "semantic_structural_tags_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."},
           "bringing_css_and_html_together_score": {"type": "integer", "description": "Criteria (0-1) 0 -> no external 1 -> use external CSS (no inline or embedded). Embedded only under proper circumstances."}, "bringing_css_and_html_together_feedback": {"type": "string", "description": "Has the students implemented css in their html files according to the assignement description i.e. using external styles, not inline "}, "bringing_css_and_html_together_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}}}, 
          "AI_final_assessment": {"type": "object", "required": ["AI_final_comments"], "properties": {"AI_final_comments": {"type": "string", "description": "General comments about the submission as a whole. What was good, what was bad, what could be improved."}}}}}}'`;

// export default
export async function aggregateAssignmentFeedback(
    // assignmentDescription,
    // assignmentCriteria,
    newestStudentFeedback
) {
    const completion = await openai.chat.completions.create({
        model: process.env.AI_MODEL,
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
