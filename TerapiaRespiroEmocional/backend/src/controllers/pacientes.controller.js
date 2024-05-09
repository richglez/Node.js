const { json } = require("express");
const { pool } = require("../database/database");

const pacientesCtrls = {}; // obj

pacientesCtrls.searchPacienteAutoComplete = async (req, res) => {
    const textoBusquedaPaciente = req.query.buscarAlpaciente;
    const [rows] = await pool
        .promise()
        .query(
            "SELECT * FROM pacientes WHERE nombre_paciente LIKE ? OR apellido_paterno LIKE ? OR apellido_materno LIKE ?",
            [
                `%${textoBusquedaPaciente}%`,
                `%${textoBusquedaPaciente}%`,
                `%${textoBusquedaPaciente}%`,
            ]
        );
    res.json(rows);
};

pacientesCtrls.addPaciente = async (req, res) => {
    const {
        expediente_paciente,
        nombre_paciente,
        apellido_paterno,
        apellido_materno,
        sexo_paciente,
        edad_paciente,
        nacionalidad,
        domicilio,
        colonia,
        alcaldia_municipio,
        entidadFederativa,
        diagnostico,
        cuidadorPrimario,
        tipoPrograma,
        observaciones,
        recomendaciones,
    } = req.body;

    console.log(req.body); // Mostrar el contenido de req.body en la consola

    const [rows] = await pool
        .promise()
        .query(
            "INSERT INTO pacientes (expediente_paciente, nombre_paciente, apellido_paterno, apellido_materno, sexo_paciente, edad_paciente, nacionalidad, domicilio, colonia, alcaldia_municipio, entidadFederativa, diagnostico, cuidadorPrimario, tipoPrograma) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                expediente_paciente,
                nombre_paciente,
                apellido_paterno,
                apellido_materno,
                sexo_paciente,
                edad_paciente,
                nacionalidad,
                domicilio,
                colonia,
                alcaldia_municipio,
                entidadFederativa,
                diagnostico,
                cuidadorPrimario,
                tipoPrograma,
                observaciones,
                recomendaciones,
            ]
        );

    res.send({
        id_paciente: rows.insertId,
        expediente_paciente,
        nombre_paciente,
        apellido_paterno,
        apellido_materno,
        sexo_paciente,
        edad_paciente,
        nacionalidad,
        domicilio,
        colonia,
        alcaldia_municipio,
        entidadFederativa,
        diagnostico,
        cuidadorPrimario,
        tipoPrograma,
    });
};

pacientesCtrls.getPacientes = async (req, res) => {
    const [rows] = await pool.promise().query("SELECT * FROM pacientes");
    res.json(rows);
};

pacientesCtrls.getPacienteById = async (req, res) => {
    const id_paciente = req.params.id; // Obtener el ID del paciente de los parámetros de la solicitud
    const [rows] = await pool
        .promise()
        .query("SELECT * FROM pacientes WHERE id_paciente = ?", [id_paciente]);

    if (rows.length > 0) {
        res.json(rows[0]); // Devolver el primer paciente encontrado (solo debería haber uno)
    } else {
        res.status(404).send("Paciente no encontrado"); // Si no se encuentra ningún paciente con ese ID, devolver un mensaje de error
    }
};

pacientesCtrls.getExpedientes = async (req, res) => {
    const [rows] = await pool
        .promise()
        .query("SELECT DISTINCT expediente_paciente FROM pacientes");
    const expedientes = rows.map((row) => row.expediente_paciente);
    res.json(expedientes);
};

