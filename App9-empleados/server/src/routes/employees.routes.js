// importaciones
const { Router } = require('express');  // enrutador
const employeesCtrls = require('../controllers/employees.controller');

// envioroment variables

// ---new objet
const router = Router()



// routes CRUD
router.get('/employees', employeesCtrls.getEmployees)  // reporte
router.get('/employees/:id', employeesCtrls.searchEmployer) // buscar
router.post('/employees/', employeesCtrls.addEmployer) // alta
router.put('/employees/:id', employeesCtrls.updateEmployee) // actulizar
router.delete('/employees/:id', employeesCtrls.deleteEmployee) // bajas




// export
module.exports = router