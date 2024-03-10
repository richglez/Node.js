const express = require('express');
const morgan = require('morgan');
const path = require('path');
const DashBoardRoutes = require('./routes/dashboard');
const PacientesRoutes = require('./routes/pacientes');
const HomeRoutes = require('./routes/home');
const LoginRoutes = require('./routes/login');
require('ejs');



const app = express()


//settings
app.set('port', 3000)
app.set('AppName', "Respiro Emocional")
app.set('view engine', "ejs")
app.set('views', path.join(__dirname ,"views"))


//midlewares
app.use(express.json())
app.use(morgan('dev'))



//Routes
app.use(DashBoardRoutes)
app.use(PacientesRoutes)
app.use(LoginRoutes)
app.use(HomeRoutes)


//midleware src
app.use("/public", express.static(path.join(__dirname, 'public'))) //Cuando pidan el inicio a la pagina



app.listen(3000)
console.log(`Server on port: ${3000}`);