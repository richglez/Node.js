// importaciones
const { Router } = require('express');  // enrutador
const pacientesCtrls = require('../controllers/pacientes.controller');

// envioroment variables

// ---new objet
const router = Router()



// routes pacientes CRUD
router.get('/pacientes', pacientesCtrls.getPacientes)  // reporte
router.get('/pacientes/search', pacientesCtrls.searchPacienteAutoComplete);
router.get('/pacientes/:id', pacientesCtrls.getPacienteById);
router.post('/pacientes', pacientesCtrls.addPaciente) // alta
router.put('/pacientes/:id', pacientesCtrls.updatePaciente) // actulizar
router.delete('/pacientes/:id', pacientesCtrls.deletePaciente) // bajas
router.get('/pacientes/expedientes', pacientesCtrls.getExpedientes);


//
router.post('/pacientes/suplencias', pacientesCtrls.addSuplencia)

// export
module.exports = router