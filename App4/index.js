const express = require('express');
const app = express()

app.use(express.text())
app.use(express.json())
app.use(express.urlencoded({extended: false})) //datos desde un formulario

app.get('/hello/:username', (req, res) => {
    console.log(typeof req.params.username)
    res.send(`Hello ${req.params.username.toUpperCase()}`)
})

app.get('/suma/:x/:y', (req, res) => {
    const x = parseFloat(req.params.x)
    const y = parseFloat(req.params.y)
    const r = x+y
    res.send(`La suma de ${req.params.x} + ${req.params.y} = ${r} `)
})


//verificacion:
app.get('/users/:username/photo', (req, res) => {
    if (req.params.username === 'riichh') {
        return res.sendFile('./universal-access-solid-240.png', {
            root: __dirname
        })
    }

    else {
        return res.send('El usuario no tiene acceso al sistema')
    }
})



app.listen(3000)
console.log(`Server on port: ${3000}`);
