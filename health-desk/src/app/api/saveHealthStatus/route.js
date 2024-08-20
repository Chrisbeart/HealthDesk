import { NextResponse } from 'next/server';
import { getMySQLConnection } from '../../../database/MySQL/db';

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      patientId,
      currentHealthStatus,
      medicalHistory,
      allergies,
      medications,
    } = body;

    const connection = await getMySQLConnection();

    const query = `
      INSERT INTO health_status 
      (patientId, currentHealthStatus, medicalHistory, allergies, medications) 
      VALUES (?, ?, ?, ?, ?)
    `;

    const values = [patientId, currentHealthStatus, medicalHistory, allergies, medications];

    const [result] = await connection.query(query, values);

    await connection.end();

    return NextResponse.json({ message: 'Gesundheitszustand erfolgreich gespeichert' }, { status: 201 });
  } catch (error) {
    console.error('Fehler beim Speichern des Gesundheitszustands:', error);
    return NextResponse.json({ message: 'Fehler beim Speichern des Gesundheitszustands', error: error.message }, { status: 500 });
  }
}
