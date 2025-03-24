import dotenv from "dotenv";
dotenv.config();
import { pool as SQLpool } from "../utils/SQLPool.js";
const pool = SQLpool;

const hjælp = {
    "reflections":{
       "own_mockup_score":3,
       "own_mockup_feedback":"You provided a detailed reflection on your own mock-up. You explained that while you were generally satisfied with your design, you recognized areas that needed more specificity and clarity, such as container details and media query instructions.",
       "own_mockup_max_score":1,
       "sustainability_score":2,
       "main_difficulties_score":3,
       "sustainability_feedback":"Your sustainability reflection explains choices like using web‐safe fonts over heavier custom fonts and compressing images to lower carbon footprint. However, including quantitative data or more specific statistics would have made your reflection even stronger.",
       "sustainability_max_score":3,
       "main_difficulties_feedback":"You provided a comprehensive discussion of the difficulties encountered, such as missing mock-up instructions, challenges with the navigation exit button, and adjustments needed for positioning. Your explanation was clear and reflective.",
       "main_difficulties_max_score":3
    },
    "requirements":{
       "z_index_score":1,
       "nth_child_score":1,
       "typefaces_score":1,
       "z_index_feedback":"You correctly used z-index properties (e.g., in body, main, and dropdown content) to manage layering.",
       "z_index_max_score":1,
       "nth_child_feedback":"You effectively applied the nth-child pseudo-class to insert custom emoticons in your list items.",
       "typefaces_feedback":"You used two distinct typefaces: a custom font (AvenirNext) and system fonts (Helvetica/Arial), satisfying the requirement.",
       "nth_child_max_score":1,
       "typefaces_max_score":1,
       "linear_gradient_score":1,
       "linear_gradient_feedback":"A linear gradient is applied to container backgrounds, which meets the assignment criteria.",
       "linear_gradient_max_score":1,
       "css_custom_emoticons_score":1,
       "different_font_sizes_score":1,
       "fixed_background_image_score":1,
       "css_custom_emoticons_feedback":"Custom emoticons are implemented using CSS pseudo-elements on list items.",
       "different_font_sizes_feedback":"Different font sizes are utilized appropriately between headings and body text to enhance readability.",
       "css_custom_emoticons_max_score":1,
       "different_font_sizes_max_score":1,
       "fixed_background_image_feedback":"You set up a background image with a fixed attachment for the main element, fulfilling the requirement.",
       "fixed_background_image_max_score":1,
       "mobile_and_desktop_versions_score":1,
       "absolute_or_fixed_positioning_score":1,
       "mobile_and_desktop_versions_feedback":"Responsive design is achieved through media queries that adapt the layout for desktop and mobile screens.",
       "mobile_and_desktop_versions_max_score":1,
       "absolute_or_fixed_positioning_feedback":"Usage of absolute and fixed positioning (e.g., in the navigation and social sections) is coherent and meets the assignment requirements.",
       "absolute_or_fixed_positioning_max_score":1,
       "pseudo_classes_and_pseudo_elements_score":1,
       "pseudo_classes_and_pseudo_elements_feedback":"You have utilized pseudo-classes and pseudo-elements effectively, as seen in hover effects and nth-child selectors.",
       "pseudo_classes_and_pseudo_elements_max_score":1
    },
    "crucial_checks":{
       "validation_errors_score":1,
       "positioning_problems_score":1,
       "validation_errors_feedback":"The submitted HTML and CSS code appears to be free of validation errors.",
       "validation_errors_max_score":1,
       "positioning_problems_feedback":"No positioning problems like overflowing elements or horizontal scroll issues were detected in your layout.",
       "positioning_problems_max_score":1
    },
    "general_comments":{
       "seo_score":1,
       "design_score":1,
       "seo_feedback":"While you have included titles and basic metadata, more descriptive, unique page titles and meta descriptions could improve SEO.",
       "seo_max_score":1,
       "design_feedback":"Your design is coherent and consistent. Elements are well aligned, spacing is adequate, and the overall layout is user-friendly across devices.",
       "design_max_score":1,
       "CSS_optimization_score":1,
       "code_readablilty_score":1,
       "user_readability_score":1,
       "project_structure_score":1,
       "naming_conventions_score":1,
       "CSS_optimization_feedback":"Your CSS is neatly organized, with grouped rules and consistent naming conventions, facilitating maintenance.",
       "code_readablilty_feedback":"The code is structured and easy to follow, which demonstrates good coding practices.",
       "user_readability_feedback":"Content presentation is clear, and the use of semantic HTML elements enhances user readability.",
       "CSS_optimization_max_score":3,
       "code_readablilty_max_score":1,
       "project_structure_feedback":"The project has a proper structure with separate pages, external CSS, and a clear folder organization as required.",
       "user_readability_max_score":1,
       "naming_conventions_feedback":"File and folder names follow proper naming conventions, making the project easy to navigate.",
       "project_structure_max_score":1,
       "naming_conventions_max_score":1,
       "semantic_structural_tags_score":1,
       "semantic_structural_tags_feedback":"Semantic HTML tags such as header, nav, main, article, and footer have been used correctly.",
       "semantic_structural_tags_max_score":1,
       "bringing_css_and_html_together_score":1,
       "bringing_css_and_html_together_feedback":"CSS is implemented externally and integrated properly with the HTML, in line with the assignment guidelines.",
       "bringing_css_and_html_together_max_score":1
    },
    "AI_final_assessment":{
       "AI_final_comments":"Overall, your submission is solid and meets the bulk of the assignment requirements. Your implementation of responsive design, semantic HTML, and advanced CSS techniques such as pseudo-classes, gradients, and fixed backgrounds is commendable. The reflections are insightful, especially regarding the challenges posed by the mock-up and your sustainability considerations. Moving forward, enhancing your SEO elements and adding more quantitative details to your sustainability discussion could further improve your work. Keep up the good work!"
    }
}

