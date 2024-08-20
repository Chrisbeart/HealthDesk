const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function getMySQLConnection() {
    const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    });
    return connection;
}

module.exports = { getMySQLConnection };
