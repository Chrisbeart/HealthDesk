const mysql = require('mysql2/promise');
require('dotenv').config();

async function getMySQLConnection() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        multipleStatements: process.env.DB_MULTIPLE_STATEMENTS === 'true',
<<<<<<< HEAD
        database: process.env.DB_NAME,

=======
        database: process.env.DB_NAME
>>>>>>> cd85a4846ea21352672165bc646a0911501bb8ab
    });

    return connection;
}

module.exports = { getMySQLConnection };
