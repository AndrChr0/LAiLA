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
    PRIMARY KEY (report_id),
    FOREIGN KEY (assignment_id) REFERENCES assignments(assignment_id)
);

CREATE TABLE final_assessments (
    assessment_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    student_id SMALLINT UNSIGNED,
    assignment_id SMALLINT UNSIGNED,
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
),
('Assignment #3', '2025-01-10', '2025-02-28', TRUE, TRUE, 'lorem ipsum', '{}', 3, 68, 0.70, 2),
('Obligatory assignment 2', '2025-01-12', '2025-02-12', FALSE, TRUE, 'lorem ipsum', '{}', 4, 50, 0.50, 3),
('Oblig 1 - Web component', '2025-02-26', '2025-03-30', TRUE, TRUE, 'lorem ipsum', '{}', 6, 69, 0.42, 3),
('Assignment 1', '2025-01-10', '2025-04-10', TRUE, TRUE, 'lorem ipsum', '{}', 9, 24, 0.50, 3);

INSERT INTO assignment_filetypes (assignment_id, filetype) VALUES
(1, '.html'),
(1, '.css'),
(2, '.html'),
(2, '.css'),
(2, '.md'),
(2, '.txt'),
(3, '.html'),
(3, '.css'),
(3, '.js'),
(4, '.html'),
(4, '.css'),
(5, '.html'),
(5, '.css'),
(6, '.html'),
(6, '.css');

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
(2, 2, "{\"feedback_contents\":{\"reflections\":{\"own_mockup_score\":0,\"own_mockup_feedback\":\"You did not include any reflection regarding your own mock-up. There is no discussion or rating of the mock-ups quality or explanation of what was done.\",\"own_mockup_max_score\":1,\"sustainability_score\":0,\"main_difficulties_score\":0,\"sustainability_feedback\":\"There is no dedicated reflection on sustainability measures or discussion of how you reduced the digital carbon footprint of the newsletter.\",\"sustainability_max_score\":3,\"main_difficulties_feedback\":\"No section discussing the main difficulties encountered with the mock-up or implementation choices is present in your submission.\",\"main_difficulties_max_score\":3},\"requirements\":{\"z_index_score\":0,\"nth_child_score\":0,\"typefaces_score\":1,\"z_index_feedback\":\"You did not use any z-index property in your CSS code.\",\"z_index_max_score\":1,\"nth_child_feedback\":\"The nth-child pseudo-class is not used anywhere in your CSS.\",\"typefaces_feedback\":\"You have made use of two different typefaces (Helvetica/Arial for headings and Verdana/Geneva/Tahoma for paragraphs and lists).\",\"nth_child_max_score\":1,\"typefaces_max_score\":1,\"linear_gradient_score\":1,\"linear_gradient_feedback\":\"A linear gradient is applied within the header background, meeting the requirement.\",\"linear_gradient_max_score\":1,\"css_custom_emoticons_score\":0,\"different_font_sizes_score\":1,\"fixed_background_image_score\":1,\"css_custom_emoticons_feedback\":\"There is no use of custom CSS emoticons for the prize categories.\",\"different_font_sizes_feedback\":\"Different font sizes are used (e.g., h1 at 40px and h2 at 20px), fulfilling the requirement.\",\"css_custom_emoticons_max_score\":1,\"different_font_sizes_max_score\":1,\"fixed_background_image_feedback\":\"The header includes a background image with background-attachment: fixed, which meets the requirement.\",\"fixed_background_image_max_score\":1,\"mobile_and_desktop_versions_score\":0,\"absolute_or_fixed_positioning_score\":0,\"mobile_and_desktop_versions_feedback\":\"You did not implement any media queries to differentiate between mobile and desktop layouts.\",\"mobile_and_desktop_versions_max_score\":1,\"absolute_or_fixed_positioning_feedback\":\"There is no evidence of using absolute or fixed positioning on specific elements in your CSS.\",\"absolute_or_fixed_positioning_max_score\":1,\"pseudo_classes_and_pseudo_elements_score\":0,\"pseudo_classes_and_pseudo_elements_feedback\":\"The CSS does not contain any pseudo-classes or pseudo-elements.\",\"pseudo_classes_and_pseudo_elements_max_score\":1},\"crucial_checks\":{\"validation_errors_score\":0,\"positioning_problems_score\":1,\"validation_errors_feedback\":\"There appears to be a validation issue in the header CSS rule, particularly with the background shorthand (e.g., the ordering of 'fixed' and the URL may cause errors).\",\"validation_errors_max_score\":1,\"positioning_problems_feedback\":\"No significant positioning problems such as overflowing elements or horizontal scroll issues were detected.\",\"positioning_problems_max_score\":1},\"general_comments\":{\"seo_score\":0,\"design_score\":1,\"seo_feedback\":\"The title tag is generic (\\\"Document\\\") and lacks a meaningful description. File names and metadata do not support proper SEO.\",\"seo_max_score\":1,\"design_feedback\":\"The design is simple and structurally aligned; however, it lacks responsiveness and visual enhancements which could improve the overall aesthetic.\",\"design_max_score\":1,\"CSS_optimization_score\":1,\"code_readablilty_score\":1,\"user_readability_score\":1,\"project_structure_score\":0,\"naming_conventions_score\":1,\"CSS_optimization_feedback\":\"Your CSS is basic and mostly clear, though it could be better organized and optimized by grouping related rules.\",\"code_readablilty_feedback\":\"The code is well structured and easy to read with proper indentation.\",\"user_readability_feedback\":\"The content is presented in a clear manner, though improvements in responsiveness could benefit end-user readability.\",\"CSS_optimization_max_score\":3,\"code_readablilty_max_score\":1,\"project_structure_feedback\":\"The project is incomplete: only a main page is provided and the required reflection page is missing.\",\"user_readability_max_score\":1,\"naming_conventions_feedback\":\"Filenames (index.html, styles.css) adhere to standard naming conventions.\",\"project_structure_max_score\":1,\"naming_conventions_max_score\":1,\"semantic_structural_tags_score\":1,\"semantic_structural_tags_feedback\":\"You have used semantic tags such as <header>, <main>, and <footer> appropriately.\",\"semantic_structural_tags_max_score\":1,\"bringing_css_and_html_together_score\":1,\"bringing_css_and_html_together_feedback\":\"CSS is correctly linked externally in your HTML files.\",\"bringing_css_and_html_together_max_score\":1},\"AI_final_assessment\":{\"AI_final_comments\":\"Your submission presents a basic HTML structure and CSS styling which addresses some of the visual requirement such as the use of background images, linear gradients, and varied typefaces. However, several key aspects of the assignment are missing. The reflection page, which was critical for discussing mock-up quality, sustainability measures, and the challenges faced, is completely absent. Additionally, important technical requirements such as media queries for responsiveness, use of pseudo-classes/elements, nth-child, and explicit use of absolute or fixed positioning properties are not implemented. There may also be validation issues in your CSS background shorthand. Focusing on these missing elements and correcting potential syntax errors will considerably improve your overall project quality.\"}}}", 'Your submission presents a basic HTML structure and CSS styling which addresses some of the visual requirement such as the use of background images, linear gradients, and varied typefaces. However, several key aspects of the assignment are missing. The reflection page, which was critical for discussing mock-up quality, sustainability measures, and the challenges faced, is completely absent. Additionally, important technical requirements such as media queries for responsiveness, use of pseudo-classes/elements, nth-child, and explicit use of absolute or fixed positioning properties are not implemented. There may also be validation issues in your CSS background shorthand. Focusing on these missing elements and correcting potential syntax errors will considerably improve your overall project quality.', 'fail', 1),
(2, 3, "{\"feedback_contents\":{\"reflections\":{\"own_mockup_score\":3,\"own_mockup_feedback\":\"You provided a detailed evaluation of your received mockup, noting that it was well-made and clearly outlining its strengths and minor shortcomings (such as image scaling in the mobile view). Your reflection demonstrates clear insight into the design process.\",\"own_mockup_max_score\":1,\"sustainability_score\":3,\"main_difficulties_score\":3,\"sustainability_feedback\":\"You clearly explained the sustainability measures taken, including converting images to SVG and quantifying the file size savings. Your explanation showed thoughtful consideration of the carbon footprint of the website.\",\"sustainability_max_score\":3,\"main_difficulties_feedback\":\"Your reflection on the main difficulties was very detailed. You discussed the challenges with media queries and the implementation of absolute positioning and z-index, providing clear explanations of how these issues affected your work.\",\"main_difficulties_max_score\":3},\"requirements\":{\"z_index_score\":1,\"nth_child_score\":1,\"typefaces_score\":1,\"z_index_feedback\":\"You used z-index effectively to manage the stacking of overlapping images.\",\"z_index_max_score\":1,\"nth_child_feedback\":\"The nth-child pseudo-class is used to style list elements appropriately.\",\"typefaces_feedback\":\"You implemented two distinct typefaces (Shlop and Neusa), fulfilling the requirement.\",\"nth_child_max_score\":1,\"typefaces_max_score\":1,\"linear_gradient_score\":1,\"linear_gradient_feedback\":\"A linear gradient is applied in the footer, demonstrating proper use of CSS gradients.\",\"linear_gradient_max_score\":1,\"css_custom_emoticons_score\":1,\"different_font_sizes_score\":1,\"fixed_background_image_score\":1,\"css_custom_emoticons_feedback\":\"Custom emoticons are implemented using pseudo-elements for the list items.\",\"different_font_sizes_feedback\":\"Different font sizes are employed in headings and paragraphs to create a clear visual hierarchy.\",\"css_custom_emoticons_max_score\":1,\"different_font_sizes_max_score\":1,\"fixed_background_image_feedback\":\"The background image is set with a fixed attachment, as required.\",\"fixed_background_image_max_score\":1,\"mobile_and_desktop_versions_score\":1,\"absolute_or_fixed_positioning_score\":1,\"mobile_and_desktop_versions_feedback\":\"Mobile and desktop versions are handled via media queries, ensuring responsiveness.\",\"mobile_and_desktop_versions_max_score\":1,\"absolute_or_fixed_positioning_feedback\":\"Absolute positioning is used effectively for overlapping images, fulfilling the requirement.\",\"absolute_or_fixed_positioning_max_score\":1,\"pseudo_classes_and_pseudo_elements_score\":1,\"pseudo_classes_and_pseudo_elements_feedback\":\"Pseudo-classes and pseudo-elements are used correctly, especially for the custom emoticons in list items.\",\"pseudo_classes_and_pseudo_elements_max_score\":1},\"crucial_checks\":{\"validation_errors_score\":1,\"positioning_problems_score\":1,\"validation_errors_feedback\":\"No validation errors were detected in your HTML or CSS code.\",\"validation_errors_max_score\":1,\"positioning_problems_feedback\":\"The positioning of elements is managed well with no signs of overflow or layout issues.\",\"positioning_problems_max_score\":1},\"general_comments\":{\"seo_score\":1,\"design_score\":1,\"seo_feedback\":\"Each page has a proper title and the SEO basics are met, although further detailed meta descriptions could enhance the implementation.\",\"seo_max_score\":1,\"design_feedback\":\"The design is coherent and consistent with good spacing and alignment. The use of flex and media queries supports a user-friendly layout.\",\"design_max_score\":1,\"CSS_optimization_score\":1,\"code_readablilty_score\":1,\"user_readability_score\":1,\"project_structure_score\":1,\"naming_conventions_score\":1,\"CSS_optimization_feedback\":\"Your CSS is well-organized with reusable rules and consistent naming conventions, though minor optimizations could still be made.\",\"code_readablilty_feedback\":\"The code is well structured and easy to read, making maintenance straightforward.\",\"user_readability_feedback\":\"The content is presented clearly with appropriate spacing and typography, facilitating good user readability.\",\"CSS_optimization_max_score\":3,\"code_readablilty_max_score\":1,\"project_structure_feedback\":\"The project is organized in a clear folder structure with separate files for HTML, CSS, and reflections, adhering to the assignment guidelines.\",\"user_readability_max_score\":1,\"naming_conventions_feedback\":\"File and class naming conventions are consistent and descriptive.\",\"project_structure_max_score\":1,\"naming_conventions_max_score\":1,\"semantic_structural_tags_score\":1,\"semantic_structural_tags_feedback\":\"Semantic HTML tags such as header, main, section, and footer are used appropriately, which enhances the document structure.\",\"semantic_structural_tags_max_score\":1,\"bringing_css_and_html_together_score\":1,\"bringing_css_and_html_together_feedback\":\"Your HTML correctly links to external CSS files, ensuring a clean separation of structure and style.\",\"bringing_css_and_html_together_max_score\":1},\"AI_final_assessment\":{\"AI_final_comments\":\"Overall, you have delivered a comprehensive and well-structured submission. Your CSS implementation meets all the technical requirements and your reflection page provides insightful explanations of the challenges faced and sustainability measures applied. The code is organized and utilizes modern CSS features appropriately. For future improvements, consider expanding the meta descriptions for better SEO and exploring further optimization techniques. Excellent work!\"}}}", 'Overall, you have delivered a comprehensive and well-structured submission. Your CSS implementation meets all the technical requirements and your reflection page provides insightful explanations of the challenges faced and sustainability measures applied. The code is organized and utilizes modern CSS features appropriately. For future improvements, consider expanding the meta descriptions for better SEO and exploring further optimization techniques. Excellent work!', 'pass', 1),
(6, 3, '{}', 'One of the best work done.', 'pass', 2),
(6, 3, '{}', 'It is illegal to sell guns in Norway.', 'fail', 3),
(2, 1, "{\"feedback_contents\":{\"reflections\":{\"own_mockup_score\":3,\"own_mockup_feedback\":\"You provided a detailed self-reflection on your own mock-up, including both strengths and mistakes. You clearly explained the issues with positioning and clarity, and even provided a rating, which shows thorough reflection.\",\"own_mockup_max_score\":1,\"sustainability_score\":3,\"main_difficulties_score\":3,\"sustainability_feedback\":\"Your sustainability reflection is detailed and well-explained. You describe specific measures like optimizing image formats and sizes, and even include quantitative details (saving 29 KB) along with illustrative figures.\",\"sustainability_max_score\":3,\"main_difficulties_feedback\":\"You described the challenges encountered with the mock-up implementation very clearly, addressing issues like gradient backgrounds, layout differences for mobile vs. desktop, and the confusion with pseudo-classes. This shows a solid understanding of the difficulties involved.\",\"main_difficulties_max_score\":3},\"requirements\":{\"z_index_score\":1,\"nth_child_score\":1,\"typefaces_score\":1,\"z_index_feedback\":\"You correctly applied z-index (e.g., on the h1 element) to manage element layering.\",\"z_index_max_score\":1,\"nth_child_feedback\":\"The nth-child pseudo-class is used in the .text-seven list to style the first list item.\",\"typefaces_feedback\":\"Two different typefaces are implemented using @font-face and applied to different elements.\",\"nth_child_max_score\":1,\"typefaces_max_score\":1,\"linear_gradient_score\":1,\"linear_gradient_feedback\":\"A linear gradient is successfully applied as a background in the body styling.\",\"linear_gradient_max_score\":1,\"css_custom_emoticons_score\":1,\"different_font_sizes_score\":1,\"fixed_background_image_score\":1,\"css_custom_emoticons_feedback\":\"Custom emoticons are set using CSS pseudo-elements (::marker) to replace the list bullet points with images.\",\"different_font_sizes_feedback\":\"The CSS shows varied font sizes across headings, paragraphs, and other elements, enhancing readability.\",\"css_custom_emoticons_max_score\":1,\"different_font_sizes_max_score\":1,\"fixed_background_image_feedback\":\"A background image with a fixed attachment is implemented on the main element.\",\"fixed_background_image_max_score\":1,\"mobile_and_desktop_versions_score\":1,\"absolute_or_fixed_positioning_score\":1,\"mobile_and_desktop_versions_feedback\":\"Media queries are used effectively to create distinct mobile and desktop layouts.\",\"mobile_and_desktop_versions_max_score\":1,\"absolute_or_fixed_positioning_feedback\":\"Absolute positioning is applied to the h1 element and fixed background attachment is used, meeting the requirement.\",\"absolute_or_fixed_positioning_max_score\":1,\"pseudo_classes_and_pseudo_elements_score\":1,\"pseudo_classes_and_pseudo_elements_feedback\":\"You employed pseudo-classes and pseudo-elements such as p::first-letter and a:hover, fulfilling the requirement.\",\"pseudo_classes_and_pseudo_elements_max_score\":1},\"crucial_checks\":{\"validation_errors_score\":1,\"positioning_problems_score\":0,\"validation_errors_feedback\":\"No significant HTML or CSS validation errors were observed.\",\"validation_errors_max_score\":1,\"positioning_problems_feedback\":\"While the layout appears functional, you used flexbox for structuring the layout, which is not allowed per the assignment guidelines.\",\"positioning_problems_max_score\":1},\"general_comments\":{\"seo_score\":0,\"design_score\":1,\"seo_feedback\":\"The pages have meaningful titles, but there is a lack of meta descriptions and other SEO elements.\",\"seo_max_score\":1,\"design_feedback\":\"The design is coherent and the elements are consistently styled. However, the use of disallowed techniques (like flexbox) affects compliance.\",\"design_max_score\":1,\"CSS_optimization_score\":1,\"code_readablilty_score\":1,\"user_readability_score\":1,\"project_structure_score\":1,\"naming_conventions_score\":1,\"CSS_optimization_feedback\":\"CSS is generally well-organized into external files, though there is some duplication in selectors which could be optimized.\",\"code_readablilty_feedback\":\"The coding style is clear and the structure makes it easy to follow the implementation.\",\"user_readability_feedback\":\"Content is presented in a clear, accessible manner with appropriate typographic scaling and spacing.\",\"CSS_optimization_max_score\":3,\"code_readablilty_max_score\":1,\"project_structure_feedback\":\"The project is structured according to the assignment requirements with separate folders and clear file naming.\",\"user_readability_max_score\":1,\"naming_conventions_feedback\":\"File names and assets are appropriately named and follow the specified conventions.\",\"project_structure_max_score\":1,\"naming_conventions_max_score\":1,\"semantic_structural_tags_score\":1,\"semantic_structural_tags_feedback\":\"Semantic HTML tags such as header, main, section, article, and footer are properly used.\",\"semantic_structural_tags_max_score\":1,\"bringing_css_and_html_together_score\":1,\"bringing_css_and_html_together_feedback\":\"CSS is externalized and correctly linked in the HTML files.\",\"bringing_css_and_html_together_max_score\":1},\"AI_final_assessment\":{\"AI_final_comments\":\"Overall, you did a solid job detailing your reflections and meeting many of the styling requirements. Your reflection sections are comprehensive, and you clearly explained the measures taken for sustainability. However, a significant issue is the use of disallowed flexbox properties in your layout, which affects compliance with the assignment constraints. Additionally, the absence of essential SEO meta tags could be improved. In future submissions, ensure strict adherence to all assignment guidelines while maintaining your clear and reflective writing.\"}}}", 'Overall, you did a solid job detailing your reflections and meeting many of the styling requirements. Your reflection sections are comprehensive, and you clearly explained the measures taken for sustainability. However, a significant issue is the use of disallowed flexbox properties in your layout, which affects compliance with the assignment constraints. Additionally, the absence of essential SEO meta tags could be improved. In future submissions, ensure strict adherence to all assignment guidelines while maintaining your clear and reflective writing.', 'pass', 1),
(4, 2, '{}', 'If you have questions regarding the feedback, please take contact.', 'fail', 2),
(3, 1, '{}', 'Several potential issues and areas for improvement.', 'fail', 1),
(3, 1, '{}', 'Good job!', 'fail', 2);


