import { NextResponse } from 'next/server';
import { getMySQLConnection } from '../../../database/MySQL/db';

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('Empfangene Daten:', body);

    const {
      patientId,
      currentHealth,
      psychologicalSupport,
      socialSupport,
      spiritualSupport,
    } = body;

    // Verbindung zur Datenbank herstellen
    const connection = await getMySQLConnection();

    // SQL-Abfrage zum Einfügen der Daten
    const query = `
      INSERT INTO psychosocial_support 
      (patientId, currentHealth, psychologicalSupport, socialSupport, spiritualSupport) 
      VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
      patientId,
      currentHealth,
      psychologicalSupport,
      socialSupport,
      spiritualSupport
    ];

    // Ausführung der SQL-Abfrage
    const [result] = await connection.query(query, values);
    console.log('Datenbank-Insert-Ergebnis:', result);

    // Verbindung beenden
    await connection.end();

    // Erfolgreiche Antwort
    return NextResponse.json({ message: 'Daten erfolgreich gespeichert' }, { status: 201 });
  } catch (error) {
    console.error('Fehler beim Speichern der Daten:', error);
    return NextResponse.json({ message: 'Fehler beim Speichern der Daten', error: error.message }, { status: 500 });
  }
}
