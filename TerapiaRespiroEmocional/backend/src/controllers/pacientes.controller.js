const { json } = require("express");
const { pool } = require("../database/database");

const pacientesCtrls = {}; // obj

// ----------------PACIENTES----------------
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
    try {
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
            parentesco_con_cuidador,
            tipoPrograma,
            observaciones,
            recomendaciones,
            id_cuidador_paciente,
        } = req.body;

        // Verificar si el expediente ya está en uso
        const [existingExpediente] = await pool
            .promise()
            .query("SELECT * FROM pacientes WHERE expediente_paciente = ?", [
                expediente_paciente,
            ]);

        if (existingExpediente.length > 0) {
            return res
                .status(400)
                .json({ error: "Este expediente ya está en uso" });
        }

        console.log(req.body); // Mostrar el contenido de req.body en la consola

        const [rows] = await pool
            .promise()
            .query(
                "INSERT INTO pacientes (expediente_paciente, nombre_paciente, apellido_paterno, apellido_materno, sexo_paciente, edad_paciente, nacionalidad, domicilio, colonia, alcaldia_municipio, entidadFederativa, diagnostico, parentesco_con_cuidador, tipoPrograma, observaciones, recomendaciones, id_cuidador_paciente) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
                    parentesco_con_cuidador,
                    tipoPrograma,
                    observaciones,
                    recomendaciones,
                    id_cuidador_paciente,
                ]
            );

        res.json({
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
            parentesco_con_cuidador,
            tipoPrograma,
            observaciones,
            recomendaciones,
            id_cuidador_paciente,
        });
    } catch (error) {
        console.error("Error al agregar paciente:", error);
        res.status(500).json({ error: "Error al agregar paciente" });
    }
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

pacientesCtrls.checkExpedienteInUse = async (req, res) => {
    const expediente = req.body.expediente_paciente;
    const [rows] = await pool
        .promise()
        .query("SELECT * FROM pacientes WHERE expediente_paciente = ?", [
            expediente,
        ]);

    if (rows.length > 0) {
        res.json({ error: "Este expediente ya está en uso" });
    } else {
        res.json({ success: "Expediente válido" });
    }
};

pacientesCtrls.getExpedientes = async (req, res) => {
    const [rows] = await pool
        .promise()
        .query("SELECT DISTINCT expediente_paciente FROM pacientes");
    const expedientes = rows.map((row) => row.expediente_paciente);
    res.json(expedientes);
};

