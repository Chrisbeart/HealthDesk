import { NextResponse } from 'next/server';
import { getMySQLConnection } from '../../../database/MySQL/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get('patientId');

    if (!patientId) {
      return NextResponse.json({ message: 'patientId is required' }, { status: 400 });
    }

    const connection = await getMySQLConnection();

    // Fetch the patient data based on the ID
    const [patientRows] = await connection.query(`
      SELECT id, vorname, nachname, geburtsdatum, geschlecht, nationalitaet, adresse, plz, stadt, land, telefon, email, versicherungsnummer, notfallkontakt, notfalltelefon, zimmernummer
      FROM patients
      WHERE id = ?
    `, [patientId]);

    if (patientRows.length === 0) {
      return NextResponse.json({ message: 'Patient not found' }, { status: 404 });
    }

    const patient = patientRows[0];

    await connection.end();

    return NextResponse.json({ patient }, { status: 200 });
  } catch (error) {
    console.error('Error fetching patient data:', error);
    return NextResponse.json({ message: 'Error fetching patient data', error: error.message }, { status: 500 });
  }
}
