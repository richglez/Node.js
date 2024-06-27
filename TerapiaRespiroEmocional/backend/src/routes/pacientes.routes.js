// importaciones
const { Router } = require('express');
const pacientesCtrls = require('../controllers/pacientes.controller');

// new object
const router = Router();

// routes pacientes CRUD
router.get('/pacientes', pacientesCtrls.getPacientes);
router.get('/pacientes/search', pacientesCtrls.searchPacienteAutoComplete);
router.get('/pacientes/total-pacientes', pacientesCtrls.getTotalPacientes); // Mover esta ruta antes de '/pacientes/:id'
router.get('/pacientes/total-pacientes-menores', pacientesCtrls.getTotalPacientesMenores);
router.get('/pacientes/total-pacientes-mayores', pacientesCtrls.getTotalPacientesMayores);
router.get('/pacientes/total-programas-cecpam', pacientesCtrls.getTotalProgramasCECPAM);
router.get('/pacientes/:id', pacientesCtrls.getPacienteById);
router.post('/pacientes', pacientesCtrls.addPaciente);
router.put('/pacientes/:id', pacientesCtrls.updatePaciente);
router.delete('/pacientes/:id', pacientesCtrls.deletePaciente);
router.get('/pacientes/expedientes', pacientesCtrls.getExpedientes);
router.get('/pacientes/cuidador/:id', pacientesCtrls.getPacienteByCuidador);



// cuidadores
router.get('/cuidadores', pacientesCtrls.getCuidadores);
router.get('/cuidadores/total-cuidadores', pacientesCtrls.getTotalCuidadores);
router.get('/cuidadores/search', pacientesCtrls.searchCuidadorAutoComplete);
router.get('/cuidadores/:id', pacientesCtrls.getCuidadorById);
router.post('/cuidadores', pacientesCtrls.addCuidador);
router.put('/cuidadores/:id', pacientesCtrls.updateCuidador);
router.delete('/cuidadores/:id', pacientesCtrls.deleteCuidador);
// router.get('/cuidadores/total-suplencias/:id', pacientesCtrls.getTotalSuplenciasPorCuidador);

// suplencias
router.get('/suplencias', pacientesCtrls.getSuplencias);
router.get('/suplencias/buscar', pacientesCtrls.buscarSuplenciasPorCuidadorYPaciente);
router.get('/suplencias/total-suplencias', pacientesCtrls.getTotalSuplencias);
router.post('/suplencias', pacientesCtrls.addSuplencias);
router.put('/suplencias/:id', pacientesCtrls.updateSuplencia);
router.delete('/suplencias/:id', pacientesCtrls.deleteSuplencia);


module.exports = router;
