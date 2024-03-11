// variable
const controller = {};


// reportes
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM pacientes;', (err, pacientes) => {
            if(err){
                next(err)
            }

            else{//vista
                res.render('pacientes', {
                    data: pacientes //variable data
                }) 
            }


        })
    })
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



module.exports = controller