pacientesCtrls.updatePaciente = async (req, res) => {
    const id_paciente = req.params.id; // Obtener el ID del paciente de los parámetros de la solicitud
    const {
        expediente_paciente,
        nombre_paciente,
        apellido_paterno,
        apellido_materno,
        sexo_paciente,
        edad_paciente,
        nacionalidad,
        domicilio,
        colonia,
        alcaldia_municipio,
        entidadFederativa,
        diagnostico,
        cuidadorPrimario,
        tipoPrograma,
        observaciones,
        recomendaciones,
    } = req.body;

    // Construir la consulta de actualización dinámicamente con los campos que se desean actualizar
    let query = "UPDATE pacientes SET ";
    let values = [];

    if (expediente_paciente) {
        query += "expediente_paciente = ?, ";
        values.push(expediente_paciente);
    }
    if (nombre_paciente) {
        query += "nombre_paciente = ?, ";
        values.push(nombre_paciente);
    }
    if (apellido_paterno) {
        query += "apellido_paterno = ?, ";
        values.push(apellido_paterno);
    }
    if (apellido_materno) {
        query += "apellido_materno = ?, ";
        values.push(apellido_materno);
    }
    if (sexo_paciente) {
        query += "sexo_paciente = ?, ";
        values.push(sexo_paciente);
    }
    if (edad_paciente) {
        query += "edad_paciente = ?, ";
        values.push(edad_paciente);
    }
    if (nacionalidad) {
        query += "nacionalidad = ?, ";
        values.push(nacionalidad);
    }
    if (domicilio) {
        query += "domicilio = ?, ";
        values.push(domicilio);
    }
    if (colonia) {
        query += "colonia = ?, ";
        values.push(colonia);
    }
    if (alcaldia_municipio) {
        query += "alcaldia_municipio = ?, ";
        values.push(alcaldia_municipio);
    }
    if (entidadFederativa) {
        query += "entidadFederativa = ?, ";
        values.push(entidadFederativa);
    }
    if (diagnostico) {
        query += "diagnostico = ?, ";
        values.push(diagnostico);
    }
    if (cuidadorPrimario) {
        query += "cuidadorPrimario = ?, ";
        values.push(cuidadorPrimario);
    }
    if (tipoPrograma) {
        query += "tipoPrograma = ?, ";
        values.push(tipoPrograma);
    }
    if (observaciones) {
        query += "observaciones = ?, ";
        values.push(observaciones);
    }
    if (recomendaciones) {
        query += "recomendaciones = ?, ";
        values.push(recomendaciones);
    }

    // Eliminar la coma extra al final de la cadena y agregar la condición WHERE
    query = query.slice(0, -2) + " WHERE id_paciente = ?";

    // Agregar el ID del paciente al array de valores
    values.push(id_paciente);

    // Continuar con la actualización en la base de datos
    const [rows] = await pool.promise().query(query, values);

    res.send({
        message: "Paciente updated successfully",
        id_paciente,
        expediente_paciente,
        nombre_paciente,
        apellido_paterno,
        apellido_materno,
        sexo_paciente,
        edad_paciente,
        nacionalidad,
        domicilio,
        colonia,
        alcaldia_municipio,
        entidadFederativa,
        diagnostico,
        cuidadorPrimario,
        tipoPrograma,
        observaciones,
        recomendaciones,
    });
};

pacientesCtrls.deletePaciente = async (req, res) => {
    const id_paciente = req.params.id; // Obtener el ID del paciente de los parámetros de la solicitud

    try {
        // Realizar la eliminación en la base de datos
        await pool
            .promise()
            .query("DELETE FROM pacientes WHERE id_paciente = ?", [
                id_paciente,
            ]);
        res.status(200).json({ message: "Paciente eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el paciente:", error);
        res.status(500).json({ error: "Error al eliminar el paciente" });
    }
};

// Suplencias

pacientesCtrls.addSuplencia = async (req, res) => {
    const {
        id_paciente,
        id_cuidador_paciente,
        dia_suplencia,
        hora_inicial,
        hora_final,
        costoGuardia,
        particular,
    } = req.body;

    console.log(req.body); // Mostrar el contenido de req.body en la consola

    const [rows] = await pool
        .promise()
        .query(
            "INSERT INTO suplencias (id_paciente, id_cuidador_paciente, dia_suplencia, hora_inicial, hora_final, costoGuardia, particular) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
                id_paciente,
                id_cuidador_paciente,
                dia_suplencia,
                hora_inicial,
                hora_final,
                costoGuardia,
                particular,
            ]
        );

    res.send({
        id_paciente,
        id_cuidador_paciente,
        dia_suplencia,
        hora_inicial,
        hora_final,
        costoGuardia,
        particular,
    });
};

// Cuidadores

