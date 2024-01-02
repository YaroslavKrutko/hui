--create db
CREATE DATABASE IF NOT EXISTS postgres;

--select db
USE  postgres;

--create table
CREATE TABLE IF NOT EXISTS users (
    users_id INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
);

--insert data
INSERT INTO users (users_id, username, password)
VALUES (1, Rick, 12355);
