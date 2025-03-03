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


