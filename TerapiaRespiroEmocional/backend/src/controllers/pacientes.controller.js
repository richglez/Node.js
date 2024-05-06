const { json } = require("express");
const { pool } = require("../database/database");

const pacientesCtrls = {}; // obj

pacientesCtrls.searchPacienteAutoComplete = async (req, res) => {
    const textoBusquedaPaciente = req.query.buscarAlpaciente;
    const [rows] = await pool
        .promise()
        .query(
            "SELECT * FROM pacientes WHERE nombre_paciente LIKE ? OR apellido_paterno LIKE ? OR apellido_materno LIKE ?",
            [`%${textoBusquedaPaciente}%`, `%${textoBusquedaPaciente}%`, `%${textoBusquedaPaciente}%`]
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

    // Validar que los campos requeridos no estén vacíos
    if (
        !expediente_paciente ||
        !nombre_paciente ||
        !apellido_paterno ||
        !apellido_materno ||
        !sexo_paciente ||
        !edad_paciente ||
        !nacionalidad ||
        !domicilio ||
        !colonia ||
        !entidadFederativa ||
        !diagnostico ||
        !cuidadorPrimario ||
        !tipoPrograma
    ) {
        return res
            .status(400)
            .json({ error: "Todos los campos son obligatorios" });
    }

    // Validar tipos de datos (por ejemplo, asegurarse de que edad_paciente sea un número)
    if (typeof edad_paciente !== "number") {
        return res.status(400).json({ error: "La edad debe ser un número" });
    }

    // Continuar con la actualización en la base de datos
    const [rows] = await pool
        .promise()
        .query(
            "UPDATE pacientes SET expediente_paciente = ?, nombre_paciente = ?, apellido_paterno = ?, apellido_materno = ?, sexo_paciente = ?, edad_paciente = ?, nacionalidad = ?, domicilio = ?, colonia = ?, alcaldia_municipio = ?, entidadFederativa = ?, diagnostico = ?, cuidadorPrimario = ?, tipoPrograma = ?, observaciones = ?, recomendaciones = ?  WHERE id_paciente = ?",
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
                id_paciente,
            ]
        );

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
            [`%${textoBusquedaCuidador}%`, `%${textoBusquedaCuidador}%`, `%${textoBusquedaCuidador}%`]
        );
    res.json(rows);
};




pacientesCtrls.getCuidadorById = async (req, res) => {
    const id_cuidador_paciente = req.params.id; // Obtener el ID del cuidador de los parámetros de la solicitud
    const [rows] = await pool
        .promise()
        .query("SELECT * FROM cuidadores WHERE id_cuidador_paciente = ?", [id_cuidador_paciente]);

    if (rows.length > 0) {
        res.json(rows[0]); // Devolver el primer cuidador encontrado (solo debería haber uno)
    } else {
        res.status(404).send("Cuidador no encontrado"); // Si no se encuentra ningún cuidador con ese ID, devolver un mensaje de error
    }
};



module.exports = pacientesCtrls;
