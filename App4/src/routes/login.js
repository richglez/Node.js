const { Router } = require('express');

const router = Router()



router.get('/login', (req, res) => { //Cuando pidan dashboard
    const Subtitle = 'Subtitulo creado dese el backend'
    res.render('login', { Subtitle })
    
})

module.exports = router;