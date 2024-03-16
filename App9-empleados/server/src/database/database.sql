-- mysql -u root -p

CREATE DATABASE IF NOT EXISTS dbcompany1;

USE dbcompany1;

CREATE TABLE Empleado(
    id_employee INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name_employee VARCHAR(255) NOT NULL,
    salary_employee INT NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


SELECT * FROM Empleado;



