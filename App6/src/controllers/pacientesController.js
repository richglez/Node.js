const controller = {};
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
}


module.exports = controller