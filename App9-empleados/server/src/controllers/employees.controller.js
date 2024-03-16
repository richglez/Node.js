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
            "INSERT INTO Empleado (name_employee, salary_employee) VALUES (?, ?)",
            [name_employee, salary_employee]
        );
    res.send({
        id_employee: rows.insertId,
        name_employee,
        salary_employee,
    });
};

employeesCtrls.updateEmployer = (req, res) => {
    res.send("updating employer");
};

employeesCtrls.delEmployer = (req, res) => {
    res.send("deleting employer");
};

module.exports = employeesCtrls;
