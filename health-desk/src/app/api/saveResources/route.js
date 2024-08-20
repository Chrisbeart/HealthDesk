import { NextResponse } from 'next/server';
import { getMySQLConnection } from '../../../database/MySQL/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { resources, supportNetwork, copingStrategies, previousTherapies, patientId } = body;

    const connection = await getMySQLConnection();

    const query = `
      INSERT INTO resources (patientId, resources, supportNetwork, copingStrategies, previousTherapies) 
      VALUES (?, ?, ?, ?, ?)
    `;

    await connection.query(query, [patientId, resources, supportNetwork, copingStrategies, previousTherapies]);

    await connection.end();

    return NextResponse.json({ message: 'Daten erfolgreich gespeichert' }, { status: 201 });
  } catch (error) {
    console.error('Fehler beim Speichern der Daten:', error);
    return NextResponse.json({ message: 'Fehler beim Speichern der Daten', error: error.message }, { status: 500 });
  }
}
