import React from 'react';
import Image from 'next/image';
import Persönliches from './Persönliches';
import Qualifikationen from './Qualifikationen';
import Kontakt from './Kontakt';

export default function Mitarbeiterprofil({ employee }) {
  const renderTabContent = (tab) => {
    switch (tab) {
      case 'Persönliches':
        return <Persönliches employee={employee} />;
      case 'Qualifikationen':
        return <Qualifikationen employee={employee} />;
      case 'Kontakt':
        return <Kontakt employee={employee} />;
      default:
        return <Persönliches employee={employee} />;
    }
  };

  if (!employee) {
    return <div>Mitarbeiterdaten nicht gefunden</div>;
  }

  // Wir zeigen standardmäßig den "Persönliches"-Tab an
  const activeTab = 'Persönliches';

  return (
    <div className="p-4 flex flex-col w-full h-full justify-start items-center z-20">
      <div className="flex flex-col rounded-2xl p-6 w-full h-full overflow-y-auto shadow-lg">
        <div className="flex flex-col items-center w-full mb-8">
          <div className="flex items-center justify-center space-x-6 h-[80%] bg-custom-green bg-opacity-20 px-6 py-6 rounded-xl shadow-md w-full">
            <div className="flex h-full w-full space-x-8 justify-center items-center">
              <Image
                src={Granny}
                alt={employee.name}
                width={96}
                height={96}
                className="border-4 border-custom-dark-gray border-opacity-40 w-24 h-24 rounded-full bg-custom-green"
              />
              <h1 className="font-fjalla text-custom-dark-gray text-2xl py-1">
                {employee.name.toUpperCase()}
              </h1>
              <p className="font-lato font-semibold text-sm leading-6">
                <span className='text-md text-custom-dark-gray'>ALTER:</span> <br /> 
                {new Date().getFullYear() - employee.birthYear} JAHRE
              </p>
              <p className="font-lato font-semibold text-sm leading-6">
                <span className='text-md text-custom-dark-gray'>GESCHLECHT:</span> <br /> 
                {employee.gender || 'UNBEKANNT'}
              </p>
              <p className="font-lato font-semibold text-sm leading-6">
                <span className='text-md text-custom-dark-gray'>AUFENTHALTSORT:</span> <br /> 
                {employee.location || 'UNBEKANNT'}
              </p>
              <p className="font-lato font-semibold text-sm leading-6">
                <span className='text-md text-custom-dark-gray'>ADRESSE:</span> <br /> 
                {employee.address}
              </p>
              <p className="font-lato font-semibold text-sm leading-6">
                <span className='text-md text-custom-dark-gray'>POSITION:</span> <br /> 
                {employee.position}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center space-x-4 mb-8">
          {/* Hier können zusätzliche Tabs hinzugefügt werden, falls erforderlich */}
        </div>
        <div className="w-full">
          {renderTabContent(activeTab)}
        </div>
      </div>
    </div>
  );
}

// Diese Funktion wird serverseitig aufgerufen, um die Mitarbeiterdaten abzurufen
export async function getServerSideProps(context) {
  const { id } = context.params;

  // Hole die Daten des Mitarbeiters vom API-Endpoint oder einer Datenbank
  const res = await fetch(`https://example.com/api/employees/${id}`);
  const employee = await res.json();

  if (!employee) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      employee,
    },
  };
}
