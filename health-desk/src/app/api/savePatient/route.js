// app/api/savePatient/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/database/MongoDB/db';

export async function POST(request) {
  try {
    const { db } = await connectToDatabase();
    const data = await request.json();

    console.log("Received data:", data);

    const result = await db.collection('patients').insertOne(data);

    console.log("Data successfully saved:", result);

    return NextResponse.json({ message: 'Patient data saved successfully!', result }, { status: 201 });
  } catch (error) {
    console.error('Error saving patient data:', error);
    return NextResponse.json({ message: 'Failed to save patient data.' }, { status: 500 });
  }
}