// get all
// for lecturers
export async function getAssignmentAssessments(req, res, next) {
    try {
        const [rows] = await pool.query(`
            SELECT
                fa.assessment_id,
                CONCAT(u.first_name, ' ', u.last_name) AS student_name,
                fa.assignment_id,
                fa.assessment_contents,
                fa.assessment_result,
                fa.is_reviewed,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'file_contents', sw.file_contents,
                        'filetype', sw.filetype,
                        'filepath', sw.filepath
                    )
                ) AS student_work
            FROM final_assessments fa
            JOIN users u ON fa.student_id = u.user_id
            LEFT JOIN student_work sw ON fa.assessment_id = sw.assessment_id
            WHERE assignment_id = ?
            GROUP BY fa.assessment_id;
            `, [req.params.assignment_id]
        );

        if (rows.length == 0) {
            throw Object.assign(new Error("No assessments found"), { status: 404 });
        }

        return res.status(200).json(rows);
    } catch (error) {
        next(error);
    }
}
// for students
export async function getMyAssessments(req, res, next) {
    try {
        const [rows] = await pool.query(`
            SELECT
                fa.assessment_id,
                CONCAT(u.first_name, ' ', u.last_name) AS student_name,
                fa.assignment_id,
                fa.assessment_contents,
                fa.assessment_result,
                fa.is_reviewed,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'file_contents', sw.file_contents,
                        'filetype', sw.filetype,
                        'filepath', sw.filepath
                    )
                ) AS student_work
            FROM final_assessments fa
            JOIN users u ON fa.student_id = u.user_id
            LEFT JOIN student_work sw ON fa.assessment_id = sw.assessment_id
            WHERE student_id = ?
            GROUP BY fa.assessment_id;
            `, [req.query.id]
        );

        if (rows.length == 0) {
            throw Object.assign(new Error("No assessments found"), { status: 404 });
        }

        const geef = {};

        return res.status(200).json(rows);
    } catch (error) {
        next(error);
    }
}

// get one
export async function getOneAssessment(req, res, next) {
    try {
        const [rows] = await pool.query(`
            SELECT
                fa.assessment_id,
                CONCAT(u.first_name, ' ', u.last_name) AS student_name,
                fa.assignment_id,
                fa.assessment_contents,
                fa.assessment_result,
                fa.is_reviewed,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'file_contents', sw.file_contents,
                        'filetype', sw.filetype,
                        'filepath', sw.filepath
                    )
                ) AS student_work
            FROM final_assessments fa
            JOIN users u ON fa.student_id = u.user_id
            LEFT JOIN student_work sw ON fa.assessment_id = sw.assessment_id
            WHERE fa.assessment_id = ?
            GROUP BY fa.assessment_id;
            `, [req.params.assessment_id]
        );

        if (rows.length == 0) {
            throw Object.assign(new Error("Assessment not found"), { status: 404 });
        }

        return res.status(200).json(rows);
    } catch (error) {
        next(error);
    }
}

// post / patch - auth(S)?
export async function createAssessment(req, res, next) {
    try {
        // assignment_id + student_id
        const [result] = await pool.query(`
            INSERT INTO final_assessments ()
            VALUES ()
            `, []
        );

        const assessmentID = result.insertId;

        // deal with file uploads

        return res.status(200).json("Successfully stored information");
    } catch (error) {
        next(error);
    }
}

// patch - auth(L)
export async function evaluateAssessment(req, res, next) {
    try {
        // code
    } catch (error) {
        next(error);
    }
}
