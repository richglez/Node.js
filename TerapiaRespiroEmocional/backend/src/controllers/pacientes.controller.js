const { json } = require("express");
const { pool } = require("../database/database");

const pacientesCtrls = {}; // obj

pacientesCtrls.getPacientes = async (req, res) => {
    const [rows] = await pool.promise().query("SELECT * FROM pacientes");
    res.json(rows);

};

pacientesCtrls.searchPaciente = async (req, res) => {
    res.send('buscando paciente')
};

pacientesCtrls.addPaciente = async (req, res) => {
    const { expediente_paciente, nombre_paciente, apellido_paterno, apellido_materno, sexo_paciente, edad_paciente, nacionalidad, domicilio, colonia, alcaldia_municipio, entidadFederativa, diagnostico, cuidadorPrimario, tipoPrograma } = req.body;

    console.log(req.body); // Mostrar el contenido de req.body en la consola

    const [rows] = await pool
        .promise()
        .query(
            "INSERT INTO pacientes (expediente_paciente, nombre_paciente, apellido_paterno, apellido_materno, sexo_paciente, edad_paciente, nacionalidad, domicilio, colonia, alcaldia_municipio, entidadFederativa, diagnostico, cuidadorPrimario, tipoPrograma) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [expediente_paciente, nombre_paciente, apellido_paterno, apellido_materno, sexo_paciente, edad_paciente, nacionalidad, domicilio, colonia, alcaldia_municipio, entidadFederativa, diagnostico, cuidadorPrimario, tipoPrograma]
        );

    res.send({
        id_paciente: rows.insertId,
        expediente_paciente, nombre_paciente, apellido_paterno, apellido_materno, sexo_paciente, edad_paciente, nacionalidad, domicilio, colonia, alcaldia_municipio, entidadFederativa, diagnostico, cuidadorPrimario, tipoPrograma
    });
};


pacientesCtrls.updatePaciente = async (req, res) => {
    res.send('actualizando paciente')
}

pacientesCtrls.deletePaciente = async (req, res) => {
    res.send('borrando paciente')
};


module.exports = pacientesCtrls;

