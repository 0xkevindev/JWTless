CREATE DATABASE backend;

CREATE TABLE users (
    uuid TEXT UNIQUE NOT NULL,
    name VARCHAR (50),
    email VARCHAR(30),
    password TEXT
);