pacientesCtrls.getPacienteByCuidador = async (req, res) => {
    const id_cuidador_paciente = req.params.id; // Obtener el ID del cuidador de los parámetros de la solicitud
    try {
        const [rows] = await pool
            .promise()
            .query("SELECT * FROM pacientes WHERE id_cuidador_paciente = ?", [
                id_cuidador_paciente,
            ]);

        if (rows.length > 0) {
            res.json(rows); // Devolver los pacientes relacionados con el cuidador
        } else {
            res.status(404).send(
                "No se encontraron pacientes relacionados con el cuidador"
            ); // Si no se encuentran pacientes relacionados, devolver un mensaje de error
        }
    } catch (error) {
        console.error("Error al obtener pacientes por cuidador:", error);
        res.status(500).send("Error al obtener pacientes por cuidador");
    }
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
        parentesco_con_cuidador,
        tipoPrograma,
        observaciones,
        recomendaciones,
        id_cuidador_paciente, // Nuevo campo para el ID del cuidador
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
    if (parentesco_con_cuidador) {
        query += "parentesco_con_cuidador = ?, ";
        values.push(parentesco_con_cuidador);
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
    if (id_cuidador_paciente) {
        query += "id_cuidador_paciente = ?, ";
        values.push(id_cuidador_paciente);
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
        parentesco_con_cuidador,
        tipoPrograma,
        observaciones,
        recomendaciones,
        id_cuidador_paciente, // Nuevo campo para el ID del cuidador
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

pacientesCtrls.getTotalPacientes = async (req, res) => {
    try {
        const [count] = await pool
            .promise()
            .query("SELECT COUNT(*) as total FROM pacientes");
        res.json(count[0].total);
    } catch (error) {
        console.error("Error en getTotalPacientes:", error);
        res.status(500).json({
            error: "Error al obtener el total de pacientes",
        });
    }
};

pacientesCtrls.getTotalPacientesMenores = async (req, res) => {
    try {
        const [count] = await pool
            .promise()
            .query(
                "SELECT COUNT(*) as total FROM pacientes WHERE edad_paciente < 18"
            );
        res.json(count[0].total);
    } catch (error) {
        console.error("Error en getTotalPacientesMenores:", error);
        res.status(500).json({
            error: "Error al obtener el total de pacientes menores",
        });
    }
};

pacientesCtrls.getTotalPacientesMayores = async (req, res) => {
    try {
        const [count] = await pool
            .promise()
            .query(
                "SELECT COUNT(*) as total FROM pacientes WHERE edad_paciente > 18"
            );
        res.json(count[0].total);
    } catch (error) {
        console.error("Error en getTotalPacientesMenores:", error);
        res.status(500).json({
            error: "Error al obtener el total de pacientes menores",
        });
    }
};

pacientesCtrls.getTotalProgramasCECPAM = async (req, res) => {
    try {
        const [count] = await pool
            .promise()
            .query(
                "SELECT COUNT(*) as total FROM pacientes WHERE tipoPrograma = 'CECPAM'"
            );
        res.json(count[0].total);
    } catch (error) {
        console.error("Error en getTotalProgramasCECPAM:", error);
        res.status(500).json({
            error: "Error al obtener el total de programas CECPAM",
        });
    }
};

// ----------------SUPLENCIAS----------------
pacientesCtrls.getSuplencias = async (req, res) => {
    const [rows] = await pool.promise().query("SELECT * FROM suplencias");
    res.json(rows);
};

pacientesCtrls.addSuplencias = async (req, res) => {
    try {
        const {
            dia_suplencia,
            hora_inicial,
            hora_final,
            costoGuardia,
            particular,
            concurrencia_anual,
            id_cuidador_paciente,
            id_paciente,
        } = req.body;

        console.log(req.body); // Mostrar el contenido de req.body en la consola

        const [rows] = await pool
            .promise()
            .query(
                "INSERT INTO suplencias (dia_suplencia, hora_inicial, hora_final, costoGuardia, particular, concurrencia_anual, id_cuidador_paciente, id_paciente) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [
                    dia_suplencia,
                    hora_inicial,
                    hora_final,
                    costoGuardia,
                    particular,
                    concurrencia_anual,
                    id_cuidador_paciente,
                    id_paciente,
                ]
            );

        res.json({
            id_suplencia: rows.insertId,
            dia_suplencia,
            hora_inicial,
            hora_final,
            costoGuardia,
            particular,
            concurrencia_anual,
            id_cuidador_paciente,
            id_paciente,
        });
    } catch (error) {
        console.error("Error al agregar la suplencia:", error);
        res.status(500).json({ error: "Error al agregar la suplencia" });
    }
};

//update
pacientesCtrls.updateSuplencia = async (req, res) => {
    const id_suplencia = req.params.id; // Asegúrate de obtener el id correctamente
    const { dia_suplencia } = req.body;
  
    let query = "UPDATE suplencias SET ";
    let values = [];
  
    if (dia_suplencia) {
      query += "dia_suplencia = ?, ";
      values.push(dia_suplencia);
    }
  
    query = query.slice(0, -2) + " WHERE id_suplencia = ?";
    values.push(id_suplencia);
  
    try {
      const [rows] = await pool.promise().query(query, values);
      res.send({
        message: "Suplencia actualizada exitosamente",
        id_suplencia,
        dia_suplencia,
      });
    } catch (error) {
      console.error("Er al actualizar suplencia:", error);
      res.status(500).send("Error al actualizar suplencia");
    }
  };
  


pacientesCtrls.deleteSuplencia = async (req, res) => {
    const id_suplencia = req.params.id; // Obtener el ID del paciente de los parámetros de la solicitud

    try {
        // Realizar la eliminación en la base de datos
        await pool
            .promise()
            .query("DELETE FROM suplencias WHERE id_suplencia = ?", [
                id_suplencia,
            ]);
        res.status(200).json({ message: "Suplencia eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar la suplencia:", error);
        res.status(500).json({ error: "Error al eliminar la suplencia" });
    }
};

// buscar suplencias por cuidador y paciente
pacientesCtrls.buscarSuplenciasPorCuidadorYPaciente = async (req, res) => {
    const { id_cuidador, id_paciente } = req.query;
    const [rows] = await pool
        .promise()
        .query(
            "SELECT * FROM suplencias WHERE id_cuidador_paciente = ? AND id_paciente = ?",
            [id_cuidador, id_paciente]
        );
    res.json(rows);
};

pacientesCtrls.getTotalSuplenciasPorCuidador = async (req, res) => {
    const id_cuidador = req.params.id;

    try {
        const [rows] = await pool
            .promise()
            .query(
                "SELECT COUNT(*) AS total_suplencias FROM suplencias WHERE id_cuidador_paciente = ?",
                [id_cuidador]
            );

        if (rows.length > 0) {
            res.json({ total_suplencias: rows[0].total_suplencias });
        } else {
            res.status(404).send("Cuidador no encontrado");
        }
    } catch (error) {
        console.error("Error al obtener el total de suplencias:", error);
        res.status(500).send("Error al obtener el total de suplencias");
    }
};

pacientesCtrls.getTotalSuplencias = async (req, res) => {
    try {
        const [count] = await pool
            .promise()
            .query("SELECT COUNT(*) as total FROM suplencias");
        res.json(count[0].total);
    } catch (error) {
        console.error("Error en getTotalSuplencias:", error);
        res.status(500).json({
            error: "Error al obtener el total de suplencias",
        });
    }
};

// ----------------CUIDADORES----------------

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

pacientesCtrls.deleteCuidador = async (req, res) => {
    const id_paciente = req.params.id; // Obtener el ID del paciente de los parámetros de la solicitud

    try {
        // Realizar la eliminación en la base de datos
        await pool
            .promise()
            .query("DELETE FROM cuidadores WHERE id_cuidador_paciente = ?", [
                id_paciente,
            ]);
        res.status(200).json({ message: "Cuidador eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el cuidador:", error);
        res.status(500).json({ error: "Error al eliminar el cuidador" });
    }
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

pacientesCtrls.getTotalCuidadores = async (req, res) => {
    try {
        const [count] = await pool
            .promise()
            .query("SELECT COUNT(*) as total FROM cuidadores");
        res.json(count[0].total);
    } catch (error) {
        console.error("Error en getTotalCuidadores:", error);
        res.status(500).json({
            error: "Error al obtener el total de cuidadores",
        });
    }
};

module.exports = pacientesCtrls;
