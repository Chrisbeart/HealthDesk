const mysql = require('mysql2/promise');
require('dotenv').config();

async function getMySQLConnection() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        multipleStatements: process.env.DB_MULTIPLE_STATEMENTS === 'true'
    });

    return connection;
}

module.exports = { getMySQLConnection };
