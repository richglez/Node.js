-- mysql -u root -p

CREATE DATABASE IF NOT EXISTS terapia_respiro_emocional;


use terapia_respiro_emocional;

CREATE TABLE pacientes(
	id_paciente int unsigned auto_increment primary key,
    expediente_paciente varchar(20) not null,
    nombre_paciente varchar(255) not null,
    apellido_paterno varchar(255) not null,
    apellido_materno varchar(255) not null,
	sexo_paciente char not null,
    edad_paciente int not null,
    ingreso_programa TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	nacionalidad varchar(255) not null,
    domicilio varchar(255) not null,
    colonia varchar(255) not null,
    alcaldia_municipo varchar(255) not null,
    entidadFederativa varchar(255) not null,
    diagnostico varchar(255) not null,
	cuidadorPrimario varchar(255) not null,
    tipoPrograma varchar(255) not null

);

CREATE TABLE cuidadores(
    id_cuidador_paciente int unsigned auto_increment primary key,
    nombreCuidador varchar(255) not null,
    apPatCuidador varchar(255) not null,
    apMatCuidador varchar(255) not null,
    sexoCuidador char not null,
    edadCuidador int not null,
    telefonoCuidador varchar(30) not null,
    num_suplencias int not null
);


CREATE TABLE suplencias (
    id_suplencia int unsigned NOT NULL AUTO_INCREMENT,
    id_cuidador_paciente int unsigned NOT NULL,
    dia_suplencia varchar(10) NOT NULL,
    hora_inicial varchar(255) NOT NULL,
    hora_final varchar(255) NOT NULL,
    costoGuardia int NOT NULL,
    particular varchar(80) NOT NULL,
    PRIMARY KEY (id_suplencia),
    FOREIGN KEY (id_cuidador_paciente) REFERENCES cuidadores (id_cuidador_paciente)
);






drop table pacientes;




SELECT * FROM Empleado;





