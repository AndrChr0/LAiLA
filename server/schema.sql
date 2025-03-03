CREATE DATABASE ai_tutor_db2;
USE ai_tutor_db2;

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
    course_coordinator SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (course_id),
    FOREIGN KEY (course_coordinator) REFERENCES users(user_id)
);

CREATE TABLE assignments (
    assignment_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    assignment_name VARCHAR(255) NOT NULL,
    assignment_start_date DATE NOT NULL,
    assignment_end_date DATE NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    assignment_description TEXT NOT NULL,
    assignment_criteria TEXT NOT NULL,
    course_id SMALLINT UNSIGNED NOT NULL,
    assignment_attempts TINYINT UNSIGNED NOT NULL CHECK (assignment_attempts > 0 AND assignment_attempts <= 5),
    PRIMARY KEY (assignment_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

CREATE TABLE enrollment (
    student_id SMALLINT UNSIGNED NOT NULL,
    course_id SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES users(user_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

CREATE TABLE assignment_feedback (
    feedback_id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    assignment_id SMALLINT UNSIGNED NOT NULL,
    student_id SMALLINT UNSIGNED NOT NULL,
    feedback_contents JSON NOT NULL,
    attempt_nr TINYINT UNSIGNED NOT NULL,
    PRIMARY KEY (feedback_id),
    FOREIGN KEY (assignment_id) REFERENCES assignments(assignment_id),
    FOREIGN KEY (student_id) REFERENCES users(user_id)
);

INSERT INTO users (first_name, last_name, role, email, password) VALUES
('Ola', 'Nsk', 'student', 'olansk@ntnu', '123abc'),
('Chris', 'NG', 'student', 'chrisng@ntnu', '123abc'),
('Andy', 'Chr', 'student', 'andychr@ntnu', '123abc'),
('Car', 'Loss', 'lecturer', 'carlos@ntnu', '123abc'),
('Left', 'Y', 'lecturer', 'elefths@ntnu', '123abc'),
('Terje', 'Script', 'lecturer', 'tjts@ntnu', '123abc'),
('Luvin', 'Ragoo', 'lecturer', 'mrragoo@ntnu', '123abc'),
('Nipuna', 'Wee', 'lecturer', 'wutang@ntnu', '123abc'),
('Emil', 'Bakk', 'lecturer', 'emba@ntnu', '123abc'),
('Paul', 'Knut', 'lecturer', 'apku@ntnu', '123abc');

INSERT INTO courses (course_code, course_name, course_description, course_coordinator) VALUES
('IDG1292', 'Webcoding', 'lorem ipsum', 4),
('IDG3101', 'In Debt', 'lorem ipsum', 6),
('IDG2004', 'Info & DB', 'lorem ipsum', 7),
('IDG1362', 'UCD', 'lorem ipsum', 5),
('IDG2003', 'Backend', 'lorem ipsum', 8),
('IDG2100', 'Fullstack', 'lorem ipsum', 4),
('IDG2009', 'Comms', 'lorem ipsum', 9),
('IDG3006', 'WoT', 'lorem ipsum', 5),
('IDG2001', 'Cloud', 'lorem ipsum', 10);

INSERT INTO enrollment (student_id, course_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 6),
(2, 1), (2, 4), (2, 5), (2, 6),
(3, 1), (3, 7), (3, 8), (3, 9);

INSERT INTO assignments (assignment_name, assignment_start_date, assignment_end_date, is_active, assignment_description, assignment_criteria, course_id, assignment_attempts) VALUES
('Oblig1', '2025-01-27', '2025-02-13', FALSE, 'lorem ipsum', 'muspi merol', 1, 1),
('Oblig 2', '2025-02-20', '2025-03-09', TRUE, 'lorem ipsum', 'muspi merol', 1, 5),
('Assignment #3', '2025-01-10', '2025-02-28', TRUE, 'lorem ipsum', 'muspi merol', 3, 2),
('Obligatory assignment 2', '2025-01-12', '2025-02-12', FALSE, 'lorem ipsum', 'muspi merol', 4, 3),
('Oblig 1 - Web component', '2025-02-26', '2025-03-30', TRUE, 'lorem ipsum', 'muspi merol', 6, 3),
('Assignment 1', '2025-01-10', '2025-04-10', TRUE, 'lorem ipsum', 'muspi merol', 9, 3);

INSERT INTO assignment_feedback (assignment_id, student_id, feedback_contents, attempt_nr) VALUES
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
    }}', 1),
(6, 3, '{}', 1),
(4, 2, '{}', 1),
(6, 3, '{}', 2),
(6, 3, '{}', 3),
(2, 1, '{}', 1),
(4, 2, '{}', 2),
(3, 1, '{}', 1),
(3, 1, '{}', 2),
(5, 2, '{}', 1);
