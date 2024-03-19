const { json } = require("express");
const { pool } = require("../database/database");

const employeesCtrls = {}; // obj

employeesCtrls.getEmployees = async (req, res) => {
    const [rows] = await pool.promise().query("SELECT * FROM empleado");
    res.json(rows);
};

employeesCtrls.searchEmployer = async (req, res) => {
    const [rows] = await pool
        .promise()
        .query("SELECT * FROM empleado WHERE id_employee = ?", [req.params.id]);

    if (rows.length <= 0) {
        return res.status(404).json({
            message: "No se encontro este empleado",
        });
    }
    console.log(rows);
    res.json(rows[0]);
};

employeesCtrls.addEmployer = async (req, res) => {
    const { name_employee, salary_employee } = req.body;
    const [rows] = await pool
        .promise()
        .query(
            "INSERT INTO empleado (name_employee, salary_employee) VALUES (?, ?)",
            [name_employee, salary_employee]
        );
    res.send({
        id_employee: rows.insertId,
        name_employee,
        salary_employee,
    });
};

employeesCtrls.updateEmployee = async (req, res) => {
    const { id_employee, name_employee, salary_employee } = req.body;
    const [rows] = await pool
        .promise()
        .query(
            "UPDATE empleado SET name_employee = ?, salary_employee = ? WHERE id_employee = ?",
            [name_employee, salary_employee, id_employee]
        );
    res.send({
        message: "Employee updated successfully",
        id_employee,
        name_employee,
        salary_employee,
    });
};

employeesCtrls.deleteEmployee = async (req, res) => {
    const [result] = await pool
    .promise()
    .query('DELETE FROM empleado WHERE id_employee = ?', [req.params.id])

    if (result.affectedRows <= 0) {
        return res.status(404).json({
            message: "Employe not found"
        })
    }

    res.sendStatus(204)


};


module.exports = employeesCtrls;
