// importaciones
const { Router } = require('express');  // enrutador
const pacientesCtrls = require('../controllers/pacientes.controller');

// envioroment variables

// ---new objet
const router = Router()



// routes CRUD
router.get('/pacientes', pacientesCtrls.getPacientes)  // reporte
router.get('/paciente/:id', pacientesCtrls.searchPaciente) // buscar
router.post('/paciente/', pacientesCtrls.addPaciente) // alta
router.put('/paciente/:id', pacientesCtrls.updatePaciente) // actulizar
router.delete('/paciente/:id', pacientesCtrls.deletePaciente) // bajas




// export
module.exports = router