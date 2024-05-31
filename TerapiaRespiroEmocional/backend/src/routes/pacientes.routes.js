// importaciones
const { Router } = require('express');  // enrutador
const pacientesCtrls = require('../controllers/pacientes.controller');

// envioroment variables

// ---new objet
const router = Router()



// routes pacientes CRUD
router.get('/pacientes', pacientesCtrls.getPacientes)  // reporte todos los pacientes
router.get('/pacientes/search', pacientesCtrls.searchPacienteAutoComplete); // busqueda por nombre, apellidos
router.get('/pacientes/:id', pacientesCtrls.getPacienteById); // busqueda por su id
router.post('/pacientes', pacientesCtrls.addPaciente) // alta paciente
router.put('/pacientes/:id', pacientesCtrls.updatePaciente) // actulizar paciente
router.delete('/pacientes/:id', pacientesCtrls.deletePaciente) // bajas paciente
router.get('/pacientes/expedientes', pacientesCtrls.getExpedientes);
router.get('/pacientes/cuidador/:id', pacientesCtrls.getPacienteByCuidador);



//suplencias
router.post('/suplencias', pacientesCtrls.addSuplencia) //alta suplencia
router.get('/suplencias', pacientesCtrls.getSuplencias) //todas las suplencias
router.get('/suplencias/buscar', pacientesCtrls.buscarSuplenciasPorCuidadorYPaciente); // Ruta para buscar suplencias por cuidador y paciente

//cuidadores
router.get('/cuidadores', pacientesCtrls.getCuidadores)  // reporte todos los cuidadores
router.get('/cuidadores/search', pacientesCtrls.searchCuidadorAutoComplete); // busqueda por nombre, apellidos
router.get('/cuidadores/:id', pacientesCtrls.getCuidadorById); // busqueda por su id
router.post('/cuidadores', pacientesCtrls.addCuidador) // alta cuidador
router.put('/cuidadores/:id', pacientesCtrls.updateCuidador) // actulizar cuidador
router.delete('/cuidadores/:id', pacientesCtrls.deleteCuidador) // bajas paciente
router.get('/cuidadores/total-suplencias/:id', pacientesCtrls.getTotalSuplenciasPorCuidador);

// router.delete('/cuidadores/:id', pacientesCtrls.deletePaciente) // bajas paciente

// export
module.exports = router