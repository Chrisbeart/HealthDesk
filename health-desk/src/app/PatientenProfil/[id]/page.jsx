"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MedizinischeInfo from '@/app/components/_MedInfo/MedizinischeInfo';
import Biografie from '@/app/components/_MedInfo/Biografie';
import Granny from '@/app/assets/Granny1.jpeg';
import Checklist from '@/app/components/Dokumentation/Checklist';
import Vitalzeichenprotokoll from '@/app/components/_MedInfo/Vitalzeichenprotokoll';
import Aktivitäten from '@/app/components/_MedInfo/Aktivitäten';
import Wunddoku from '@/app/components/_MedInfo/Wunddoku';
import MedicationPlan from '@/app/components/_MedInfo/Medikationsplan';
import PDFList from '@/app/components/Dokumentation/PDFList';

const PatientenProfil = () => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Define and initialize activeTab and subTab
  const [activeTab, setActiveTab] = useState('Medizinische Informationen');
  const [subTab, setSubTab] = useState('');

  useEffect(() => {
    // Extract the patient ID directly from the URL
    const pathname = window.location.pathname;
    const id = pathname.split('/').pop(); // Assuming the ID is at the end of the URL

    if (!id) {
      setError('No patient ID found in the URL.');
      setLoading(false);
      return;
    }

    const fetchPatientData = async () => {
      try {
        console.log(`Fetching data for patient with ID: ${id}`);

        const response = await fetch(`/api/getPatient?patientId=${id}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch patient data: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Fetched patient data:', data);

        setPatient(data.patient || null);
      } catch (error) {
        console.error('Error fetching patient data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  if (loading) {
    return <div>Loading patient data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!patient) {
    return <div>No patient data found</div>;
  }

  const renderTabContent = () => {
    if (activeTab === 'Medizinische Informationen') {
      switch (subTab) {
        case 'Checkliste':
          return <Checklist patient={patient} />;
        case 'Vitalzeichenprotokoll':
          return <Vitalzeichenprotokoll patient={patient} />;
        case 'Aktivitäten':
          return <Aktivitäten patient={patient} />;
        case 'Wunddokumentation':
          return <Wunddoku patient={patient} />;
        case 'Medikationsplan':
          return <MedicationPlan patient={patient} />;
        default:
          return <MedizinischeInfo patient={patient} />;
      }
    }

    switch (activeTab) {
      case 'Dokumentation':
        return <PDFList pdfs={patient.pdfs || []} lastUsed={patient.lastUsedPDFs || []} />;
      case 'Biografie':
        return <Biografie biography={patient.biography || 'Keine Biografie verfügbar'} />;
      default:
        return <Checklist patient={patient} />;
    }
  };

  return (
    <div className="p-4 flex flex-col w-full h-full justify-start items-start z-20 overflow-y-auto duration-200 transition-all"
      data-aos="fade-zoom-in"
      data-aos-easing="ease-in-out"
      data-aos-duration="1000"
      data-aos-once="true"
    >
      <div className="flex flex-col rounded-2xl p-4 w-full h-[35%]  ">
        <div className="flex justify-between items-center w-full mb-12">
          <div className="flex justify-around items-center bg-custom-green bg-opacity-20 px-6 py-6 rounded-xl shadow-lg w-[35%]" >
            <div className="flex items-center justify-center">
              <img
                src={Granny}
                alt={patient.vorname}
                className="flex border-2 border-custom-dark-gray border-opacity-40 justify-center align-center text-white w-24 h-24 rounded-full mr-4 bg-custom-green"
              />
            </div>
            <div className="flex space-x-4 justify-around items-center w-[60%]">
              <div className="flex flex-col">
                <h1 className="font-fjalla text-custom-dark-gray text-2xl py-1">
                  {patient.vorname ? patient.vorname.toUpperCase() : 'NAME NICHT VERFÜGBAR'} {patient.nachname ? patient.nachname.toUpperCase() : ''}
                </h1>
                <p className="font-lato font-semibold text-xs py-1">
                  ALTER: {patient.geburtsdatum ? new Date().getFullYear() - new Date(patient.geburtsdatum).getFullYear() : 'UNBEKANNT'} JAHRE
                </p>
                <p className="font-lato font-semibold text-xs py-1">
                  GESCHLECHT: {patient.geschlecht || 'UNBEKANNT'}
                </p>
                <p className="font-lato font-semibold text-xs py-1">
                  AUFENTHALTSORT: {patient.adresse || 'UNBEKANNT'}
                </p>
                <p className="font-lato font-semibold text-xs py-1">
                  ZIMMERNUMMER: {patient.zimmernummer || 'UNBEKANNT'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow w-full h-[180%] overflow-y-auto"
        data-aos="fade-zoom-in"
        data-aos-easing="ease-in-out"
        data-aos-duration="1000"
        data-aos-once="true"
      >
        {renderTabContent()}
      </div>
    </div>
  );
};

export default PatientenProfil;
