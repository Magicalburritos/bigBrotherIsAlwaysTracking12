DROP DATABASE IF EXISTS bigBrother;

CREATE DATABASE bigBrother;

USE bigBrother;

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY ,
    departmentName VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY ,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    departmentId INTEGER
);

CREATE TABLE employee(
    id INTEGER AUTO_INCREMENT PRIMARY KEY ,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    rolesId INTEGER,
    managerId INTEGER
);