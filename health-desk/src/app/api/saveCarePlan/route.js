import { NextResponse } from 'next/server';
import { getMySQLConnection } from '../../../database/MySQL/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { goalsAndMeasures, patientId } = body;

    const connection = await getMySQLConnection();

    const query = `
      INSERT INTO care_plan (patientId, name, goal, measures, responsibilities, status) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    for (const { name, goal, measures, responsibilities, status } of goalsAndMeasures) {
      await connection.query(query, [patientId, name, goal, measures, responsibilities, status]);
    }

    await connection.end();

    return NextResponse.json({ message: 'Daten erfolgreich gespeichert' }, { status: 201 });
  } catch (error) {
    console.error('Fehler beim Speichern der Pflegeplanung:', error);
    return NextResponse.json({ message: 'Fehler beim Speichern der Pflegeplanung', error: error.message }, { status: 500 });
  }
}
