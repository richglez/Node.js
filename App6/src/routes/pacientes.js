//require - imports
const express = require('express');
const pacientesController = require('../controllers/pacientesController');
//variables
const router = express.Router()



router.get('/', pacientesController.list)

router.post('/add', pacientesController.save)

module.exports = router
