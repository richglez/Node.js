const { json } = require("express");
const { pool } = require("../database/database");

const pacientesCtrls = {}; // obj



pacientesCtrls.searchPacienteAutoComplete = async (req, res) => {
    const textoBusqueda = req.query.texto;
    const [rows] = await pool.promise().query("SELECT * FROM pacientes WHERE nombre_paciente LIKE ? OR apellido_paterno LIKE ? OR apellido_materno LIKE ?", [`%${textoBusqueda}%`, `%${textoBusqueda}%`, `%${textoBusqueda}%`]);
    res.json(rows);
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



pacientesCtrls.getPacientes = async (req, res) => {
    const [rows] = await pool.promise().query("SELECT * FROM pacientes");
    res.json(rows);

};





pacientesCtrls.getPacienteById = async (req, res) => {
    const id_paciente = req.params.id; // Obtener el ID del paciente de los parámetros de la solicitud
    const [rows] = await pool.promise().query("SELECT * FROM pacientes WHERE id_paciente = ?", [id_paciente]);

    if (rows.length > 0) {
        res.json(rows[0]); // Devolver el primer paciente encontrado (solo debería haber uno)
    } else {
        res.status(404).send('Paciente no encontrado'); // Si no se encuentra ningún paciente con ese ID, devolver un mensaje de error
    }
};




pacientesCtrls.updatePaciente = async (req, res) => {
    res.send('actualizando paciente')
}

pacientesCtrls.deletePaciente = async (req, res) => {
    res.send('borrando paciente')
};


module.exports = pacientesCtrls;

