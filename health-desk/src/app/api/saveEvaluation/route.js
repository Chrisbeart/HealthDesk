import { NextResponse } from 'next/server';
import { getMySQLConnection } from '../../../database/MySQL/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { evaluation, nurse, management, patientId } = body;

    const connection = await getMySQLConnection();

    const query = `
      INSERT INTO evaluation (patientId, name, responsible, frequency, notes, nurse, management) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    for (const { name, responsible, frequency, notes } of evaluation) {
      await connection.query(query, [patientId, name, responsible, frequency, notes, nurse, management]);
    }

    await connection.end();

    return NextResponse.json({ message: 'Daten erfolgreich gespeichert' }, { status: 201 });
  } catch (error) {
    console.error('Fehler beim Speichern der Evaluation:', error);
    return NextResponse.json({ message: 'Fehler beim Speichern der Evaluation', error: error.message }, { status: 500 });
  }
}