pacientesCtrls.addCuidador = async (req, res) => {
    const {
        id_cuidador_paciente,
        nombreCuidador,
        apPatCuidador,
        apMatCuidador,
        sexoCuidador,
        edadCuidador,
        telefonoCuidador,
        num_suplencias,
    } = req.body;

    console.log(req.body); // Mostrar el contenido de req.body en la consola

    const [rows] = await pool
        .promise()
        .query(
            "INSERT INTO cuidadores (id_cuidador_paciente, nombreCuidador, apPatCuidador, apMatCuidador, sexoCuidador, edadCuidador, telefonoCuidador, num_suplencias) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [
                id_cuidador_paciente,
                nombreCuidador,
                apPatCuidador,
                apMatCuidador,
                sexoCuidador,
                edadCuidador,
                telefonoCuidador,
                num_suplencias,
            ]
        );

    res.send({
        id_cuidador_paciente: rows.insertId,
        nombreCuidador,
        apPatCuidador,
        apMatCuidador,
        sexoCuidador,
        edadCuidador,
        telefonoCuidador,
        num_suplencias,
    });
};

pacientesCtrls.getCuidadores = async (req, res) => {
    const [rows] = await pool.promise().query("SELECT * FROM cuidadores");
    res.json(rows);
};

pacientesCtrls.searchCuidadorAutoComplete = async (req, res) => {
    const textoBusquedaCuidador = req.query.buscarAlcuidador;
    const [rows] = await pool
        .promise()
        .query(
            "SELECT * FROM cuidadores WHERE nombreCuidador LIKE ? OR apPatCuidador LIKE ? OR apMatCuidador LIKE ?",
            [
                `%${textoBusquedaCuidador}%`,
                `%${textoBusquedaCuidador}%`,
                `%${textoBusquedaCuidador}%`,
            ]
        );
    res.json(rows);
};

pacientesCtrls.getCuidadorById = async (req, res) => {
    const id_cuidador_paciente = req.params.id; // Obtener el ID del cuidador de los parámetros de la solicitud
    const [rows] = await pool
        .promise()
        .query("SELECT * FROM cuidadores WHERE id_cuidador_paciente = ?", [
            id_cuidador_paciente,
        ]);

    if (rows.length > 0) {
        res.json(rows[0]); // Devolver el primer cuidador encontrado (solo debería haber uno)
    } else {
        res.status(404).send("Cuidador no encontrado"); // Si no se encuentra ningún cuidador con ese ID, devolver un mensaje de error
    }
};

pacientesCtrls.updateCuidador = async (req, res) => {
    const id_cuidador_paciente = req.params.id; // Obtener el ID del cuidador de los parámetros de la solicitud
    const {
        nombreCuidador,
        apPatCuidador,
        apMatCuidador,
        sexoCuidador,
        edadCuidador,
        telefonoCuidador,
        num_suplencias,
    } = req.body;

    // Construir la consulta de actualización dinámicamente con los campos que se desean actualizar
    let query = "UPDATE cuidadores SET ";
    let values = [];

    if (nombreCuidador) {
        query += "nombreCuidador = ?, ";
        values.push(nombreCuidador);
    }
    if (apPatCuidador) {
        query += "apPatCuidador = ?, ";
        values.push(apPatCuidador);
    }
    if (apMatCuidador) {
        query += "apMatCuidador = ?, ";
        values.push(apMatCuidador);
    }
    if (sexoCuidador) {
        query += "sexoCuidador = ?, ";
        values.push(sexoCuidador);
    }
    if (edadCuidador) {
        query += "edadCuidador = ?, ";
        values.push(edadCuidador);
    }
    if (telefonoCuidador) {
        query += "telefonoCuidador = ?, ";
        values.push(telefonoCuidador);
    }
    if (num_suplencias) {
        query += "num_suplencias = ?, ";
        values.push(num_suplencias);
    }

    // Eliminar la coma extra al final de la cadena y agregar la condición WHERE
    query = query.slice(0, -2) + " WHERE id_cuidador_paciente = ?";

    // Agregar el ID del cuidador al array de valores
    values.push(id_cuidador_paciente);

    // Continuar con la actualización en la base de datos
    const [rows] = await pool.promise().query(query, values);

    res.send({
        message: "Cuidador updated successfully",
        id_cuidador_paciente,
        nombreCuidador,
        apPatCuidador,
        apMatCuidador,
        sexoCuidador,
        edadCuidador,
        telefonoCuidador,
        num_suplencias,
    });
};

module.exports = pacientesCtrls;
