import { NextResponse } from 'next/server';
import { getMySQLConnection } from '../../../database/MySQL/db';

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      vorname,
      nachname,
      geburtsdatum,
      geschlecht,
      nationalitaet,
      adresse,
      plz,
      stadt,
      land,
      telefon,
      email,
      versicherungsnummer,
      notfallkontakt,
      notfalltelefon,
      zimmernummer
    } = body;

    const connection = await getMySQLConnection();

    const query = `
      INSERT INTO patients 
      (vorname, nachname, geburtsdatum, geschlecht, nationalitaet, adresse, plz, stadt, land, telefon, email, versicherungsnummer, notfallkontakt, notfalltelefon, zimmernummer) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [vorname, nachname, geburtsdatum, geschlecht, nationalitaet, adresse, plz, stadt, land, telefon, email, versicherungsnummer, notfallkontakt, notfalltelefon, zimmernummer];

    const [result] = await connection.query(query, values);
    const patientId = result.insertId;

    await connection.end();

    return NextResponse.json({ message: 'Patient erfolgreich gespeichert', patientId }, { status: 201 });
  } catch (error) {
    console.error('Fehler beim Speichern des Patienten:', error);
    return NextResponse.json({ message: 'Fehler beim Speichern des Patienten', error: error.message }, { status: 500 });
  }
}