INSERT INTO assignment_reports (assignment_id, report_nr, report_contents, students_passed, students_failed, total_feedback, students_evaluated) VALUES
(2, 1, '{
    "commonProblems": [
      {
        "problemName": "Inadequate Reflection Details",
        "description": "Some submissions did not include a comprehensive reflection page covering the evaluation of the mock-up, sustainability measures, and the challenges encountered.",
        "occurrences": 1,
        "recommendedActions": [
          "Ensure that all required reflection sections (self-reflection, sustainability, and difficulties) are thoroughly addressed in the submission."
        ]
      },
      {
        "problemName": "Non-compliance with CSS Technical Requirements",
        "description": "There is inconsistent adherence to required CSS techniques, including missing media queries, pseudo-classes/elements, absolute positioning, and in one case, use of disallowed layout methods.",
        "occurrences": 2,
        "recommendedActions": [
          "Reinforce the assignment guidelines about which CSS techniques are allowed and required.",
          "Conduct reviews or provide examples that highlight the correct implementation of media queries, pseudo-classes, nth-child, and absolute/fixed positioning."
        ]
      },
      {
        "problemName": "SEO Optimization Deficiencies",
        "description": "Some submissions exhibit generic titles and lack essential meta descriptions and other SEO elements.",
        "occurrences": 2,
        "recommendedActions": [
          "Include meaningful title tags, meta descriptions, and proper semantic HTML elements to improve SEO.",
          "Provide examples of effective SEO metadata in course materials."
        ]
      },
      {
        "problemName": "CSS Validation Issues",
        "description": "At least one submission presented CSS validation errors, specifically related to shorthand properties which might cause errors in browsers.",
        "occurrences": 1,
        "recommendedActions": [
          "Use online validators for HTML and CSS to catch and correct any errors before final submission."
        ]
      }
    ],
    "strongAreas": [
      {
        "areaName": "Comprehensive Sustainability Measures",
        "description": "Several submissions detailed clear and thoughtful sustainability actions, including image optimization and quantification of file savings."
      },
      {
        "areaName": "Effective Use of Diverse Typefaces and Linear Gradients",
        "description": "Students successfully implemented multiple typefaces and applied linear gradients, enhancing the visual appeal and readability of their web pages."
      },
      {
        "areaName": "Clear Code Organization and Semantic HTML Usage",
        "description": "Some projects demonstrated well-organized code, appropriate externalization of CSS, and proper use of semantic tags which contributed to a solid project structure."
      }
    ],
    "overallLecturerSuggestions": [
      "Reiterate the necessity of including a complete reflection page with all required sections.",
      "Clarify allowed versus disallowed CSS techniques in the assignment guidelines.",
      "Emphasize the importance of SEO best practices and provide examples of proper metadata usage.",
      "Encourage students to validate their code using online tools prior to submission."
    ],
    "additionalNotes": "There is a noticeable variation in the quality of submissions. Additional support sessions focusing on detailed reflections and technical implementations may help in aligning all groups with the assignment expectations."
  }', 2, 1, 3, 3);

