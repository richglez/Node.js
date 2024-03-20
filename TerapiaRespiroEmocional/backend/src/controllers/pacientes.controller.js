const { json } = require("express");
const { pool } = require("../database/database");

const pacientesCtrls = {}; // obj

pacientesCtrls.getPacientes = async (req, res) => {
    res.send('Hola')
};

pacientesCtrls.searchPaciente = async (req, res) => {
    res.send('Hola')
};

pacientesCtrls.addPaciente = async (req, res) => {
    res.send('Hola')
};

pacientesCtrls.updatePaciente = async (req, res) => {
    res.send('Hola')
}

pacientesCtrls.deletePaciente = async (req, res) => {
    res.send('Hola')
};


module.exports = pacientesCtrls;

