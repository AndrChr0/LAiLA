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
    filetype VARCHAR(16) NOT NULL,
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

CREATE TABLE assignment_reports (
    report_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    assignment_id SMALLINT UNSIGNED NOT NULL,
    report_nr TINYINT UNSIGNED NOT NULL,
    report_contents JSON NOT NULL,
    students_passed SMALLINT UNSIGNED NOT NULL,
    students_failed SMALLINT UNSIGNED NOT NULL,
    total_feedback SMALLINT UNSIGNED NOT NULL,
    students_evaluated SMALLINT UNSIGNED NOT NULL,
    isManuallyCreated BOOLEAN NOT NULL DEFAULT FALSE,
    date_created DATETIME,
    PRIMARY KEY (report_id),
    FOREIGN KEY (assignment_id) REFERENCES assignments(assignment_id)
);

CREATE TABLE final_assessments (
    assessment_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    student_id SMALLINT UNSIGNED,
    assignment_id SMALLINT UNSIGNED,
    submission_date DATETIME NOT NULL, 
    assessment_contents JSON NOT NULL,
    assessment_result ENUM('pass', 'fail') NOT NULL,
    is_reviewed BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (assessment_id),
    FOREIGN KEY (student_id) REFERENCES users(user_id),
    FOREIGN KEY (assignment_id) REFERENCES assignments(assignment_id)
);

CREATE TABLE student_work (
    student_work_id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    assessment_id SMALLINT UNSIGNED,
    file_contents TEXT NOT NULL,
    filetype VARCHAR(16) NOT NULL,
    filepath VARCHAR(255) NOT NULL,
    PRIMARY KEY (student_work_id),
    FOREIGN KEY (assessment_id) REFERENCES final_assessments(assessment_id)
);


INSERT INTO users (first_name, last_name, role, email, password) VALUES
('Ola', 'Nsk', 'student', 'olansk@ntnu', '$2b$10$72WZIieimJ17Kmtfo50FXuAbFDybh.fwrbQhsCKwEevrdpxGrrjXS'),
('Chris', 'NG', 'student', 'chrisng@ntnu', '$2b$10$72WZIieimJ17Kmtfo50FXuAbFDybh.fwrbQhsCKwEevrdpxGrrjXS'),
('Andy', 'Chr', 'student', 'andychr@ntnu', '$2b$10$72WZIieimJ17Kmtfo50FXuAbFDybh.fwrbQhsCKwEevrdpxGrrjXS'),
('Carlos', 'Monllao', 'lecturer', 'carlos@ntnu', '$2b$10$72WZIieimJ17Kmtfo50FXuAbFDybh.fwrbQhsCKwEevrdpxGrrjXS'),
('test', 'one', 'student', 'test@one', '$2b$10$72WZIieimJ17Kmtfo50FXuAbFDybh.fwrbQhsCKwEevrdpxGrrjXS'),
('test', 'two', 'student', 'test@two', '$2b$10$72WZIieimJ17Kmtfo50FXuAbFDybh.fwrbQhsCKwEevrdpxGrrjXS'),
('test', 'three', 'student', 'test@three', '$2b$10$72WZIieimJ17Kmtfo50FXuAbFDybh.fwrbQhsCKwEevrdpxGrrjXS'),
('test', 'four', 'student', 'test@four', '$2b$10$72WZIieimJ17Kmtfo50FXuAbFDybh.fwrbQhsCKwEevrdpxGrrjXS'),
('test', 'five', 'student', 'test@five', '$2b$10$72WZIieimJ17Kmtfo50FXuAbFDybh.fwrbQhsCKwEevrdpxGrrjXS'),
('test', 'six', 'student', 'test@six', '$2b$10$72WZIieimJ17Kmtfo50FXuAbFDybh.fwrbQhsCKwEevrdpxGrrjXS'),
('test', 'seven', 'student', 'test@seven', '$2b$10$72WZIieimJ17Kmtfo50FXuAbFDybh.fwrbQhsCKwEevrdpxGrrjXS'),
('test', 'eight', 'student', 'test@eight', '$2b$10$72WZIieimJ17Kmtfo50FXuAbFDybh.fwrbQhsCKwEevrdpxGrrjXS'),
('test', 'nine', 'student', 'test@nine', '$2b$10$72WZIieimJ17Kmtfo50FXuAbFDybh.fwrbQhsCKwEevrdpxGrrjXS'),
('test', 'ten', 'student', 'test@ten', '$2b$10$72WZIieimJ17Kmtfo50FXuAbFDybh.fwrbQhsCKwEevrdpxGrrjXS');


