// requieres - imports
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mysql2 = require('mysql2');
const myConnection = require('express-myconnection')

// importando rutas...
const pacientesRoutes = require('./routes/pacientes');


// variables
const app = express()



// settings
app.set('appName', 'Aplicacion 6')
app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))

// database
app.use(myConnection(mysql2, {
    host: 'localhost',
    user: 'root',
    password: 'thisismy%4646%',
    port: 3306,
    database: 'db1'
}, 'single'));


// routes
app.use(pacientesRoutes)




//static files
app.use(express.static(path.join(__dirname, './public')))



// start server
app.listen(app.get('port'))
console.log(`Server ${app.get('appName')} on port: ${app.get('port')}`)