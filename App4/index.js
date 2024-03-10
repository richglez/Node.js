const express = require('express');
const morgan = require('morgan');

const app = express()

//midlewares
app.use(express.json())
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