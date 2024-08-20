import { NextResponse } from 'next/server';
import { getMySQLConnection } from '../../../database/MySQL/db';

export async function GET() {
  try {
    const connection = await getMySQLConnection();

    // Fetch all patients with all the required fields
    const [patients] = await connection.query(`
      SELECT id, vorname, nachname, geburtsdatum, geschlecht, nationalitaet, adresse, plz, stadt, land, telefon, email, versicherungsnummer, notfallkontakt, notfalltelefon, zimmernummer 
      FROM patients
    `);

    await connection.end();

    return NextResponse.json(patients, { status: 200 });
  } catch (error) {
    console.error('Fehler beim Abrufen der Patienten:', error);
    return NextResponse.json({ message: 'Fehler beim Abrufen der Patienten', error: error.message }, { status: 500 });
  }
}
