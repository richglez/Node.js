const express = require('express');
const app = express()
const morgan = require('morgan');


app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.sendFile('./public/index.html', { //pagina inicial
        root: __dirname
    })
})



app.get('/dashboard', (req, res) => {
    res.send('Panel de control')
})

app.get('/pacientes', (req, res) => {
    res.send('Pacientes')
})

app.listen(3000)


console.log(`Server on port: ${3000}`);
