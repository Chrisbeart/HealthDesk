"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { PiPersonSimpleTaiChi } from "react-icons/pi";

const PatientItem = ({ patient }) => {
  const router = useRouter();

  const handleProfileClick = (event) => {
    event.stopPropagation();
    // Passing patient data as state to the profile page
    router.push(`/PatientenProfil/${patient.id}`);
  };

  return (
    <div
      className="px-4 mx-4 bg-custom-light-gray bg-opacity-50 rounded-2xl shadow-sm flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
      onClick={handleProfileClick}
    >
      <div className="flex flex-col sm:flex-row w-full items-center sm:justify-between">
        <div className="flex w-full justify-center items-center">
          <div className="flex w-6 h-6 m-2 sm:w-8 sm:h-8 lg:w-12 lg:h-12 rounded-full justify-center items-center bg-custom-green">
            <PiPersonSimpleTaiChi className='w-6 h-6 opacity-40 shadow-xl' />
          </div>
          <div className='flex items-center w-full'>
            <div className="flex items-center justify-around w-full rounded-xl bg-opacity-40 h-10">
              <p className="font-lato text-lg text-black leading-6">
                <span className="text-xl font-lato mb-2 text-custom-dark-gray">ID:</span> <br/> {patient.id}
              </p>
              <p className="font-lato text-lg text-black leading-6">
                <span className="text-xl font-lato mb-2 text-custom-dark-gray">Vorname:</span> <br/>  {patient.vorname}
              </p>
              <p className="font-lato text-lg text-black leading-6">
                <span className="text-xl font-lato mb-2 text-custom-dark-gray">Nachname:</span> <br/>  {patient.nachname}
              </p>
              <p className="font-lato text-lg text-black leading-6">
                <span className="text-xl font-lato mb-2 text-custom-dark-gray">Zimmernummer:</span> <br/>  {patient.zimmernummer}
              </p>
              <p className="font-lato text-lg text-black leading-6">
                <span className="text-xl font-lato mb-2 text-custom-dark-gray">Geburtsdatum:</span> <br/>  {new Date(patient.geburtsdatum).getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientItem;
