const fs = require('fs');
const path = require('path');
const { getMySQLConnection } = require('./db');
require('dotenv').config();

async function setupDatabase() {
    const connection = await getMySQLConnection();

    try {
        // Erstellt die Datenbank, falls sie noch nicht existiert
        await connection.query('CREATE DATABASE IF NOT EXISTS patient_data');
        
        // Verwendet die Datenbank
        await connection.query('USE patient_data');

        // Führt das SQL-Schema aus
        const schemaPath = path.join(__dirname, './stammdaten.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');
        await connection.query(schema);

        console.log('Database setup completed successfully!');
    } catch (error) {
        console.error('Error setting up database:', error);
    } finally {
        await connection.end();
    }
}

setupDatabase();
