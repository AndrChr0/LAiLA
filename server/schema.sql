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
    course_coordinator SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (course_id),
    FOREIGN KEY (course_coordinator) REFERENCES users(user_id)
);

CREATE TABLE enrollment (
    student_id SMALLINT NOT NULL,
    course_id SMALLINT NOT NULL,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES users(user_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

CREATE TABLE assignments (
    assignment_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    assignment_name VARCHAR(255) NOT NULL,
    assignment_start_date DATE NOT NULL,
    assignment_end_date DATE NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    assignment_description TEXT NOT NULL,
    assignment_criteria TEXT NOT NULL,
    course_id SMALLINT NOT NULL,
    assignment_attempts TINYINT UNSIGNED NOT NULL,
    PRIMARY KEY (assignment_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id),
    CHECK (assignment_attempts > 0 AND assignment_attempts <= 5)
);



