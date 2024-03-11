//require - imports
const express = require('express');
const pacientesController = require('../controllers/pacientesController');
//variables
const router = express.Router()



router.get('/', pacientesController.list)
router.post('/add', pacientesController.save) //Guardar registro datos del paciente
router.get('/delete/:idPaciente', pacientesController.delete)  //Borrar datos del paciente
router.get('/update/:idPaciente', pacientesController.updateGet)  //Obtener datos del paciente
router.post('/update/:idPaciente', pacientesController.updatePost)  //Actualizar datos del paciente

module.exports = router
