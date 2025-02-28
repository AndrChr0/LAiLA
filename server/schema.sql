CREATE DATABASE appDb;
USE appDb;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

INSERT INTO users (name, email, password)
VALUES 
('Chris', 'chris@chris.com', '123'),
('Ola', 'ola@ola.com', '123'),
('Dre', 'dre@dre.com', '123');