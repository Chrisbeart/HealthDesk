"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Verwende useRouter für die Navigation

const PatientenListe = () => {
  const [patients, setPatients] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('/api/getPatients');
        setPatients(response.data);
      } catch (error) {
        console.error('Fehler beim Abrufen der Patientendaten:', error);
      }
    };

    fetchPatients();
  }, []);

  const handleAddPatient = () => {
    router.push('/aufnahme'); // Navigiere zur Seite /aufnahme
  };

  return (
    <div className="container mx-auto p-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Patientenliste</h1>
        <button 
          onClick={handleAddPatient} 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
        >
          +
        </button>
      </div>
      <ul className="space-y-4">
        {patients.map((patient) => (
          <li key={patient._id} className="p-4 bg-gray-200 rounded-lg shadow text-black">
            <h2 className="text-xl font-semibold">{patient.vorname} {patient.nachname}</h2>
            <p>Geburtsdatum: {patient.geburtsdatum}</p>
            <p>Geschlecht: {patient.geschlecht}</p>
            <p>Adresse: {patient.adresse}</p>
            <p>Stadt: {patient.stadt}</p>
            <p>Telefon: {patient.telefon}</p>
            <p>Email: {patient.email}</p>
            <p>Versicherungsnummer: {patient.versicherungsnummer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientenListe;
