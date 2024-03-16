const { pool } = require('../database/database');

const employeesCtrls = {} // obj

employeesCtrls.getEmployees = (req, res) => {
    res.send('requesting all employees')
}

employeesCtrls.searchEmployer = (req, res) => {
    res.send('requesting employer')
}

employeesCtrls.addEmployer = async (req, res) => {
    const { name_employee, salary_employee } = req.body;
    const [rows] = await pool.promise().query('INSERT INTO Empleado (name_employee, salary_employee) VALUES (?, ?)', [name_employee, salary_employee]);
    res.send({ rows });
}

employeesCtrls.updateEmployer = (req, res) => {
    res.send('updating employer')
}

employeesCtrls.delEmployer = (req, res) => {
    res.send('deleting employer')
}

module.exports = employeesCtrls;
