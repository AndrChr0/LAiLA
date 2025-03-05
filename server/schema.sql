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
    assignment_name VARCHAR(255) NOT NULL,
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

CREATE TABLE feedback (
    feedback_id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    assignment_id SMALLINT UNSIGNED NOT NULL,
    student_id SMALLINT UNSIGNED NOT NULL,
    feedback_contents JSON NOT NULL,
    general_comment TEXT NOT NULL,
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

INSERT INTO assignments (assignment_name, assignment_start_date, assignment_end_date, is_active, is_public, assignment_description, assignment_criteria, course_id, max_score, pass_threshold, assignment_attempts) VALUES
('Oblig1', '2025-01-27', '2025-02-13', FALSE, TRUE, 'lorem ipsum', '{}', 1, 42, 0.80, 1),
('Oblig 2', '2025-02-20', '2025-03-09', TRUE, TRUE, 'lorem ipsum', '{}', 1, 53, 0.75, 5),
('Assignment #3', '2025-01-10', '2025-02-28', TRUE, TRUE, 'lorem ipsum', '{}', 3, 68, 0.70, 2),
('Obligatory assignment 2', '2025-01-12', '2025-02-12', FALSE, TRUE, 'lorem ipsum', '{}', 4, 50, 0.50, 3),
('Oblig 1 - Web component', '2025-02-26', '2025-03-30', TRUE, TRUE, 'lorem ipsum', '{}', 6, 69, 0.42, 3),
('Assignment 1', '2025-01-10', '2025-04-10', TRUE, TRUE, 'lorem ipsum', '{}', 9, 24, 0.50, 3);

INSERT INTO feedback (assignment_id, student_id, feedback_contents, general_comment, attempt_nr) VALUES
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
    }}', 'The student submission displays a high level of competence in web design fundamentals. Each requirement was clearly addressed and executed with attention to detail. Semantic HTML usage is strong, the site is well-structured, and the styles are coherent. There are no critical issues, and the project effectively meets the assignment criteria.', 1),
(6, 3, '{}', 'Please improve.', 1),
(4, 2, '{}', 'I can see only a few trees in your group CodePen.', 1),
(6, 3, '{}', 'One of the best work done.', 2),
(6, 3, '{}', 'It is illegal to sell guns in Norway.', 3),
(2, 1, '{}', ' I will forward this concern further to your study program leaders.', 1),
(4, 2, '{}', 'If you have questions regarding the feedback, please take contact.', 2),
(3, 1, '{}', 'Several potential issues and areas for improvement.', 1),
(3, 1, '{}', 'Good job!', 2),
(5, 2, '{}', 'Good acknowledgements and judgements in your reflection.', 1);