INSERT INTO courses (course_code, course_name, course_description, course_link, course_coordinator) VALUES
('IDG1292', 'Webcoding', 'lorem ipsum', 'https://www.ntnu.edu/studies/courses/IDG1292', 4);

INSERT INTO enrollment (student_id, course_id) VALUES
(1,1),
(2,1),
(3,1),
(5,1),
(6,1),
(7,1),
(8,1),
(9,1),
(10,1),
(11,1),
(12,1),
(13,1),
(14,1);

INSERT INTO assignments (assignment_title, assignment_start_date, assignment_end_date, is_active, is_public, assignment_description, assignment_criteria, course_id, max_score, pass_threshold, assignment_attempts) VALUES
(
    'Oblig1',
    '2025-01-27',
    '2025-02-13',
    FALSE,
    TRUE,
    "Oblig#1\nWrite your personal page\nDue date: check Blackboard\nIDG1292-FALL2022\nTable of Contents\nPreface ....................................................................................................... 3\nContext ...................................................................................................... 4\nTask description ........................................................................................ 5\nRequired .................................................................................................... 7\nTips ........................................................................................................... 9\nOther resources.........................................................................................10\nDeliverables ..............................................................................................11\n\nPreface\nThis document describes the first compulsory task (oblig#1) of the course. The focus of the task is to create a coherent HTML structure and reflect on the choices taken during the design and implementation phases. CSS is allowed and you are encouraged to use anything learnt between lectures 1 to 5.\n\nThese are all rather simple tasks. So, we expect you to deliver with high quality. The best thing you can do for quality assurance is to:\na) validate all your HTML and CSS code;\nb) find a buddy so you can look through each other's code and give feedback.\n\nPlease, do not forget this is an individual task and copying or letting others copy your code can be considered plagiarism. If you use fragments of code from the internet (Stack Overflow, W3C, etc.), make sure they are properly referenced in the code as a comment with the link to the resource you have used.\n\nFinally, also notice it is expected that you write your code from scratch. Therefore, downloading HTML templates or using CSS frameworks such as Tailwind CSS or Bootstrap is not allowed.\n\nContext\nYou have just finished your first academic year at the university, and you are excited about the idea of getting a summer job to get some hands-on experience working as a web designer. Unfortunately, your work experience is scant, and you need to figure out a way of promoting yourself. Then, it comes to your mind the idea of building a website that talks about you.\n\nNotice that a personal website is not a resume. Resumes are boring. Personal Web sites give us the opportunity of differentiating ourselves from the rest. Some advantages of having a personal website are the following:\n• You can emphasise your strengths by driving the user\'s attention to remarkable things about you.\n• It makes you more findable.\n• It gives you the opportunity of building a personal brand.\n• It gives you a differentiating factor from the rest of the people.\n\nThis compulsory activity is delivered individually. Feel free to create your real portfolio or create a fictional persona if you do not want to make the website about you. Avoid lorem ipsum text by all possible means. Semantic tags carry meaning, and the context of their content is important to understand whether they are used correctly or not.\n\nTask description\nDesign and implement your personal portfolio page. Your personal website must contain 5 different pages:\n\n- **Home page**: Must include:\n- Image and description about you (use proper semantic tags)\n- Text introducing yourself\n- List of hobbies\n- A quotation from a book, song, or movie\n\n- **Resume/CV page**: Must include:\n- Academic background\n- Work experience\n- List of languages you speak\n- List of skills\n\n- **Portfolio page**: Showcase at least 3 different projects with:\n- Title\n- Short description (5-6 lines)\n- Image\n\n- **About page**: Explain your use of semantic tags, including a sketch of the layout.\n\n- **Contact page**: Must include at least 3 social networks and working links.\n\nRequired\nYour assignment will be graded based on:\n• Use of structural and semantic tags.\n• Proper use of HTML elements.\n• Lists and nested lists.\n• Proper file naming and project hierarchy.\n• Readable and formatted code with comments.\n• Separation of CSS (no inline styles).\n• Use of colors, margins, and padding for readability.\n• Coherent styles across all pages.\n• English language usage.\n• No lorem ipsum text.\n• All pages must be linked with a <nav> top menu.\n• No templates, Bootstrap, or CSS frameworks allowed.\nDeliverables\n- **A zip file** named \`studentcode-o1-idg12922022.zip\`, containing the full project.\n- **A live version** of your site uploaded via FTP.\nGood luck!",
    '{"name": "idg1292_oblig1", "schema": {"type": "object", "properties": {"about": {"type": "object", "required": ["reflection_score", "reflection_feedback"], "properties": {"reflection_score": {"type": "integer", "description": "Criteria (0-3) 0 -> most of the requirements not met, 1 -> few requirements met, 2 -> most of the requirements met, 3 -> all requirements met (sketch is expected)."}, "reflection_feedback": {"type": "string", "description": "Feedback on reflection level of process and preperation"}, "reflection_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}}}, "home_page": {"type": "object", "required": ["content_requirements_score", "content_requirements_feedback", "proper_html_tags_score", "proper_html_tags_feedback"], "properties": {"proper_html_tags_score": {"type": "integer", "description": "Criteria (0-3) 0 -> bad, validation errors, etc. 1 -> somewhat ok but with many improvements 2 -> good in general but some extra semantic tags could be used (maybe other semantic tags would be better) 3 -> perfect."}, "proper_html_tags_feedback": {"type": "string", "description": "Feedback on semantic HTML usage"}, "content_requirements_score": {"type": "integer", "description": "Criteria (0-3) 0 -> most of the requirements not met, 1 -> few requirements met, 2 -> most of the requirements met, 3 -> all requirements met."}, "proper_html_tags_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}, "content_requirements_feedback": {"type": "string", "description": "Fullfils the following requirements: Image and description about you, Text introducing yourself, List of hobbies, A quotation from a book, song, or movie."}, "content_requirements_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}}}, "portfolio": {"type": "object", "required": ["projects_score", "projects_feedback", "proper_html_tags_score", "proper_html_tags_feedback"], "properties": {"projects_score": {"type": "integer", "description": "Criteria (0-3) 0 -> most of the requirements not met, 1 -> few requirements met, 2 -> most of the requirements met, 3 -> all requirements met."}, "projects_feedback": {"type": "string", "description": "Feedback on project descriptions. There should be three projects with title, short description, and image."}, "projects_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}, "proper_html_tags_score": {"type": "integer", "description": "Criteria (0-3) 0 -> bad, validation errors, etc. 1 -> very improvable 2 -> ok with very few improvements (maybe other semantic tags would be better) 3 -> perfect."}, "proper_html_tags_feedback": {"type": "string", "description": "Score for proper HTML usage"}, "proper_html_tags_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}}}, "navigation": {"type": "object", "required": ["navigation_menu_score", "navigation_menu_feedback", "proper_html_tags_score", "proper_html_tags_feedback"], "properties": {"navigation_menu_score": {"type": "integer", "description": "The page has a navigation menu and it is easy to navigate (all pages) 0 -> no navigation menu or not all pages linked, 1 -> navigation menu but not all pages, 2 -> Yes but some improvements (UX, target!=blank, etc.), 3 -> Perfect"}, "proper_html_tags_score": {"type": "integer", "description": "Criteria (0-3) 0 -> bad, validation errors, etc. 1 -> somewhat ok but with many improvements 2 -> good in general but some extra semantic tags could be used (maybe other semantic tags would be better) 3 -> perfect."}, "navigation_menu_feedback": {"type": "string", "description": "Feedback on the navigation menu and ease of navigation"}, "navigation_menu_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}, "proper_html_tags_feedback": {"type": "string", "description": "Feedback on HTML tag usage"}, "proper_html_tags_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}}}, "resume_page": {"type": "object", "required": ["content_requirements_score", "content_requirements_feedback", "proper_html_tags_score", "proper_html_tags_feedback"], "properties": {"proper_html_tags_score": {"type": "integer", "description": "Criteria (0-3) 0 -> bad, validation errors, etc. 1 -> very improvable 2 -> ok with very few improvements (maybe other semantic tags would be better) 3 -> perfect."}, "proper_html_tags_feedback": {"type": "string", "description": "Feedback on semantic HTML usage"}, "content_requirements_score": {"type": "integer", "description": "Criteria (0-3) 0 -> most of the requirements not met, 1 -> few requirements met, 2 -> most of the requirements met, 3 -> all requirements met."}, "proper_html_tags_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}, "content_requirements_feedback": {"type": "string", "description": "Feedback on to what degree the following requirements is fulfilled: Academic background, Work experience, List of languages you speak, List of skills."}, "content_requirements_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}}}, "contact_page": {"type": "object", "required": ["content_requirements_score", "content_requirements_feedback", "proper_html_tags_score", "proper_html_tags_feedback"], "properties": {"proper_html_tags_score": {"type": "integer", "description": "Criteria (0-3) 0 -> bad, validation errors, etc. 1 -> very improvable 2 -> ok with very few improvements (maybe other semantic tags would be better) 3 -> perfect."}, "proper_html_tags_feedback": {"type": "string", "description": "Score for correct HTML elements"}, "content_requirements_score": {"type": "integer", "description": "Criteria (0-3) 0 -> most of the requirements not met, 1 -> few requirements met, 2 -> most of the requirements met, 3 -> all requirements met."}, "proper_html_tags_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}, "content_requirements_feedback": {"type": "string", "description": "Show all your contact information as well as links to your social websites (e.g.: Facebook, Twitter, LinkedIn, Instagram, etc.). You must include at least 3 different social networks. The links must work properly. However, you don’t need to link them to your real social networks if you don’t want to do so. A link to the main page of the social platform would suffice. Do not forget to include an email address and phone number."}, "content_requirements_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}}}, "general_comments": {"type": "object", "required": ["use_of_semantic_structural_tags_score", "use_of_semantic_structural_tags_feedback", "project_structure_score", "project_structure_feedback", "brringing_css_and_html_together_score", "brringing_css_and_html_together_feedback", "css_optimization_score", "css_optimization_feedback", "code_readability_score", "code_readability_feedback", "user_readability_score", "user_readability_feedback", "seo_score", "seo_feedback", "naming_conventions_score", "naming_conventions_feedback", "design_score", "design_feedback"], "properties": {"seo_score": {"type": "integer", "description": "Criteria (0-1) All pages have a proper title (different per page and meaningful). Each page has a different short description, also meaningful. Files and images have coherent names describing the contents. 0 -> not met 1 -> almost everything above met."}, "design_score": {"type": "integer", "description": "Criteria (0-1) -> 0 or 1. Use objective facts. Elements well aligned, good spacing, coherent and consistent design (same headings among pages and colors, elements not overflowing parent container)."}, "seo_feedback": {"type": "string", "description": "Feedback on SEO"}, "seo_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}, "design_feedback": {"type": "string", "description": "Feedback on design"}, "design_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}, "code_readability_score": {"type": "integer", "description": "Criteria (0-1) 1 -> Very well structured code, easy to read 0-> otherwise"}, "css_optimization_score": {"type": "integer", "description": "Criteria (0-1) 0 -> hard to maintain CSS, 1 -> good css, grouping things together, reusing CSS rules, good naming conventions, etc."}, "user_readability_score": {"type": "integer", "description": "Criteria (0-1) 0 -> bad (spacing, margins, alignment, overlapping) 1 -> good or very good"}, "project_structure_score": {"type": "integer", "description": "Criteria (0-1) (read about page with reflection) 0 if wrong structure (overstructured and not well reasoned). 1 otherwise."}, "naming_conventions_score": {"type": "integer", "description": "Criteria (0-1) The files are properly named. No capital letters, no spaces, use \'-\' to split words (but we accept \'_\'), names describe the content of the file (especially images), etc. 0 -> not met 1 -> most of the criteria above met."}, "code_readability_feedback": {"type": "string", "description": "Feedback on code readability"}, "css_optimization_feedback": {"type": "string", "description": "Feedback on CSS optimization"}, "user_readability_feedback": {"type": "string", "description": "Feedback on user readability"}, "code_readability_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}, "css_optimization_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}, "project_structure_feedback": {"type": "string", "description": "Feedback on project structure"}, "user_readability_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}, "naming_conventions_feedback": {"type": "string", "description": "Feedback on naming conventions"}, "project_structure_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}, "naming_conventions_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}, "brringing_css_and_html_together_score": {"type": "integer", "description": "Criteria (0-1) 0 -> no external 1 -> use external CSS(no inline or embedded). Embed only under proper circumstances."}, "use_of_semantic_structural_tags_score": {"type": "integer", "description": "Criteria (0-1) 0 -> no semantic tags or not fullfilling requirements, 1 -> otherwise"}, "brringing_css_and_html_together_feedback": {"type": "string", "description": "Feedback on bringing CSS and HTML together"}, "use_of_semantic_structural_tags_feedback": {"type": "string", "description": "Feedback on the use of semantic and structural tags"}, "brringing_css_and_html_together_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}, "use_of_semantic_structural_tags_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}}}, "AI_final_assessment": {"type": "object", "required": ["AI_final_comments"], "properties": {"AI_final_comments": {"type": "string", "description": "General comments about the submission as a whole. What was good, what was bad, what could be improved."}}}}}}',
    1,
    120,
    0.80,
    1
),
(
    '14-03-25 Web Coding Oblig 2 TEST CASE',
    '2025-03-14',
    '2025-05-01',
    TRUE,
    TRUE,
    "Oblig#2
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
    approved”",
    '{"name": "oblig_2_darling", "schema": {"type": "object", "properties": {"reflections": {"type": "object", "required": ["main_difficulties_score", "main_difficulties_feedback", "sustainability_score", "sustainability_feedback", "own_mockup_score", "own_mockup_feedback"], "properties": {"own_mockup_score": {"type": "integer", "description": "Criteria (0-3) 0 -> missing reflection 1 -> weak reflection. Just making a statement and not explaining why 2 -> Good reflection. Explain why their mockup was good/not good. 3 -> Good reflection. Very reflective. Explain why their mockup was good/not good and show/explain ho"}, "own_mockup_feedback": {"type": "string", "description": "to what degree has the student reflected around their own mock up "}, "own_mockup_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "sustainability_score": {"type": "integer", "description": "Criteria (0-3) 0 -> missing reflection 1 -> weak reflection. Only descriptive and procedural 2 -> ok reflection. Describes the process but also explains why some decisions are taken or why the received mock-up could be improved 3 -> Perfect. Very reflective. Clearly explain"}, "main_difficulties_score": {"type": "integer", "description": "Criteria (0-3) 0 -> missing reflection 1 -> weak reflection. Only descriptive and procedural 2 -> ok reflection. Describes the process but also explains why some decisions are taken or why the received mock-up could be improved 3 -> Perfect. Very reflective. Clearly explain"}, "sustainability_feedback": {"type": "string", "description": "has the students reflected around the sustainability choises they have made in the project"}, "sustainability_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}, "main_difficulties_feedback": {"type": "string", "description": "has the students explained the main difficuties using the mock up in a well writen and reflective manner"}, "main_difficulties_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}}}, "requirements": {"type": "object", "required": ["mobile_and_desktop_versions_score", "mobile_and_desktop_versions_feedback", "typefaces_score", "typefaces_feedback", "fixed_background_image_score", "fixed_background_image_feedback", "absolute_or_fixed_positioning_score", "absolute_or_fixed_positioning_feedback", "different_font_sizes_score", "different_font_sizes_feedback", "linear_gradient_score", "linear_gradient_feedback", "pseudo_classes_and_pseudo_elements_score", "pseudo_classes_and_pseudo_elements_feedback", "nth_child_score", "nth_child_feedback", "css_custom_emoticons_score", "css_custom_emoticons_feedback", "z_index_score", "z_index_feedback"], "properties": {"z_index_score": {"type": "integer", "description": "Criteria (0-1) 0 -> not fulfilled 1 -> fulfilled"}, "nth_child_score": {"type": "integer", "description": "Criteria (0-1) 0 -> not fulfilled 1 -> fulfilled"}, "typefaces_score": {"type": "integer", "description": "Criteria (0-1) 0 -> not fulfilled 1 -> fulfilled"}, "z_index_feedback": {"type": "string", "description": "has the students used z-index in their CSS code"}, "z_index_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "nth_child_feedback": {"type": "string", "description": "has the students used nth_child pseudo class in their CSS"}, "typefaces_feedback": {"type": "string", "description": "Check if the group used two different typefaces for their project."}, "nth_child_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "typefaces_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "linear_gradient_score": {"type": "integer", "description": "Criteria (0-1) 0 -> not fulfilled 1 -> fulfilled"}, "linear_gradient_feedback": {"type": "string", "description": "Has the students used linear gradient in their CSS"}, "linear_gradient_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "css_custom_emoticons_score": {"type": "integer", "description": "Criteria (0-1) 0 -> not fulfilled 1 -> fulfilled"}, "different_font_sizes_score": {"type": "integer", "description": "Criteria (0-1) 0 -> not fulfilled 1 -> fulfilled"}, "fixed_background_image_score": {"type": "integer", "description": "Criteria (0-1) 0 -> not fulfilled 1 -> fulfilled"}, "css_custom_emoticons_feedback": {"type": "string", "description": "has the students used css to add custom emoticons for each of the prize categories"}, "different_font_sizes_feedback": {"type": "string", "description": "has the students used different font sizes"}, "css_custom_emoticons_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "different_font_sizes_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "fixed_background_image_feedback": {"type": "string", "description": "Has the students set a background image on their page using bacground-attachement: fixed"}, "fixed_background_image_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "mobile_and_desktop_versions_score": {"type": "integer", "description": "Criteria (0-1) 0 -> not fulfilled 1 -> fulfilled"}, "absolute_or_fixed_positioning_score": {"type": "integer", "description": "Criteria (0-1) 0 -> not fulfilled 1 -> fulfilled"}, "mobile_and_desktop_versions_feedback": {"type": "string", "description": "Check if the group implemented mobile and desktop friendly layouts, one for larger screens and one for mobile screens using media queries"}, "mobile_and_desktop_versions_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "absolute_or_fixed_positioning_feedback": {"type": "string", "description": "Has the students used absolute og fixed positioning in their CSS"}, "absolute_or_fixed_positioning_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "pseudo_classes_and_pseudo_elements_score": {"type": "integer", "description": "Criteria (0-1) 0 -> not fulfilled 1 -> fulfilled"}, "pseudo_classes_and_pseudo_elements_feedback": {"type": "string", "description": "has the students used pseudo casses and elements"}, "pseudo_classes_and_pseudo_elements_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}}}, "crucial_checks": {"type": "object", "required": ["validation_errors_score", "validation_errors_feedback", "positioning_problems_score", "positioning_problems_feedback"], "properties": {"validation_errors_score": {"type": "integer", "description": "Criteria (0-1) are there validation errors in the html or CSS code? any errors = 0 points, else 1 point"}, "positioning_problems_score": {"type": "integer", "description": "Positioning problems (0-1) (design) (elements overflowing parent, horizontal scroll, etc.). Flex/Grid, templates and Bootstrap are not allowed, if they are used, score = 0. "}, "validation_errors_feedback": {"type": "string", "description": "are there validation errors in the html or CSS code"}, "validation_errors_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "positioning_problems_feedback": {"type": "string", "description": "are there any positioning problems in the project"}, "positioning_problems_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}}}, "general_comments": {"type": "object", "required": ["semantic_structural_tags_score", "semantic_structural_tags_feedback", "project_structure_score", "project_structure_feedback", "bringing_css_and_html_together_score", "bringing_css_and_html_together_feedback", "CSS_optimization_score", "CSS_optimization_feedback", "code_readablilty_score", "code_readablilty_feedback", "user_readability_score", "user_readability_feedback", "seo_score", "seo_feedback", "naming_conventions_score", "naming_conventions_feedback", "design_score", "design_feedback"], "properties": {"seo_score": {"type": "integer", "description": "Criteria (0-1) All pages have a proper title (different per page and meaningful). Each page has a different short description. Also meaningful. Files and images have coherent names describing the contents. 0 -> not met 1 -> almost everything above met"}, "design_score": {"type": "integer", "description": "Criteria (0-1) -> 0 or 1. Use objective facts. Elements well aligned, good spacing, coherent and consistent design (same headings among pages and colors, elements not overflowing parent container.)"}, "seo_feedback": {"type": "string", "description": "How well has the students implemented search engine optimization in their project"}, "seo_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "design_feedback": {"type": "string", "description": "How well has students implemented well aligned elements , good spacing, coherent and consistent design (same headings among pages and colors, elements not overflowing parent container.)"}, "design_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "CSS_optimization_score": {"type": "integer", "description": "Criteria (0-1) 0 -> hard to maintain CSS, 1 -> good CSS, grouping things together, reusing CSS rules, good naming conventions, etc."}, "code_readablilty_score": {"type": "integer", "description": "Criteria (0-1) 1 -> Very well structured code, easy to read. 0 -> otherwise."}, "user_readability_score": {"type": "integer", "description": "Criteria (0-1) 0 -> bad (spacing, margins, alignment, overlapping) 1 -> good or very good"}, "project_structure_score": {"type": "integer", "description": "Criteria (0-1) (read about page with reflection) 0 if wrong structure (overstructured and not well reasoned). 1 otherwise."}, "naming_conventions_score": {"type": "integer", "description": "Criteria (0-1) The files are properly named. No capital letters, no spaces, use “-” to split words (but we accept “_”), names describe the content of the file (especially images), etc. 0 -> not met 1 -> most of the criteria above met"}, "CSS_optimization_feedback": {"type": "string", "description": "Are the student using well written optimized css?"}, "code_readablilty_feedback": {"type": "string", "description": "is the code well structured and easy to read?"}, "user_readability_feedback": {"type": "string", "description": "How does well is the contents presented to the user "}, "CSS_optimization_max_score": {"type": "integer", "default": 3, "description": "Maximum score for this subsection."}, "code_readablilty_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "project_structure_feedback": {"type": "string", "description": "How well has the students structured the project files according to the assignment description "}, "user_readability_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "naming_conventions_feedback": {"type": "string", "description": "are the students using proper naming conventions?"}, "project_structure_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "naming_conventions_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "semantic_structural_tags_score": {"type": "integer", "description": "Criteria (0-1) 0 -> no semantic tags or not fulfilling requirements, 1 -> otherwise."}, "semantic_structural_tags_feedback": {"type": "string", "description": "how well has the students done proper use of semantic structural tags (including elements required in the description such as acronyms and abbreviations, nested lists, etc.). For example, breaking <p> with <br> is not a proper use."}, "semantic_structural_tags_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}, "bringing_css_and_html_together_score": {"type": "integer", "description": "Criteria (0-1) 0 -> no external 1 -> use external CSS (no inline or embedded). Embedded only under proper circumstances."}, "bringing_css_and_html_together_feedback": {"type": "string", "description": "Has the students implemented css in their html files according to the assignement description i.e. using external styles, not inline "}, "bringing_css_and_html_together_max_score": {"type": "integer", "default": "1", "description": "Maximum score for this subsection."}}}, "AI_final_assessment": {"type": "object", "required": ["AI_final_comments"], "properties": {"AI_final_comments": {"type": "string", "description": "General comments about the submission as a whole. What was good, what was bad, what could be improved."}}}}}}',
    1,
    30,
    0.70,
    5
);

INSERT INTO assignment_filetypes (assignment_id, filetype) VALUES
(1, '.html'),
(1, '.css'),
(2, '.html'),
(2, '.css'),
(2, '.md'),
(2, '.txt');