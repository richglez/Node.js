const { Router } = require('express');

const router = Router()



router.get('/', (req, res) => { //Cuando pidan dashboard
    res.render('home')

})

module.exports = router;