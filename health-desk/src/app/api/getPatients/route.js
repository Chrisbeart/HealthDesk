import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/database/MongoDB/db';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const patients = await db.collection('patients').find({}).toArray();  // Alle Patienten abrufen

    return NextResponse.json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    return NextResponse.json({ message: 'Failed to fetch patients' }, { status: 500 });
  }
}