INSERT INTO final_assessments(student_id, assignment_id, assessment_contents, assessment_result) 
VALUES (1,2,'{"reflections": {"own_mockup_score": 3, "own_mockup_feedback": "You provided a detailed reflection on your own mock-up. You explained that while you were generally satisfied with your design, you recognized areas that needed more specificity and clarity, such as container details and media query instructions.", "own_mockup_max_score": 1, "sustainability_score": 2, "main_difficulties_score": 3, "sustainability_feedback": "Your sustainability reflection explains choices like using web‐safe fonts over heavier custom fonts and compressing images to lower carbon footprint. However, including quantitative data or more specific statistics would have made your reflection even stronger.", "sustainability_max_score": 3, "main_difficulties_feedback": "You provided a comprehensive discussion of the difficulties encountered, such as missing mock-up instructions, challenges with the navigation exit button, and adjustments needed for positioning. Your explanation was clear and reflective.", "main_difficulties_max_score": 3}, "requirements": {"z_index_score": 1, "nth_child_score": 1, "typefaces_score": 1, "z_index_feedback": "You correctly used z-index properties (e.g., in body, main, and dropdown content) to manage layering.", "z_index_max_score": 1, "nth_child_feedback": "You effectively applied the nth-child pseudo-class to insert custom emoticons in your list items.", "typefaces_feedback": "You used two distinct typefaces: a custom font (AvenirNext) and system fonts (Helvetica/Arial), satisfying the requirement.", "nth_child_max_score": 1, "typefaces_max_score": 1, "linear_gradient_score": 1, "linear_gradient_feedback": "A linear gradient is applied to container backgrounds, which meets the assignment criteria.", "linear_gradient_max_score": 1, "css_custom_emoticons_score": 1, "different_font_sizes_score": 1, "fixed_background_image_score": 1, "css_custom_emoticons_feedback": "Custom emoticons are implemented using CSS pseudo-elements on list items.", "different_font_sizes_feedback": "Different font sizes are utilized appropriately between headings and body text to enhance readability.", "css_custom_emoticons_max_score": 1, "different_font_sizes_max_score": 1, "fixed_background_image_feedback": "You set up a background image with a fixed attachment for the main element, fulfilling the requirement.", "fixed_background_image_max_score": 1, "mobile_and_desktop_versions_score": 1, "absolute_or_fixed_positioning_score": 1, "mobile_and_desktop_versions_feedback": "Responsive design is achieved through media queries that adapt the layout for desktop and mobile screens.", "mobile_and_desktop_versions_max_score": 1, "absolute_or_fixed_positioning_feedback": "Usage of absolute and fixed positioning (e.g., in the navigation and social sections) is coherent and meets the assignment requirements.", "absolute_or_fixed_positioning_max_score": 1, "pseudo_classes_and_pseudo_elements_score": 1, "pseudo_classes_and_pseudo_elements_feedback": "You have utilized pseudo-classes and pseudo-elements effectively, as seen in hover effects and nth-child selectors.", "pseudo_classes_and_pseudo_elements_max_score": 1}, "crucial_checks": {"validation_errors_score": 1, "positioning_problems_score": 1, "validation_errors_feedback": "The submitted HTML and CSS code appears to be free of validation errors.", "validation_errors_max_score": 1, "positioning_problems_feedback": "No positioning problems like overflowing elements or horizontal scroll issues were detected in your layout.", "positioning_problems_max_score": 1}, "general_comments": {"seo_score": 1, "design_score": 1, "seo_feedback": "While you have included titles and basic metadata, more descriptive, unique page titles and meta descriptions could improve SEO.", "seo_max_score": 1, "design_feedback": "Your design is coherent and consistent. Elements are well aligned, spacing is adequate, and the overall layout is user-friendly across devices.", "design_max_score": 1, "CSS_optimization_score": 1, "code_readablilty_score": 1, "user_readability_score": 1, "project_structure_score": 1, "naming_conventions_score": 1, "CSS_optimization_feedback": "Your CSS is neatly organized, with grouped rules and consistent naming conventions, facilitating maintenance.", "code_readablilty_feedback": "The code is structured and easy to follow, which demonstrates good coding practices.", "user_readability_feedback": "Content presentation is clear, and the use of semantic HTML elements enhances user readability.", "CSS_optimization_max_score": 3, "code_readablilty_max_score": 1, "project_structure_feedback": "The project has a proper structure with separate pages, external CSS, and a clear folder organization as required.", "user_readability_max_score": 1, "naming_conventions_feedback": "File and folder names follow proper naming conventions, making the project easy to navigate.", "project_structure_max_score": 1, "naming_conventions_max_score": 1, "semantic_structural_tags_score": 1, "semantic_structural_tags_feedback": "Semantic HTML tags such as header, nav, main, article, and footer have been used correctly.", "semantic_structural_tags_max_score": 1, "bringing_css_and_html_together_score": 1, "bringing_css_and_html_together_feedback": "CSS is implemented externally and integrated properly with the HTML, in line with the assignment guidelines.", "bringing_css_and_html_together_max_score": 1}, "AI_final_assessment": {"AI_final_comments": "Overall, your submission is solid and meets the bulk of the assignment requirements. Your implementation of responsive design, semantic HTML, and advanced CSS techniques such as pseudo-classes, gradients, and fixed backgrounds is commendable. The reflections are insightful, especially regarding the challenges posed by the mock-up and your sustainability considerations. Moving forward, enhancing your SEO elements and adding more quantitative details to your sustainability discussion could further improve your work. Keep up the good work!"}}',"pass");

