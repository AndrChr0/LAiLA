CREATE DATABASE ai_tutor_db;
USE ai_tutor_db;

CREATE TABLE users (
    user_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    role ENUM('student', 'lecturer') NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE courses (
    course_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    course_code VARCHAR(50) NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    course_description VARCHAR(5000) NOT NULL,
    course_link VARCHAR(255) NOT NULL,
    course_coordinator SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (course_id),
    FOREIGN KEY (course_coordinator) REFERENCES users(user_id)
);

CREATE TABLE enrollment (
    student_id SMALLINT UNSIGNED NOT NULL,
    course_id SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES users(user_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

CREATE TABLE assignments (
    assignment_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    assignment_title VARCHAR(255) NOT NULL,
    assignment_start_date DATE NOT NULL,
    assignment_end_date DATE NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT FALSE,
    is_public BOOLEAN NOT NULL DEFAULT FALSE,
    assignment_description TEXT NOT NULL,
    assignment_criteria JSON NOT NULL,
    course_id SMALLINT UNSIGNED NOT NULL,
    max_score TINYINT UNSIGNED NOT NULL,
    pass_threshold DECIMAL(3,2) NOT NULL CHECK (pass_threshold >= 0.00 AND pass_threshold <= 1.00),
    assignment_attempts TINYINT UNSIGNED NOT NULL CHECK (assignment_attempts > 0 AND assignment_attempts <= 5),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (assignment_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

CREATE TABLE assignment_filetypes (
    assignment_id SMALLINT UNSIGNED NOT NULL,
    filetype VARCHAR(16),
    PRIMARY KEY (assignment_id, filetype),
    FOREIGN KEY (assignment_id) REFERENCES assignments(assignment_id)
);

CREATE TABLE feedback (
    feedback_id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    assignment_id SMALLINT UNSIGNED NOT NULL,
    student_id SMALLINT UNSIGNED NOT NULL,
    feedback_contents JSON NOT NULL,
    general_comment TEXT NOT NULL,
    suggested_result ENUM('pass', 'fail') NOT NULL,
    attempt_nr TINYINT UNSIGNED NOT NULL,
    PRIMARY KEY (feedback_id),
    FOREIGN KEY (assignment_id) REFERENCES assignments(assignment_id),
    FOREIGN KEY (student_id) REFERENCES users(user_id)
);

INSERT INTO users (first_name, last_name, role, email, password) VALUES
('Ola', 'Nsk', 'student', 'olansk@ntnu', '$2b$10$72WZIieimJ17Kmtfo50FXuAbFDybh.fwrbQhsCKwEevrdpxGrrjXS'),
('Chris', 'NG', 'student', 'chrisng@ntnu', '$2b$10$72WZIieimJ17Kmtfo50FXuAbFDybh.fwrbQhsCKwEevrdpxGrrjXS'),
('Andy', 'Chr', 'student', 'andychr@ntnu', '$2b$10$72WZIieimJ17Kmtfo50FXuAbFDybh.fwrbQhsCKwEevrdpxGrrjXS'),
('Car', 'Loss', 'lecturer', 'carlos@ntnu', '$2b$10$72WZIieimJ17Kmtfo50FXuAbFDybh.fwrbQhsCKwEevrdpxGrrjXS'),
('Left', 'Y', 'lecturer', 'elefths@ntnu', '$2b$10$72WZIieimJ17Kmtfo50FXuAbFDybh.fwrbQhsCKwEevrdpxGrrjXS'),
('Terje', 'Script', 'lecturer', 'tjts@ntnu', '$2b$10$72WZIieimJ17Kmtfo50FXuAbFDybh.fwrbQhsCKwEevrdpxGrrjXS'),
('Luvin', 'Ragoo', 'lecturer', 'mrragoo@ntnu', '$2b$10$72WZIieimJ17Kmtfo50FXuAbFDybh.fwrbQhsCKwEevrdpxGrrjXS'),
('Nipuna', 'Wee', 'lecturer', 'wutang@ntnu', '$2b$10$72WZIieimJ17Kmtfo50FXuAbFDybh.fwrbQhsCKwEevrdpxGrrjXS'),
('Emil', 'Bakk', 'lecturer', 'emba@ntnu', '$2b$10$72WZIieimJ17Kmtfo50FXuAbFDybh.fwrbQhsCKwEevrdpxGrrjXS'),
('Paul', 'Knut', 'lecturer', 'apku@ntnu', '$2b$10$72WZIieimJ17Kmtfo50FXuAbFDybh.fwrbQhsCKwEevrdpxGrrjXS');

INSERT INTO courses (course_code, course_name, course_description, course_link, course_coordinator) VALUES
('IDG1292', 'Webcoding', 'lorem ipsum', 'https://www.ntnu.edu/studies/courses/IDG1292', 4),
('IDG3101', 'In Debt', 'lorem ipsum', 'https://www.ntnu.edu/studies/courses/IDG3101', 6),
('IDG2004', 'Info & DB', 'lorem ipsum', 'https://www.ntnu.edu/studies/courses/IDG2004', 7),
('IDG1362', 'UCD', 'lorem ipsum', 'https://www.ntnu.edu/studies/courses/IDG1362', 5),
('IDG2003', 'Backend', 'lorem ipsum', 'https://www.ntnu.edu/studies/courses/IDG2003', 8),
('IDG2100', 'Fullstack', 'lorem ipsum', 'https://www.ntnu.edu/studies/courses/IDG2100', 4),
('IDG2009', 'Comms', 'lorem ipsum', 'https://www.ntnu.edu/studies/courses/IDG2009', 9),
('IDG3006', 'WoT', 'lorem ipsum', 'https://www.ntnu.edu/studies/courses/IDG3006', 5),
('IDG2001', 'Cloud', 'lorem ipsum', 'https://www.ntnu.edu/studies/courses/IDG2001', 10);

INSERT INTO enrollment (student_id, course_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 6),
(2, 1), (2, 4), (2, 5), (2, 6),
(3, 1), (3, 7), (3, 8), (3, 9);

INSERT INTO assignments (assignment_title, assignment_start_date, assignment_end_date, is_active, is_public, assignment_description, assignment_criteria, course_id, max_score, pass_threshold, assignment_attempts) VALUES
('Oblig1', '2025-01-27', '2025-02-13', FALSE, TRUE, 'Oblig#1
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
   b) find a buddy so you can look through each other\'s code and give feedback.
   
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
   • You can emphasise your strengths by driving the user\'s attention to remarkable
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
   
   Good luck!', '{"name": "idg1292_oblig1", "schema": {"type": "object", "properties": {"about": {"type": "object", "required": ["reflection_score", "reflection_feedback"], "properties": {"reflection_score": {"type": "integer", "description": "Criteria (0-3) 0 -> most of the requirements not met, 1 -> few requirements met, 2 -> most of the requirements met, 3 -> all requirements met (sketch is expected)."}, "reflection_feedback": {"type": "string", "description": "Feedback on reflection level of process and preperation"}, "reflection_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}}}, "home_page": {"type": "object", "required": ["content_requirements_score", "content_requirements_feedback", "proper_html_tags_score", "proper_html_tags_feedback"], "properties": {"proper_html_tags_score": {"type": "integer", "description": "Criteria (0-3) 0 -> bad, validation errors, etc. 1 -> somewhat ok but with many improvements 2 -> good in general but some extra semantic tags could be used (maybe other semantic tags would be better) 3 -> perfect."}, "proper_html_tags_feedback": {"type": "string", "description": "Feedback on semantic HTML usage"}, "content_requirements_score": {"type": "integer", "description": "Criteria (0-3) 0 -> most of the requirements not met, 1 -> few requirements met, 2 -> most of the requirements met, 3 -> all requirements met."}, "proper_html_tags_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}, "content_requirements_feedback": {"type": "string", "description": "Fullfils the following requirements: Image and description about you, Text introducing yourself, List of hobbies, A quotation from a book, song, or movie."}, "content_requirements_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}}}, "portfolio": {"type": "object", "required": ["projects_score", "projects_feedback", "proper_html_tags_score", "proper_html_tags_feedback"], "properties": {"projects_score": {"type": "integer", "description": "Criteria (0-3) 0 -> most of the requirements not met, 1 -> few requirements met, 2 -> most of the requirements met, 3 -> all requirements met."}, "projects_feedback": {"type": "string", "description": "Feedback on project descriptions. There should be three projects with title, short description, and image."}, "projects_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}, "proper_html_tags_score": {"type": "integer", "description": "Criteria (0-3) 0 -> bad, validation errors, etc. 1 -> very improvable 2 -> ok with very few improvements (maybe other semantic tags would be better) 3 -> perfect."}, "proper_html_tags_feedback": {"type": "string", "description": "Score for proper HTML usage"}, "proper_html_tags_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}}}, "navigation": {"type": "object", "required": ["navigation_menu_score", "navigation_menu_feedback", "proper_html_tags_score", "proper_html_tags_feedback"], "properties": {"navigation_menu_score": {"type": "integer", "description": "The page has a navigation menu and it is easy to navigate (all pages) 0 -> no navigation menu or not all pages linked, 1 -> navigation menu but not all pages, 2 -> Yes but some improvements (UX, target!=blank, etc.), 3 -> Perfect"}, "proper_html_tags_score": {"type": "integer", "description": "Criteria (0-3) 0 -> bad, validation errors, etc. 1 -> somewhat ok but with many improvements 2 -> good in general but some extra semantic tags could be used (maybe other semantic tags would be better) 3 -> perfect."}, "navigation_menu_feedback": {"type": "string", "description": "Feedback on the navigation menu and ease of navigation"}, "navigation_menu_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}, "proper_html_tags_feedback": {"type": "string", "description": "Feedback on HTML tag usage"}, "proper_html_tags_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}}}, "resume_page": {"type": "object", "required": ["content_requirements_score", "content_requirements_feedback", "proper_html_tags_score", "proper_html_tags_feedback"], "properties": {"proper_html_tags_score": {"type": "integer", "description": "Criteria (0-3) 0 -> bad, validation errors, etc. 1 -> very improvable 2 -> ok with very few improvements (maybe other semantic tags would be better) 3 -> perfect."}, "proper_html_tags_feedback": {"type": "string", "description": "Feedback on semantic HTML usage"}, "content_requirements_score": {"type": "integer", "description": "Criteria (0-3) 0 -> most of the requirements not met, 1 -> few requirements met, 2 -> most of the requirements met, 3 -> all requirements met."}, "proper_html_tags_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}, "content_requirements_feedback": {"type": "string", "description": "Feedback on to what degree the following requirements is fulfilled: Academic background, Work experience, List of languages you speak, List of skills."}, "content_requirements_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}}}, "contact_page": {"type": "object", "required": ["content_requirements_score", "content_requirements_feedback", "proper_html_tags_score", "proper_html_tags_feedback"], "properties": {"proper_html_tags_score": {"type": "integer", "description": "Criteria (0-3) 0 -> bad, validation errors, etc. 1 -> very improvable 2 -> ok with very few improvements (maybe other semantic tags would be better) 3 -> perfect."}, "proper_html_tags_feedback": {"type": "string", "description": "Score for correct HTML elements"}, "content_requirements_score": {"type": "integer", "description": "Criteria (0-3) 0 -> most of the requirements not met, 1 -> few requirements met, 2 -> most of the requirements met, 3 -> all requirements met."}, "proper_html_tags_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}, "content_requirements_feedback": {"type": "string", "description": "Show all your contact information as well as links to your social websites (e.g.: Facebook, Twitter, LinkedIn, Instagram, etc.). You must include at least 3 different social networks. The links must work properly. However, you don’t need to link them to your real social networks if you don’t want to do so. A link to the main page of the social platform would suffice. Do not forget to include an email address and phone number."}, "content_requirements_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}}}, "general_comments": {"type": "object", "required": ["use_of_semantic_structural_tags_score", "use_of_semantic_structural_tags_feedback", "project_structure_score", "project_structure_feedback", "brringing_css_and_html_together_score", "brringing_css_and_html_together_feedback", "css_optimization_score", "css_optimization_feedback", "code_readability_score", "code_readability_feedback", "user_readability_score", "user_readability_feedback", "seo_score", "seo_feedback", "naming_conventions_score", "naming_conventions_feedback", "design_score", "design_feedback"], "properties": {"seo_score": {"type": "integer", "description": "Criteria (0-1) All pages have a proper title (different per page and meaningful). Each page has a different short description, also meaningful. Files and images have coherent names describing the contents. 0 -> not met 1 -> almost everything above met."}, "design_score": {"type": "integer", "description": "Criteria (0-1) -> 0 or 1. Use objective facts. Elements well aligned, good spacing, coherent and consistent design (same headings among pages and colors, elements not overflowing parent container)."}, "seo_feedback": {"type": "string", "description": "Feedback on SEO"}, "seo_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}, "design_feedback": {"type": "string", "description": "Feedback on design"}, "design_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}, "code_readability_score": {"type": "integer", "description": "Criteria (0-1) 1 -> Very well structured code, easy to read 0-> otherwise"}, "css_optimization_score": {"type": "integer", "description": "Criteria (0-1) 0 -> hard to maintain CSS, 1 -> good css, grouping things together, reusing CSS rules, good naming conventions, etc."}, "user_readability_score": {"type": "integer", "description": "Criteria (0-1) 0 -> bad (spacing, margins, alignment, overlapping) 1 -> good or very good"}, "project_structure_score": {"type": "integer", "description": "Criteria (0-1) (read about page with reflection) 0 if wrong structure (overstructured and not well reasoned). 1 otherwise."}, "naming_conventions_score": {"type": "integer", "description": "Criteria (0-1) The files are properly named. No capital letters, no spaces, use '-' to split words (but we accept '_'), names describe the content of the file (especially images), etc. 0 -> not met 1 -> most of the criteria above met."}, "code_readability_feedback": {"type": "string", "description": "Feedback on code readability"}, "css_optimization_feedback": {"type": "string", "description": "Feedback on CSS optimization"}, "user_readability_feedback": {"type": "string", "description": "Feedback on user readability"}, "code_readability_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}, "css_optimization_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}, "project_structure_feedback": {"type": "string", "description": "Feedback on project structure"}, "user_readability_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}, "naming_conventions_feedback": {"type": "string", "description": "Feedback on naming conventions"}, "project_structure_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}, "naming_conventions_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}, "brringing_css_and_html_together_score": {"type": "integer", "description": "Criteria (0-1) 0 -> no external 1 -> use external CSS(no inline or embedded). Embed only under proper circumstances."}, "use_of_semantic_structural_tags_score": {"type": "integer", "description": "Criteria (0-1) 0 -> no semantic tags or not fullfilling requirements, 1 -> otherwise"}, "brringing_css_and_html_together_feedback": {"type": "string", "description": "Feedback on bringing CSS and HTML together"}, "use_of_semantic_structural_tags_feedback": {"type": "string", "description": "Feedback on the use of semantic and structural tags"}, "brringing_css_and_html_together_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}, "use_of_semantic_structural_tags_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}}}, "AI_final_assessment": {"type": "object", "required": ["AI_final_comments"], "properties": {"AI_final_comments": {"type": "string", "description": "General comments about the submission as a whole. What was good, what was bad, what could be improved."}}}}}}', 1, 120, 0.80, 1),
