// importaciones
const { Router } = require('express');  // enrutador
const pacientesCtrls = require('../controllers/pacientes.controller');

// envioroment variables

// ---new objet
const router = Router()



// routes CRUD
router.get('/pacientes', pacientesCtrls.getPacientes)  // reporte
router.get('/pacientes/search', pacientesCtrls.searchPaciente);
router.post('/pacientes', pacientesCtrls.addPaciente) // alta
router.put('/pacientes/:id', pacientesCtrls.updatePaciente) // actulizar
router.delete('/pacientes/:id', pacientesCtrls.deletePaciente) // bajas




// export
module.exports = router