INSERT INTO student_work(assessment_id, file_contents, filetype, filepath) 
VALUES
(
  1,
  '
  Group 7:
  o   Christopher Ngo (chrisng@stud.ntnu.no)
  o   Ewelina Paulina Matyjaszczyk (ewelinam@stud.ntnu.no)
  o   Martin Hansen Løntjern (martihlo@stud.ntnu.no)
  o   Nora Lundquist (noralu@stud.ntnu.no)
  o   Veronika Zaguraeva (veroniza@stud.ntnu.no)


  https://folk.ntnu.no/noralu/pinkumbrella/',
  "txt",
  "filpath/to/group.txt"
),
(
  1,
  '<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Home</title>
      <link rel="stylesheet" href="style.css">
  </head>
  <body>

  <!-- Nav bar -->
      <nav class="dropdown">
          <div class="idg1292">
              <p>IDG1292, Oblig2</p> 
          </div>
          <div class="hamburger"></div>
          <div class="hamburger"></div>
          <div class="hamburger"></div>
          
          <div class="dropdown-content">
              <ul class="sidebarul">
                  <li class="sidebarli"><a href="index.html">Home</a></li>
                  <li class="sidebarli"><a href="reflection.html">About this newsletter</a></li>
              </ul>
              <div class="socials"> 
                  
                  <div>
                  <a href="https://www.instagram.com/">
                      <img class="logo" src="images/instagramicon-kopi.png" alt="instagram icon">
                  </a>
                  </div>
                  <div>
                  <a href="https://www.facebook.com/">
                      <img class="logo" src="images/facebookicon-kopi.png" alt="facebook icon">
                  </a>
                  </div>
                  <div>
                  <a href="https://pinterest.com/">
                      <img class="logo" src="images/pinteresticon-kopi.png" alt="pinterest icon">
                  </a>
                  </div>  
              </div>
          </div>
      </nav>

  <!-- Header -->
      <header class="topbottomcontainer">
          <h1>What is Sustainable Web Design?</h1>
          <p>Web technology has the potential to bring huge benefits to society and the environment, but only if we use it wisely…</p>
          
      </header>
      <main>

  <!-- Problem and facts box -->
          <div class="parent">
              <div class="left">
          <section class="container">
              <h2>Problem:</h2>
              <p>The internet currently produces approximately 3.8% of global carbon emissions, 
                  which are rising in line with our hunger to consume more data. Increasingly, 
                  web technologies are also being used to sow discontent, erode privacy, prompt unethical decisions, 
                  and, in some countries, undermine personal freedoms and the well-being of society.</p>
              <h2>Facts:</h2>
              <ul>
                  <li>1.6 billion trees would have to be planted to offset the pollution caused by email spam.</li>
                  <li>1.5 billion trees would need to be planted to deal with annual e-commerce returns in the US alone.</li>
                  <li>231 million trees would need to be planted to deal with the pollution caused as a result of the 
                      data US citizens consumed in a 2019. </li>
                  <li>16 million trees would need to be planted to offset the pollution caused by estimated 1.9 trillion 
                      yearly searches on Google. </li>
              </ul>
          </section>
          </div>

  <!-- Article 1 -->
          <div class="right">
          <article class="container">
              <h2>Do you write reusable code?</h2>
              <p>It perhaps goes without saying that it is inefficient to reinvent the wheel, 
                  yet it happens daily in web design projects around the world. The carbon footprint of a website 
                  includes the emissions of the team that created it, from their office energy to travel emissions. 
                  When we write code that can only be used once but which serves common purposes, 
                  we waste not just time but also energy.</p>
              <p>Writing reusable code might not be a fit for every project, but it does help make our work more 
                  commercially efficient and delivers results with lower carbon emissions.</p>
              <img src="images/mountain.jpeg" alt="mountain">
          </article>
      </div>

  <!-- Article 2 -->
      <div class="left">
          <article class="container">
              <h2>Has the design used the minimum number of custom fonts?</h2>
              <p>Custom font files can significantly increase the file size of web pages. 
                  A typical custom font file can be over 200kb and may only include a single weight. 
                  Multiple typefaces and multiple font weights can add up quickly, 
                  increasing energy use and causing slow performance. 
                  Use custom fonts frugally and try to use system fonts that are already on the users device.</p>
              <img src="images/bird.jpeg" alt="bird">
          </article>
          </div>

  <!-- Article 3 -->
          <div class="right">
          <article class="container">
              <h2>Could a Progressive Web App be an efficient solution?</h2>
              <p>Progressive Web App technology can be used to improve user experiences and save data by 
                  caching key information and assets on the user’s device. 
                  Even bigger efficiencies can perhaps be gained by using Progressive Web Apps instead of native mobile apps, 
                  which are often far more bloated.</p>
              <img src="images/bridge.jpeg" alt="bridge">
          </article>
          </div>
      </div>
      </main> 

  <!-- Footer -->
      <footer class="topbottomcontainer">
          <ul>
              <li>Click here to read <a href="reflection.html">about this newsletter</a></li>
              <li>Text from: <a href="https://sustainablewebdesign.org/">Sustainable Web Design</a></li> 
              <li>Fonts from: <a href="https://freefontsfamily.com/avenir-next-font-download-free/">FreeFontsFamily</a></li>
              <li>Background image from: <a href="https://www.publicdomainpictures.net/">PublicDomainPictures</a></li>
              <li>Social media icons from: <a href="https://www.flaticon.com/">FlatIcon</a></li>
              <li>Article pictures from: <a href="https://unsplash.com/">Unsplash</a></li>
          </ul>
      </footer>

  </body>
  </html>',
  "html",
  "filpath/to/home.html"
),
(
  1,
  '<!DOCTYPE html>
  <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reflection page</title>
      <link rel="stylesheet" href="style.css">
      </head>
      <body>
          
      <!-- Nav bar -->
      <nav class="dropdown">
          <div class="idg1292">
          <p>IDG1292, Oblig2</p>
          </div>
          <div class="hamburger"></div>
          <div class="hamburger"></div>
          <div class="hamburger"></div>

          <div class="dropdown-content">
          <ul class="sidebarul">
              <li class="sidebarli"><a href="index.html">Home</a></li>
              <li class="sidebarli"><a href="reflection.html">About this newsletter</a></li>
          </ul>

          <div class="socials">
              <div>
              <a href="https://www.instagram.com/">
                  <img class="logo" src="images/instagramicon-kopi.png" alt="instagram icon"></a>
              </div>
              <div>
              <a href="https://www.facebook.com/">
                  <img class="logo" src="images/facebookicon-kopi.png" alt="facebook icon"></a>
              </div>
              <div>
              <a href="https://pinterest.com/">
                  <img class="logo" src="images/pinteresticon-kopi.png" alt="pinterest icon"></a>
              </div>
          </div>
          </div>
      </nav>

      <header class="topbottomcontainer">
          <h1>Reflection</h1>
      </header>

      <!-- Box 1 -->
      <main id="reflection">
      <div class="parent">
          <div class="left">
              <section class="container">
              <h2>Section 1</h2>
              <p>
              It was easy to follow the mock-up, the drawings was clear and
              simple. However, there was some missing information. There was
              nothing about a preferred background image, only one mentioned
              font face (when we needed at least two) and no information the
              other article images. Moreover, the mock-up lacked information
              about which gradients they wanted, however, they did specify
              colors.
              </p>
              <p>
              We followed the instructions of the other group\'s layout, however,
              the lack of instructions made it difficult. One of difficulties we
              had was that the instructions were awkwardly structured. Also one
              of the downsides was that the group we got the layout from didn\'t
              say anything about the choice of background picture and pictures
              in general so we had to make that choice ourselves. The next need
              was to make changes to the navigation child, since the layout
              suggested that we should make an "exit button", but we did not
              manage to do it.
              </p>
              <p>
              Many elements were not specific such as: margin, padding, font
              sizes etc. Only a few details were included. In the mock-up they 
              wanted the dropdown menu to cover the page, this would require the 
              z-index. We used the z-index in order to make sure that the dropdown
              menu displayed on top of the rest of the page. In the navbar they
              wanted an exit button, we did not do this because we didn\'t know
              how to do it without Javascript. To implement relative and
              absolute positioning on the site, we set position to relative on
              the sidebar menu and position absolute on the socials section at
              the bottom of the sidebar.
              </p>
              <p>
              The mock-up specified that they would like to have images between articles,
              but it didn\'t make sense as it would break up the text awkwardly
              so we put them at the end of each article.
              </p>
              <p>
              We enjoyed the overall design idea of the webpage and found it to be
              very pleasing, visually. And although both the dropdown and sidebar menu was 
              challenging, the end result feels very natural and intuitive. We also found
              the mock-up design to be very realistic (in large parts) in terms of implementation.
              </p>
              </section>
          </div>

          <!-- Box 2 -->
          <div class="right">
              <section class="container">
              <h2>Section 2</h2>
              <p>
              We tried to make it environmentally friendly as much as we could.
              In the mock-up description that we received they chose just one
              font-face which is Avenir Next. Avenir Next has bigger carbon
              footprint than web-safe fonts-faces, because it needs to be
              downloaded. Since they didn\'t specify a second font, we chose
              Helvetica with Arial as fallback because it was eco friendly and
              web-safe. We would have gone for a more web-safe font that was
              more carbon friendly as browsers usually come with the font.
              </p>
              <p>
              For the images, we downloaded free ones from "Unsplash". Since the
              mock-up didn\'t specify what type of pictures they wanted, we chose
              nature themed ones. Then we compressed the pictures to make them
              smaller and added a black and white filter to make it more eco
              friendly.
              </p>
              <p>
              Picture below is a table of the estimated total size of the
              website before and after compressed the images and made them more
              eco friendly.
              </p>
              <img class="stats" src="images/data.jpeg" alt="data">
              </section>
          </div>

          <!-- Box 3 -->
          <section id="section3">
              <h2>Section 3</h2>
              <p>
              In regards to our own mock-up, we are sort of satisfied with it. In
              hindsight there are plenty of things we could have been more
              specific about. We gave the other group the freedom to chose their
              images on their own, however, we should at least have specified the
              themes of the images. Moreover, we could have been more specific
              with our containers and the specific structure of the page in terms
              of tags. Another part of our mock up that could be improved is the
              way we have written some of the page specifications in the page
              headings in the PDF. The mixing of description and title-heading
              could be confusing, especially when we have included specific
              instructions below as well. We could have been more specific in our
              media queries section, but we felt that the information that was
              there should be sufficient to design the page.
              </p>
              <p>
              We are satisfied with a large amount of of the information we have
              given regarding the sizing of margins and height of each section of
              the page. Our page mock-up did also include most, if not all, of the
              requirements that was in the mock-up brief. Additionally, we feel we
              have been specific, albeit a little messy, in the order of our
              description. The drawings of our website should be plenty
              descriptive for the final look of site.
              </p>
              <p>
              The parts of the mock-up we foresee the other group would struggle
              the most with, might be centering the headings over the article
              images and giving the headings a iced, blurred background. We forgot
              to have a gradient in the mock-up, though we did supply information
              about which base color each section should have. The lack of
              specificity in the media query might also prove to be a problem.
              Other than that, the mock-up should be relatively easy to implement.
              </p>
              <p>
              If we were to do it again, we would have been much more orderly with
              the mock-up instructions, especially regarding the media query and
              image themes. Furthermore, we would have spent more time on the
              semantical tags just so that there could be no confusion. Lastly,
              perhaps we could have simplified the z-index that you have to do
              with the images and the headings.
              </p>
          </section>
      </div>
      </main>

      <!-- footer -->
      <footer class="topbottomcontainer">
          <ul>
          <li>Click here to go back to: <a href="index.html">Homepage</a></li>
          <li>Text from: <a href="https://sustainablewebdesign.org/">Sustainable Web Design</a></li>
          <li>Fonts from:<a href="https://freefontsfamily.com/avenir-next-font-download-free/">FreeFontsFamily</a></li>
          <li>Background image from:<a href="https://www.publicdomainpictures.net/">PublicDomainPictures</a></li>
          <li>Social media icons from:<a href="https://www.flaticon.com/">FlatIcon</a></li>
          <li>Article pictures from: <a href="https://unsplash.com/">Unsplash</a></li>
          </ul>
      </footer>
      </body>
  </html>
  ',
  "html",
  "filpath/to/reflection.html"
),
(
  1,
  '@font-face {
    font-family: avenirnextregular;
    src: url(fonts/AvenirNextLTPro-Regular.otf);
  }

  *{
    margin: 0;
    box-sizing: border-box;
    word-wrap: break-word;
  }

  body {
    position: relative;
    z-index: -9999;
  }

  main{
    background-image: url(images/leaves.jpeg);
    background-size: 60%;
    background-attachment: fixed;
    background-repeat: repeat;
    position: relative;
    z-index: -3;
  }

  /* nav bar */
  .idg1292{
    display: none;
  }

  nav{
    position: fixed;
  }

  p,li {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 12pt;
    max-width: 100%;
    margin-bottom: 10px;
  }

  .hamburger{
    width: 35px;
    height: 5px;
    background-color: black;
    margin: 6px 0;
    border: solid white 0.1px;
    box-shadow: 0px 0px 10px 0px rgb(39, 93, 18);
  }

  .dropdown-content{
    display: none;
    position: absolute;
    background-color: #5f7a44;
    min-width: 100vw;
    min-height: 80vh;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding: 12px 16px;
    z-index: 1;
  }

  .dropdown:hover .dropdown-content {
    display: inline-block;
  }

  .sidebarul{
    list-style: none;
    padding: 0;
  }

  .sidebarli{
    margin-bottom: 20px;
    text-align: center;
    padding: 5% 0;
    text-transform: uppercase;
  }

  .sidebarli:hover{
    background-color:  #8bac6a;
    box-shadow: 0px 0px 10px 0px darkslategray;
  }

  .sidebarli > a{
    text-decoration: none;
    color: #efebdd;
  }

  .socials {
    position: absolute;
    bottom: 0;
    left: 0;
    margin-bottom: 20px;
    border-top: solid white;
    width: 100%;
  }

  .socials > div {
    display: inline-block;
    bottom: 0;
    margin: 20px 0% 0 20%;
  }

  /* Header */
  .topbottomcontainer{
    border: solid black;
    background-color: rgb(23, 64, 41);
    padding: 2%;
    color: #F2F2F2;
    margin: 0 auto;
    text-align: center;
  }

  /* Problem and facts box */
  .parent{
    max-width: 60%;
    margin: 0 auto;
  }

  .container{
    border: solid black;
    max-width: 100%;
    margin: 25px 0;
    background-color: floralwhite;
    padding: 5%;
    background: linear-gradient(#8dc0a3, #2e6f4a);
    color: #efebdd;
    position: relative;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding-left: 1rem;
    text-indent: -0.7rem;
  }

  li:nth-child(1)::before {
    content: "\1F331";
  }

  li:nth-child(2)::before {
    content: "\1F343";
  }

  li:nth-child(3)::before {
    content: "\1F33F️";
  }

  li:nth-child(4)::before {
    content: "\1F333";
  }

  li:nth-child(5)::before {
    content: "\267B";
  }

  li:nth-child(6)::before {
    content: "\1F332";
  }

  #reflection {
    background-image: none;
  }

  img{
      margin-top: 10px;
      max-height: 50%;
      filter: grayscale(100%);
      max-width: 50%;
  }

  .stats{
    max-width: 100%;
    max-height: 100%;
    
  }

  h1{
    margin-left: 30px;
  }

  h1,h2 {
    font-family: avenirnextregular, \'Times New Roman\', Times, serif;
    font-weight: 900;
    font-size: 24pt;
    max-width: 100%;
  }

  h2{
    margin: 10px 0;
  }

  p,li {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 12pt;
    max-width: 100%;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding-left: 1rem;
    text-indent: -0.7rem;
  }

  /* Footer */
  .topbottomcontainer a {
      text-decoration: none;
      color: gray;
  }

  .topbottomcontainer a:hover{
      background-color: lightgrey;
  }

  #section3{
    border: solid black;
    max-width: 100%;
    height: 100%;
    margin: 25px 0;
    background-color: floralwhite;
    padding: 5%;
    background: linear-gradient(#8dc0a3, #2e6f4a);
    color: #efebdd;
  }

  .logo {
    max-width: 100%;
    width: 20px;
    height: 20px;
    margin-left: 5px;
    margin-bottom: 2px;
    filter: invert(100%);
  }

  .logo:hover {
    border-radius: 15%;
    box-shadow: 0px 0px 10px 0px black;
  }


  /* ------------------------- MEDIA QUERIES -------------------------  */
  @media only screen and (min-width: 960px){

  body{
      margin: 0;
      box-sizing: border-box;
      background-color: whitesmoke;
  }

  main{
      background-image: url(images/leaves.jpeg);
      background-size: 60%;
      background-attachment: fixed;
      background-repeat: repeat;
      
  }


  main, header, footer{
      right: 0;
      min-width: 70%;
      margin: 0 auto;
      margin-left: 220px;
      margin-right: 25px;
  }

  h1, h1 + p, .topbottomcontainer p{
      text-align: center;
  }

  .topbottomcontainer{
      border: solid black;
      max-width: 100%;
      margin-left: 220px;
      margin-bottom: 20px;
      margin-top: 20px;
      margin-right: 20px;
  }

  /* nav bar */
  .idg1292{
    display: block;
    background-color: white;
    color: black;
    padding: 15%;
    text-align: center;
    top: 0;
    text-transform: uppercase;
  }

  nav{
      width: 200px;
      position: fixed;
      left: 0;
      top: 0;
  }
  .hamburger{
    display: none;
  }

  .dropdown-content{
    position: relative;
    display: inline-block;
    height: 91.55vh;
    min-width: 200px;
    padding: 0;
    background-color: #5f7a44;
  }

  .sidebarul{
    display: block;
    list-style: none;
    padding: 0;
    margin-top: 10px;
  }  

  .sidebarli{
    margin-bottom: 20px;
    text-align: center;
    padding: 5% 0;
    text-transform: uppercase;
  }

  .sidebarli > a{
    text-decoration: none;
    color: white;  
  }
  .sidebarli:hover{
    background-color:  #8bac6a;
    box-shadow: 0px 0px 10px 0px darkslategray;
  }
  .socials {
    position: absolute;
    bottom: 0;
    margin-bottom: 20px;
    border-top: solid white;
    width: 100%;
  }

  .socials > div {
    display: inline-block;
    bottom: 0;
    margin-top: 20px;
    margin-left: 13%;
  }

  .container{
      border: solid black;
      max-width: 100%;
      min-height: 500px;
      margin: 25px 0 0 50px;
      background-color: floralwhite;
      padding: 5%;
      
  }

  img {
    box-sizing: content-box;
  }

  div.left, div.right{
      height: 100%;
      width: 49%;
      margin: 2.5% 0;
  }

  .parent{
      max-width: 90%;
      margin: 0 auto;
  }

  .parent > div{
      vertical-align: middle;
      display: inline-block;
      max-width: 60%;
  }

  .logo {
    width: 20px;
    height: 20px;
    margin-left: 5px;
    margin-bottom: 1.5em;
  }

  .logo:hover {
    border-radius: 15%;
    box-shadow: 0px 0px 10px 0px black;
  }

  }',
  "css",
  "filpath/to/style.css"
);
