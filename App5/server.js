const express = require('express');
const morgan = require('morgan');

const app = express()

app.use(morgan('dev'))

app.get('/products', (req, res) => {
    res.send('Obteniendo productos')
})
app.post('/products', (req, res) => {
    res.send('creando productos')
})
app.put('/products', (req, res) => {
    res.send('actualizando productos')
})
app.delete('/products', (req, res) => {
    res.send('eliminando productos')
})
app.get('/products/:id', (req, res) => {
    res.send('Obteniendo producto')
})

app.listen(3000)
console.log(`Server on port: ${3000}`)