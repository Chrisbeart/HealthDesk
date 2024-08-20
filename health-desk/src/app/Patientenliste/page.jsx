"use client";

import React, { useState, useEffect } from 'react';
import PatientItem from '../components/PatientItem';
import { CiFilter, CiCirclePlus } from "react-icons/ci";
import Link from 'next/link';

const PatientItemSkeleton = () => {
  return (
    <div className="p-4 bg-gray-200 rounded-lg shadow animate-pulse">
      {/* Skeleton loading UI */}
    </div>
  );
};

const PatientenListe = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('/api/getPatients');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPatients(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching patient data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        {/* Loading UI */}
      </div>
    );
  }

  if (error) {
    return <div>Error fetching patient data: {error.message}</div>;
  }

  return (
    <div className="z-20 p-6 pb-20 h-screen flex flex-col rounded-xl overflow-y-auto custom-scrollbar-container custom-scrollbar bg-opacity-80">
      <div className="flex w-full h-32 justify-between items-center">
        <h1 className="text-6xl tracking-wide mb-4 font-fjalla">Patientenliste</h1>
        <div className="flex w-full justify-end p-4">
          <div className="flex w-72 h-8 m-4 bg-custom-light drop-shadow-xl rounded-xl items-center hover:cursor-pointer">
            <input type="text" placeholder="Suchen..." className="text-gray-500 p-2 w-full rounded-xl" />
          </div>
          <div className="flex m-4">
            <button>
              <CiFilter className='w-6 h-6 opacity-40 transition transform hover:opacity-70 duration-200' />
            </button>
          </div>
          <div className="flex">
            <Link href="/Aufnahme">
              <CiCirclePlus className='w-6 h-6 opacity-40 transition transform hover:opacity-70 duration-200' />
            </Link>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {patients.map((patient) => (
          <PatientItem key={patient.id} patient={patient} />
        ))}
      </div>
    </div>
  );
};

export default PatientenListe;
