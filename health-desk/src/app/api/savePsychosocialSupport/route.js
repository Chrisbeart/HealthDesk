import { NextResponse } from 'next/server';
import { getMySQLConnection } from '../../../database/MySQL/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { currentHealth, psychologicalSupport, socialSupport, spiritualSupport, patientId } = body;

    const connection = await getMySQLConnection();

    const query = `
      INSERT INTO psychosocial_support (patientId, currentHealth, psychologicalSupport, socialSupport, spiritualSupport) 
      VALUES (?, ?, ?, ?, ?)
    `;

    await connection.query(query, [patientId, currentHealth, psychologicalSupport, socialSupport, spiritualSupport]);

    await connection.end();

    return NextResponse.json({ message: 'Daten erfolgreich gespeichert' }, { status: 201 });
  } catch (error) {
    console.error('Fehler beim Speichern der Daten:', error);
    return NextResponse.json({ message: 'Fehler beim Speichern der Daten', error: error.message }, { status: 500 });
  }
}
