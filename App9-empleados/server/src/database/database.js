const { createPool } = require("mysql2/promise");

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'thisismy%4646%',
    port: 3306,
    database: 'dbcompany1'
});

module.exports = pool;