('Oblig 2', '2025-02-20', '2025-03-09', TRUE, TRUE, 'lorem ipsum', '{}', 1, 53, 0.75, 5),
('Assignment #3', '2025-01-10', '2025-02-28', TRUE, TRUE, 'lorem ipsum', '{}', 3, 68, 0.70, 2),
('Obligatory assignment 2', '2025-01-12', '2025-02-12', FALSE, TRUE, 'lorem ipsum', '{}', 4, 50, 0.50, 3),
('Oblig 1 - Web component', '2025-02-26', '2025-03-30', TRUE, TRUE, 'lorem ipsum', '{}', 6, 69, 0.42, 3),
('Assignment 1', '2025-01-10', '2025-04-10', TRUE, TRUE, 'lorem ipsum', '{}', 9, 24, 0.50, 3);

INSERT INTO assignment_filetypes (assignment_id, filetype) VALUES
(1, '.css'),
(1, '.html'),
(2, '.css'),
(2, '.html'),
(3, '.css'),
(3, '.html'),
(3, '.js'),
(4, '.css'),
(4, '.html'),
(5, '.css'),
(5, '.html'),
(6, '.css'),
(6, '.html');

INSERT INTO feedback (assignment_id, student_id, feedback_contents, general_comment, suggested_result, attempt_nr) VALUES
(1, 1, '{"general_comments": {
        "use_of_semantic_structural_tags_score": 1,
        "use_of_semantic_structural_tags_feedback": "Semantic tags are extensively used throughout the project where applicable.",
        "project_structure_score": 1,
        "project_structure_feedback": "Project structure is well-reasoned and appropriately organized given the project size.",
        "bringing_css_and_html_together_score": 1,
        "bringing_css_and_html_together_feedback": "CSS is appropriately external with no inline styles, adhering to best practices for separation of concerns.",
        "css_optimization_score": 1,
        "css_optimization_feedback": "CSS is well-organized, with consistent naming conventions and rule reuse where applicable.",
        "code_readability_score": 1,
        "code_readability_feedback": "The code is structured clearly, making reading and understanding straightforward.",
        "user_readability_score": 1,
        "user_readability_feedback": "Excellent spacing, margins, and alignment make for a highly readable user interface.",
        "seo_score": 1,
        "seo_feedback": "All pages have unique, descriptive titles and content descriptions, and images are named descriptively.",
        "naming_conventions_score": 1,
        "naming_conventions_feedback": "Files and folders use appropriate naming conventions, with no spaces or capitals and meaningful names.",
        "design_score": 1,
        "design_feedback": "The design is coherent, with consistent elements across pages and proper alignment and spacing."
    },
    "final_assessments": {
        "validation_errors_check": "No validation errors detected in the HTML or CSS code.",
        "positioning_errors_check": "All elements are well-aligned with no overflow issues. Spacing is consistently applied.",
        "final_comments": "The student submission displays a high level of competence in web design fundamentals. Each requirement was clearly addressed and executed with attention to detail. Semantic HTML usage is strong, the site is well-structured, and the styles are coherent. There are no critical issues, and the project effectively meets the assignment criteria."
    }}', 'The student submission displays a high level of competence in web design fundamentals. Each requirement was clearly addressed and executed with attention to detail. Semantic HTML usage is strong, the site is well-structured, and the styles are coherent. There are no critical issues, and the project effectively meets the assignment criteria.', 'pass', 1),
(6, 3, '{}', 'Please improve.', 'fail', 1),
(4, 2, '{}', 'I can see only a few trees in your group CodePen.', 'fail', 1),
(6, 3, '{}', 'One of the best work done.', 'pass', 2),
(6, 3, '{}', 'It is illegal to sell guns in Norway.', 'fail', 3),
(2, 1, '{}', 'I will forward this concern further to your study program leaders.', 'fail', 1),
(4, 2, '{}', 'If you have questions regarding the feedback, please take contact.', 'fail', 2),
(3, 1, '{}', 'Several potential issues and areas for improvement.', 'fail', 1),
(3, 1, '{}', 'Good job!', 'fail', 2),
(5, 2, '{}', 'Good acknowledgements and judgements in your reflection.', 'pass', 1);
