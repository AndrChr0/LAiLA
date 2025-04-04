
import dotenv from "dotenv";

dotenv.config({ path: "../.env" }); // load shared env
dotenv.config(); // load server env

    import { GoogleGenAI, Type } from "@google/genai";

    const ai = new GoogleGenAI({ apiKey: process.env.GEM_API_KEY});

    const actualSchema = {
       
            "type": "object",
            "properties": {
                "reflections": {
                    "type": "object",
                    "required": [
                        "own_mockup_score",
                        "own_mockup_feedback",
                        "sustainability_score",
                        "sustainability_feedback",
                        "main_difficulties_score",
                        "main_difficulties_feedback"
                    ],
                    "properties": {
                        "own_mockup_score": {
                            "type": "integer",
                            "description": "Criteria (0-3) 0 -> missing reflection 1 -> weak reflection. Just making a statement and not explaining why 2 -> Good reflection. Explain why their mockup was good/not good. 3 -> Good reflection. Very reflective. Explain why their mockup was good/not good and show/explain ho"
                        },
                        "own_mockup_feedback": {
                            "type": "string",
                            "description": "to what degree has the student reflected around their own mock up "
                        },
                        "own_mockup_max_score": {
                            "type": "integer",
                            "description": "3"
                        },
                        "sustainability_score": {
                            "type": "integer",
                            "description": "Criteria (0-3) 0 -> missing reflection 1 -> weak reflection. Only descriptive and procedural 2 -> ok reflection. Describes the process but also explains why some decisions are taken or why the received mock-up could be improved 3 -> Perfect. Very reflective. Clearly explain"
                        },
                        "main_difficulties_score": {
                            "type": "integer",
                            "description": "Criteria (0-3) 0 -> missing reflection 1 -> weak reflection. Only descriptive and procedural 2 -> ok reflection. Describes the process but also explains why some decisions are taken or why the received mock-up could be improved 3 -> Perfect. Very reflective. Clearly explain"
                        },
                        "sustainability_feedback": {
                            "type": "string",
                            "description": "has the students reflected around the sustainability choises they have made in the project"
                        },
                        "sustainability_max_score": {
                            "type": "integer",
                            "description": "3"
                        },
                        "main_difficulties_feedback": {
                            "type": "string",
                            "description": "has the students explained the main difficuties using the mock up in a well writen and reflective manner"
                        },
                        "main_difficulties_max_score": {
                            "type": "integer",
                            "description": "3"
                        }
                    }
                },
                "requirements": {
                    "type": "object",
                    "required": [
                        "z_index_score",
                        "z_index_feedback",
                        "nth_child_score",
                        "nth_child_feedback",
                        "typefaces_score",
                        "typefaces_feedback",
                        "linear_gradient_score",
                        "linear_gradient_feedback",
                        "css_custom_emoticons_score",
                        "css_custom_emoticons_feedback",
                        "different_font_sizes_score",
                        "different_font_sizes_feedback",
                        "fixed_background_image_score",
                        "fixed_background_image_feedback",
                        "mobile_and_desktop_versions_score",
                        "mobile_and_desktop_versions_feedback",
                        "absolute_or_fixed_positioning_score",
                        "absolute_or_fixed_positioning_feedback",
                        "pseudo_classes_and_pseudo_elements_score",
                        "pseudo_classes_and_pseudo_elements_feedback"
                    ],
                    "properties": {
                        "z_index_score": {
                            "type": "integer",
                            "description": "Criteria (0-1) 0 -> not fulfilled 1 -> fulfilled"
                        },
                        "nth_child_score": {
                            "type": "integer",
                            "description": "Criteria (0-1) 0 -> not fulfilled 1 -> fulfilled"
                        },
                        "typefaces_score": {
                            "type": "integer",
                            "description": "Criteria (0-1) 0 -> not fulfilled 1 -> fulfilled"
                        },
                        "z_index_feedback": {
                            "type": "string",
                            "description": "has the students used z-index in their CSS code"
                        },
                        "z_index_max_score": {
                            "type": "integer",
                            "description": "3"
                        },
                        "nth_child_feedback": {
                            "type": "string",
                            "description": "has the students used nth_child pseudo class in their CSS"
                        },
                        "typefaces_feedback": {
                            "type": "string",
                            "description": "Check if the group used two different typefaces for their project."
                        },
                        "nth_child_max_score": {
                            "type": "integer",
                            "description": "3"
                        },
                        "typefaces_max_score": {
                            "type": "integer",
                            "description": "3"
                        },
                        "linear_gradient_score": {
                            "type": "integer",
                            "description": "Criteria (0-1) 0 -> not fulfilled 1 -> fulfilled"
                        },
                        "linear_gradient_feedback": {
                            "type": "string",
                            "description": "Has the students used linear gradient in their CSS"
                        },
                        "linear_gradient_max_score": {
                            "type": "integer",
                            "description": "3"
                        },
                        "css_custom_emoticons_score": {
                            "type": "integer",
                            "description": "Criteria (0-1) 0 -> not fulfilled 1 -> fulfilled"
                        },
                        "different_font_sizes_score": {
                            "type": "integer",
                            "description": "Criteria (0-1) 0 -> not fulfilled 1 -> fulfilled"
                        },
                        "fixed_background_image_score": {
                            "type": "integer",
                            "description": "Criteria (0-1) 0 -> not fulfilled 1 -> fulfilled"
                        },
                        "css_custom_emoticons_feedback": {
                            "type": "string",
                            "description": "has the students used css to add custom emoticons for each of the prize categories"
                        },
                        "different_font_sizes_feedback": {
                            "type": "string",
                            "description": "has the students used different font sizes"
                        },
                        "css_custom_emoticons_max_score": {
                            "type": "integer",
                            "description": "3"
                        },
                        "different_font_sizes_max_score": {
                            "type": "integer",
                            "description": "3"
                        },
                        "fixed_background_image_feedback": {
                            "type": "string",
                            "description": "Has the students set a background image on their page using bacground-attachement: fixed"
                        },
                        "fixed_background_image_max_score": {
                            "type": "integer",
                            "description": "3"
                        },
                        "mobile_and_desktop_versions_score": {
                            "type": "integer",
                            "description": "Criteria (0-1) 0 -> not fulfilled 1 -> fulfilled"
                        },
                        "absolute_or_fixed_positioning_score": {
                            "type": "integer",
                            "description": "Criteria (0-1) 0 -> not fulfilled 1 -> fulfilled"
                        },
                        "mobile_and_desktop_versions_feedback": {
                            "type": "string",
                            "description": "Check if the group implemented mobile and desktop friendly layouts, one for larger screens and one for mobile screens using media queries"
                        },
                        "mobile_and_desktop_versions_max_score": {
                            "type": "integer",
                            "description": "3"
                        },
                        "absolute_or_fixed_positioning_feedback": {
                            "type": "string",
                            "description": "Has the students used absolute og fixed positioning in their CSS"
                        },
                        "absolute_or_fixed_positioning_max_score": {
                            "type": "integer",
                            "description": "3"
                        },
                        "pseudo_classes_and_pseudo_elements_score": {
                            "type": "integer",
                            "description": "Criteria (0-1) 0 -> not fulfilled 1 -> fulfilled"
                        },
                        "pseudo_classes_and_pseudo_elements_feedback": {
                            "type": "string",
                            "description": "has the students used pseudo casses and elements"
                        },
                        "pseudo_classes_and_pseudo_elements_max_score": {
                            "type": "integer",
                            "description": "3"
                        }
                    }
                },
                "crucial_checks": {
                    "type": "object",
                    "required": [
                        "validation_errors_score",
                        "validation_errors_feedback",
                        "positioning_problems_score",
                        "positioning_problems_feedback"
                    ],
                    "properties": {
                        "validation_errors_score": {
                            "type": "integer",
                            "description": "Criteria (0-1) are there validation errors in the html or CSS code? any errors = 0 points, else 1 point"
                        },
                        "positioning_problems_score": {
                            "type": "integer",
                            "description": "Positioning problems (0-1) (design) (elements overflowing parent, horizontal scroll, etc.). Flex/Grid, templates and Bootstrap are not allowed, if they are used, score = 0. "
                        },
                        "validation_errors_feedback": {
                            "type": "string",
                            "description": "are there validation errors in the html or CSS code"
                        },
                        "validation_errors_max_score": {
                            "type": "integer",
                            "description": "3"
                        },
                        "positioning_problems_feedback": {
                            "type": "string",
                            "description": "are there any positioning problems in the project"
                        },
                        "positioning_problems_max_score": {
                            "type": "integer",
                            "description": "3"
                        }
                    }
                },
                "general_comments": {
                    "type": "object",
                    "required": [
                        "seo_score",
                        "seo_feedback",
                        "design_score",
                        "design_feedback",
                        "css_optimization_score",
                        "css_optimization_feedback",
                        "code_readablilty_score",
                        "code_readablilty_feedback",
                        "user_readability_score",
                        "user_readability_feedback",
                        "project_structure_score",
                        "project_structure_feedback",
                        "naming_conventions_score",
                        "naming_conventions_feedback",
                        "semantic_structural_tags_score",
                        "semantic_structural_tags_feedback",
                        "bringing_css_and_html_together_score",
                        "bringing_css_and_html_together_feedback"
                    ],
                    "properties": {
                        "seo_score": {
                            "type": "integer",
                            "description": "Criteria (0-1) All pages have a proper title (different per page and meaningful). Each page has a different short description. Also meaningful. Files and images have coherent names describing the contents. 0 -> not met 1 -> almost everything above met"
                        },
                        "design_score": {
                            "type": "integer",
                            "description": "Criteria (0-1) -> 0 or 1. Use objective facts. Elements well aligned, good spacing, coherent and consistent design (same headings among pages and colors, elements not overflowing parent container.)"
                        },
                        "seo_feedback": {
                            "type": "string",
                            "description": "How well has the students implemented search engine optimization in their project"
                        },
                        "seo_max_score": {
                            "type": "integer",
                            "description": "3"
                        },
                        "design_feedback": {
                            "type": "string",
                            "description": "How well has students implemented well aligned elements , good spacing, coherent and consistent design (same headings among pages and colors, elements not overflowing parent container.)"
                        },
                        "design_max_score": {
                            "type": "integer",
                            "description": "3"
                        },
                        "code_readablilty_score": {
                            "type": "integer",
                            "description": "Criteria (0-1) 1 -> Very well structured code, easy to read. 0 -> otherwise."
                        },
                        "css_optimization_score": {
                            "type": "integer",
                            "description": "Criteria (0-1) 0 -> hard to maintain CSS, 1 -> good CSS, grouping things together, reusing CSS rules, good naming conventions, etc."
                        },
                        "user_readability_score": {
                            "type": "integer",
                            "description": "Criteria (0-1) 0 -> bad (spacing, margins, alignment, overlapping) 1 -> good or very good"
                        },
                        "project_structure_score": {
                            "type": "integer",
                            "description": "Criteria (0-1) (read about page with reflection) 0 if wrong structure (overstructured and not well reasoned). 1 otherwise."
                        },
                        "naming_conventions_score": {
                            "type": "integer",
                            "description": "Criteria (0-1) The files are properly named. No capital letters, no spaces, use “-” to split words (but we accept “_”), names describe the content of the file (especially images), etc. 0 -> not met 1 -> most of the criteria above met"
                        },
                        "code_readablilty_feedback": {
                            "type": "string",
                            "description": "is the code well structured and easy to read?"
                        },
                        "css_optimization_feedback": {
                            "type": "string",
                            "description": "Are the student using well written optimized css?"
                        },
                        "user_readability_feedback": {
                            "type": "string",
                            "description": "How does well is the contents presented to the user "
                        },
                        "code_readablilty_max_score": {
                            "type": "integer",
                            "description": "3"
                        },
                        "css_optimization_max_score": {
                            "type": "integer",
                            "description": "3"
                        },
                        "project_structure_feedback": {
                            "type": "string",
                            "description": "How well has the students structured the project files according to the assignment description "
                        },
                        "user_readability_max_score": {
                            "type": "integer",
                            "description": "3"
                        },
                        "naming_conventions_feedback": {
                            "type": "string",
                            "description": "are the students using proper naming conventions?"
                        },
                        "project_structure_max_score": {
                            "type": "integer",
                            "description": "3"
                        },
                        "naming_conventions_max_score": {
                            "type": "integer",
                            "description": "3"
                        },
                        "semantic_structural_tags_score": {
                            "type": "integer",
                            "description": "Criteria (0-1) 0 -> no semantic tags or not fulfilling requirements, 1 -> otherwise."
                        },
                        "semantic_structural_tags_feedback": {
                            "type": "string",
                            "description": "how well has the students done proper use of semantic structural tags (including elements required in the description such as acronyms and abbreviations, nested lists, etc.). For example, breaking <p> with <br> is not a proper use."
                        },
                        "semantic_structural_tags_max_score": {
                            "type": "integer",
                            "description": "3"
                        },
                        "bringing_css_and_html_together_score": {
                            "type": "integer",
                            "description": "Criteria (0-1) 0 -> no external 1 -> use external CSS (no inline or embedded). Embedded only under proper circumstances."
                        },
                        "bringing_css_and_html_together_feedback": {
                            "type": "string",
                            "description": "Has the students implemented css in their html files according to the assignement description i.e. using external styles, not inline "
                        },
                        "bringing_css_and_html_together_max_score": {
                            "type": "integer",
                            "description": "3"
                        }
                    }
                },
                "AI_final_assessment": {
                    "type": "object",
                    "required": [
                        "AI_final_comments"
                    ],
                    "properties": {
                        "AI_final_comments": {
                            "type": "string",
                            "description": "Provide a detailed analysis of the submission with constructive feedback. Identify specific areas that need improvement, explain why they're problematic, and offer actionable suggestions for enhancement. While you may briefly acknowledge strengths if relevant, focus 80% of your response on constructive critique and specific recommendations for improvement."
                        }
                    }
                }
            }
        }
    
    
    

    export async function geminiAiTest(submission, criteria, description) {


        const submissionString = submission.join("");
        

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro-exp-03-25',
            contents: `You are a strict but fair code evaluator with high standards. 
                        Provide detailed, honest feedback that identifies even minor issues. 
                        Be precise about deductions - a single error should impact scores accordingly. 
                        Maintain a professional tone while being direct about shortcomings.
                        When aproppriate, refrence the code directly when providing feedback. 
                        Never inflate scores out of kindness; accuracy is your priority. 
                        Allways address the student directly and use second person pronouns.
                        Evaluate the following student submission according to the provided assessment criteria.

                   
                        You must return valid JSON with *exactly* the structure specified by the schema.
Include every required property, such as "AI_final_assessment" with a key "AI_final_comments".
Do not omit any required sections or fields.
Do not provide any text outside of the JSON.
                   
                        Allways address the student directly and use second person pronouns.  
                        Fill out the JSON object and return a response strictly in the given format. 
                   

        
                        Assessment Criteria: ${criteria} 
        
                        Assignment Description: ${description} 
        
                        Student Submission: ${submissionString}
                        
                        `,
            config: {
                responseMimeType: 'application/json',
                responseSchema: actualSchema,
            },
        });

        return response.text;
    }
