const { Router } = require('express');

const router = Router()



router.get('/dashboard', (req, res) => { //Cuando pidan dashboard
    res.render('dashboard')
})

module.exports = router;