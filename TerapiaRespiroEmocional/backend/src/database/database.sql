-- mysql -u root -p

CREATE database terapia_respiro_emocional if not EXISTS;

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


drop table pacientes;




SELECT * FROM Empleado;





