const { Router } = require('express');

const router = Router()

const pacientesDB = [
    {
        "id": 1,
        "name": "Ricardo",
        "lastName": "Gonzalez",
        "age": 22
    },

    {
        "id": 12,
        "name": "Ryan",
        "lastName": "Bill",
        "age":80
    },

]

router.get('/pacientes', (req, res) => { //Cuando pidan dashboard
    res.render('pacientes', {
        pacientesDB
    })
})

module.exports = router;