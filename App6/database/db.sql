-- * creating database
CREATE DATABASE db1;

-- * using database
USE db1;


-- * creating tabless
CREATE TABLE pacientes(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL,
    apellido_paterno VARCHAR(80) NOT NULL,
    apellido_materno VARCHAR(80) NOT NULL,
    edad INT NOT NULL,
    telefono VARCHAR(15)
);


-- * show all tables
SHOW TABLES;

-- * to describe the table
DESCRIBE pacientes;
