const { Router } = require('express');

const router = Router()

router.get('/pacientes', (req, res) => { //Cuando pidan dashboard
    res.render('pacientes')
})

module.exports = router;