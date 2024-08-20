"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use Next.js navigation
import MedizinischeInfo from '@/app/components/_MedInfo/MedizinischeInfo';
import Biografie from '@/app/components/_MedInfo/Biografie';
import Granny from '@/app/assets/Granny1.jpeg'
import Checklist from '@/app/components/Dokumentation/Checklist';
import Vitalzeichen from '@/app/components/_MedInfo/Vitalzeichenprotokoll';
import Aktivitäten from '@/app/components/_MedInfo/Aktivitäten'
import Wunddoku from '@/app/components/_MedInfo/Wunddoku';
import MedicationPlan from '@/app/components/_MedInfo/Medikationsplan';
import PDFList from '@/app/components/Dokumentation/PDFList'; // Import the new component
import Notizen from '@/app/components/Dokumentation/Notizen';// Import the new component
import Berichte from '@/app/components/Dokumentation/Berichte'; // Import the new component

const PatientenProfil = () => {
  const { state } = useLocation();
  const { patient } = state || {};
  const [activeTab, setActiveTab] = useState('Dokumentation');
  const [subTab, setSubTab] = useState('');

  if (!patient) {
    return <div>Patientendaten nicht verfügbar</div>;
  }

  const pdfs = ['PDF1', 'PDF2', 'PDF3'];
  const lastUsedPDFs = ['PDF2', 'PDF1'];
  const reports = ['Bericht1', 'Bericht2', 'Bericht3'];

  const renderTabContent = () => {
    if (activeTab === 'Medizinische Informationen') {
      switch (subTab) {
        case 'Checkliste':
          return <Checklist />;
        case 'Vitalzeichenprotokoll':
          return <Vitalzeichenprotokoll />;
        case 'Aktivitäten':
          return <Aktivitäten />;
        case 'Wunddokumentation':
          return <Wunddoku />;
        case 'Medikationsplan':
          return <MedicationPlan patient={patient} />;
        default:
          return <MedizinischeInfo patient={patient} />;
      }
    }

    switch (activeTab) {
      case 'Dokumentation':
        if (subTab === 'PDFs') return <PDFList pdfs={pdfs} lastUsed={lastUsedPDFs} />;
        if (subTab === 'Notizen') return <Notizen />;
        if (subTab === 'Berichte') return <Berichte reports={reports} />;
        
        return <Checklist />;
      case 'Biografie':
        return <Biografie biography={patient.biography || 'Keine Biografie verfügbar'} />;
      default:
        return <Checklist />;
    }
  };

  const buttonClasses = (tab, subTabActive = false) =>
    `drop-shadow-md min-w-28 h-10 px-4  transition-all duration-300 text-sm font-lato font-light rounded-2xl hover:cursor-pointer ${
      (subTabActive ? subTab === tab : activeTab === tab)
        ? 'bg-custom-dark-gray text-custom-light-gray font-bold scale-110'
        : 'bg-custom-light-gray font-light hover:bg-custom-dark-gray hover:text-white hover:scale-105'
    }`;

  return (
    <div className="p-4 flex flex-col w-full h-full justify-start items-start z-20 overflow-y-auto duration-200 transition-all"
      data-aos="fade-zoom-in"
      data-aos-easing="ease-in-out"
      data-aos-duration="1000"
      data-aos-once="true" 
       >
      <div className="flex flex-col rounded-2xl p-4 w-full h-[35%]  "
      
      >
        <div className="flex justify-between items-center w-full mb-12">
          <div className="flex justify-around items-center bg-custom-green bg-opacity-20 px-6 py-6 rounded-xl shadow-lg w-[35%]" >
            <div className="flex items-center justify-center">
              <img
                src={Granny}
                alt={patient.name}
                className="flex border-2 border-custom-dark-gray border-opacity-40 justify-center align-center text-white w-24 h-24 rounded-full mr-4 bg-custom-green"
              />
            </div>
            <div className="flex space-x-4 justify-around items-center w-[60%]">
              <div className="flex flex-col">
                <h1 className="font-fjalla text-custom-dark-gray text-2xl py-1">
                  {patient.name  ? patient.name.toUpperCase() : 'NAME NICHT VERFÜGBAR'}
                </h1>
                <p className="font-lato font-semibold text-xs py-1">
                  ALTER: {patient.birthYear ? new Date().getFullYear() - patient.birthYear : 'UNBEKANNT'} JAHRE
                </p>
                <p className="font-lato font-semibold text-xs py-1">
                  GESCHLECHT: {patient.gender || 'UNBEKANNT'}
                </p>
                <p className="font-lato font-semibold text-xs py-1">
                  AUFENTHALTSORT: {patient.location || 'UNBEKANNT'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col h-[80%] justify-between space-y-6">
            <div className="flex justify-end items-center space-x-6">
              <button
                className={buttonClasses('Dokumentation')}
                onClick={() => {
                  setActiveTab('Dokumentation');
                  setSubTab('');
                }}
              >
                Dokumentation
              </button>
              <button
                className={buttonClasses('Medizinische Informationen')}
                onClick={() => setActiveTab('Medizinische Informationen')}
              >
                Med. Informationen
              </button>
              <button
                className={buttonClasses('Biografie')}
                onClick={() => {
                  setActiveTab('Biografie');
                  setSubTab('');
                }}
              >
                Biografie
              </button>
            </div>
            {activeTab === 'Medizinische Informationen' && (
              <div className="flex justify-around items-center w-full h-12 mb-4 space-x-6">
                <button
                  className={buttonClasses('Vitalzeichenprotokoll', true)}
                  onClick={() => setSubTab('Vitalzeichenprotokoll')}
                >
                  Vitalzeichenprotokoll
                </button>
                <button
                  className={buttonClasses('Aktivitäten', true)}
                  onClick={() => setSubTab('Aktivitäten')}
                >
                  Aktivitäten
                </button>
                <button
                  className={buttonClasses('Wunddokumentation', true)}
                  onClick={() => setSubTab('Wunddokumentation')}
                >
                  Wunddokumentation
                </button>
                <button
                  className={buttonClasses('Medikationsplan', true)}
                  onClick={() => setSubTab('Medikationsplan')}
                >
                  Medikationsplan
                </button>
                <button
                  className={buttonClasses('Medizinische Informationen', true)}
                  onClick={() => setSubTab('Medizinische Informationen')}
                >
                  Allg. Infos
                </button>
              </div>
            )}
            {activeTab === 'Dokumentation' && (
              <div className="flex justify-around items-center w-full h-12 mb-4 space-x-6">
                <button
                  className={buttonClasses('PDFs', true)}
                  onClick={() => setSubTab('PDFs')}
                >
                  PDF's
                </button>
                <button
                  className={buttonClasses('Checkliste', true)}
                  onClick={() => setSubTab('Checkliste')}
                >
                  Checkliste
                </button>
                <button
                  className={buttonClasses('Notizen', true)}
                  onClick={() => setSubTab('Notizen')}
                >
                  Notizen
                </button>
                <button
                  className={buttonClasses('Berichte', true)}
                  onClick={() => setSubTab('Berichte')}
                >
                  Berichte
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-grow w-full h-[180%] overflow-y-auto " 
      
      data-aos="fade-zoom-in"
      data-aos-easing="ease-in-out"
      data-aos-duration="1000"
      data-aos-once="true" >
        {renderTabContent()}
      </div>
    </div>
  );
};

export default PatientenProfil;
