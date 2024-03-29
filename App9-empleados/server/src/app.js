// app

// importaciones
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// importando rutas...
const employeesRouter = require('./routes/employees.routes');

// enviroment variables
const app = express()

// cors - aceptar otras peticiones
app.use(cors())

//jsons
app.use(express.json()); 


//rutas
app.use('/api',employeesRouter); 


app.set('port', process.env.PORT || 4000) // si existe un puerto disponible usalo, si no usa el 4000

// middleware
app.use(morgan('dev'))







module.exports = app