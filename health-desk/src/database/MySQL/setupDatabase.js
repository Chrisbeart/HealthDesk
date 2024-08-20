const fs = require('fs');
const path = require('path');
const { getMySQLConnection } = require('./db');
require('dotenv').config();

async function setupDatabase() {
    const connection = await getMySQLConnection();

    const schemaPath = path.join(__dirname, './stammdaten.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    try {
        await connection.query(schema);
        console.log('Database setup completed successfully!');
    } catch (error) {
        console.error('Error setting up database:', error);
    } finally {
        await connection.end();
    }
}

setupDatabase();
