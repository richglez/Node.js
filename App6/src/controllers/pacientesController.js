// variable
const controller = {};


// reportes
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM pacientes;', (err, pacientesList) => {
            if (err) {
                next(err);
                return;
            }

            // Renderizar la vista 'pacientes' con la lista de pacientes
            res.render('pacientes', {
                data: pacientesList // variable data
            });
        });
    });
};



// dar de alta 
controller.save = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error de conexión a la base de datos');
            return;
        }

        conn.query('INSERT INTO pacientes SET ?', [data], (err, newPaciente) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error al insertar el paciente');
                return;
            }

            else{
                //agrega el paciente nuevo
                console.log("Paciente insertado correctamente en la base de datos");
                res.redirect('/'); //redirige a la pagina incial
            }


        });
    });
};



// dar cambios
controller.updateGet = (req, res) => { //btn obtener datos
    const idPaciente = req.params.idPaciente;

    req.getConnection((err, conn) => {
        if(err){
            console.error(err);
            res.status(500).send('Error de conexión a la base de datos');
            return;
        }

        else{
            conn.query('SELECT * FROM pacientes WHERE id = ?', [idPaciente], (err, paciente) => {
                res.render('pacientes_edit', {
                    data: paciente[0]
                })
            })
        }
    })
};

controller.updatePost = (req, res) => { //btn actulizar
    const idPaciente = req.params.idPaciente;
    const dataUpate = req.body;

    req.getConnection((err, conn) => {
        if(err){
            console.error(err);
            res.status(500).send('Error de conexión a la base de datos');
            return;
        }
        else{
            conn.query('UPDATE pacientes SET ? WHERE ID = ?', [dataUpate, idPaciente], (err, updatePaciente) => {
                if(err){
                    console.error(err);
                    res.status(500).send('Error al eliminar el paciente');
                    return;
                }

                else{
                    //agrega el paciente nuevo
                    console.log("Paciente actualizado correctamente en la base de datos");
                    res.redirect('/'); //redirige a la pagina incial
                }
            })
        }
    })
    
}






// dar de baja
controller.delete = (req, res) => {
    const idPaciente = req.params.idPaciente;

    req.getConnection((err, conn) => {
        if(err){
            console.error(err);
            res.status(500).send('Error de conexión a la base de datos');
            return;
        }
        else{
            conn.query('DELETE FROM pacientes WHERE ID = ?', [idPaciente], (err, delPaciente) => {
                if(err){
                    console.error(err);
                    res.status(500).send('Error al eliminar el paciente');
                    return;
                }

                else{
                    //agrega el paciente nuevo
                    console.log("Paciente eliminado correctamente en la base de datos");
                    res.redirect('/'); //redirige a la pagina incial
                }
            })
        }
    })
};



module.exports = controller