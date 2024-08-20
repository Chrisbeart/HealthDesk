import React, { useEffect, useState } from 'react';

const MedizinischeInfo = ({ patientId }) => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!patientId) {
      setError(new Error('Patient ID is not defined'));
      setLoading(false);
      return;
    }

    fetch(`http://18.196.77.116:3001/patient/${patientId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched patient data:', data); // Debugging-Ausgabe
        setPatient(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching patient data:', error);
        setError(error);
        setLoading(false);
      });
  }, [patientId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading patient data: {error.message}</div>;
  }

  if (!patient || !patient.profile) {
    return <div>No patient data available</div>;
  }

  const column1 = [
    { title: 'Anamnese', content: patient.profile.anamnese || 'Keine Anamnese verfügbar' },
    { title: 'Aktuelle Probleme', content: patient.profile.aktuelleProbleme || 'Keine aktuellen Probleme verfügbar' },
    { title: 'Diagnose', content: patient.profile.diagnoses || 'Keine Diagnose verfügbar' }
  ];

  const column2 = [
    { title: 'Wichtige Informationen', content: patient.profile.importantInfo || 'Keine wichtigen Informationen verfügbar' },
    {
      title: 'Allergien', content: patient.profile.allergies && patient.profile.allergies.length > 0 ? (
        patient.profile.allergies.map((allergy, index) => (
          <div key={index} className="flex flex-col mb-2">
            <p className='font-ibm-plex-mono tracking-tight text-md'>Typ: {allergy.type || 'Keine Angabe'}</p>
            <p className='font-ibm-plex-mono tracking-tight text-md'>Details: {allergy.details || 'Keine Angabe'}</p>
            <p className='font-ibm-plex-mono tracking-tight text-md'>Intensität: {allergy.intensity || 'Keine Angabe'}</p>
            <p className='font-ibm-plex-mono tracking-tight text-md'>Behandlung: {allergy.treatment || 'Keine Angabe'}</p>
          </div>
        ))
      ) : (
        <p className='font-ibm-plex-mono tracking-tight text-md'>Keine Allergien verfügbar</p>
      )
    },
    {
      title: 'Kategorien', content: patient.profile.categories && patient.profile.categories.length > 0 ? (
        patient.profile.categories.map((category, index) => (
          <div key={index} className="flex flex-col mb-2">
            <p className='font-ibm-plex-mono tracking-tight text-md'>Name: {category.name || 'Keine Angabe'}</p>
            <p className='font-ibm-plex-mono tracking-tight text-md'>Intensität: {category.intensity || 'Keine Angabe'}</p>
            <p className='font-ibm-plex-mono tracking-tight text-md'>Details: {category.details || 'Keine Angabe'}</p>
          </div>
        ))
      ) : (
        <p className='font-ibm-plex-mono tracking-tight text-md'>Keine Kategorien verfügbar</p>
      )
    },
    {
      title: 'Evaluation', content: patient.profile.evaluation && patient.profile.evaluation.length > 0 ? (
        patient.profile.evaluation.map((evaluation, index) => (
          <div key={index} className="flex flex-col mb-2">
            <p className='font-ibm-plex-mono tracking-tight text-md'>Name: {evaluation.name || 'Keine Angabe'}</p>
            <p className='font-ibm-plex-mono tracking-tight text-md'>Verantwortlich: {evaluation.responsible || 'Keine Angabe'}</p>
            <p className='font-ibm-plex-mono tracking-tight text-md'>Häufigkeit: {evaluation.frequency || 'Keine Angabe'}</p>
            <p className='font-ibm-plex-mono tracking-tight text-md'>Notizen: {evaluation.notes || 'Keine Angabe'}</p>
          </div>
        ))
      ) : (
        <p className='font-ibm-plex-mono tracking-tight text-md'>Keine Evaluation verfügbar</p>
      )
    }
  ];

  const column3 = [
    {
      title: 'Ziele und Maßnahmen', content: patient.profile.goalsAndMeasures && patient.profile.goalsAndMeasures.length > 0 ? (
        patient.profile.goalsAndMeasures.map((goal, index) => (
          <div key={index} className="flex flex-col mb-2">
            <p className='font-ibm-plex-mono tracking-tight text-md'>Name: {goal.name || 'Keine Angabe'}</p>
            <p className='font-ibm-plex-mono tracking-tight text-md'>Ziel: {goal.goal || 'Keine Angabe'}</p>
            <p className='font-ibm-plex-mono tracking-tight text-md'>Maßnahmen: {goal.measures || 'Keine Angabe'}</p>
            <p className='font-ibm-plex-mono tracking-tight text-md'>Verantwortlichkeiten: {goal.responsibilities || 'Keine Angabe'}</p>
            <p className='font-ibm-plex-mono tracking-tight text-md'>Status: {goal.status || 'Keine Angabe'}</p>
          </div>
        ))
      ) : (
        <p className='font-ibm-plex-mono tracking-tight text-md'>Keine Ziele und Maßnahmen verfügbar</p>
      )
    },
    {
      title: 'Medikationen', content: patient.profile.medications && patient.profile.medications.length > 0 ? (
        patient.profile.medications.map((medication, index) => (
          <div key={index} className="flex flex-col mb-2">
            <p className='font-ibm-plex-mono tracking-tight text-md'>Name: {medication.name || 'Keine Angabe'}</p>
            <p className='font-ibm-plex-mono tracking-tight text-md'>Dosis: {medication.dose || 'Keine Angabe'}</p>
            <p className='font-ibm-plex-mono tracking-tight text-md'>Dauer: {medication.duration || 'Keine Angabe'}</p>
            <p className='font-ibm-plex-mono tracking-tight text-md'>Häufigkeit: {medication.frequency || 'Keine Angabe'}</p>
          </div>
        ))
      ) : (
        <p className='font-ibm-plex-mono tracking-tight text-md'>Keine Medikationen verfügbar</p>
      )
    },
    { title: 'Therapien', content: patient.profile.therapies || 'Keine Therapien verfügbar' },
  ];

  const renderColumn = (sections) => (
    sections.map((section, index) => (
      <div key={index} className="flex flex-col w-full p-4 hover:scale-105  hover:text-custom-light-gray transition-transform">
        <div className="border-2 border-gray-400 rounded-xl p-4 bg-white hover:bg-custom-dark-gray shadow-lg">
          <h2 className='text-2xl pb-2 font-Beba'>{section.title}:</h2>
          <div className="flex flex-col">
            {typeof section.content === 'string' ? (
              <p className='font-ibm-plex-mono tracking-tight text-md'>{section.content}</p>
            ) : (
              section.content
            )}
          </div>
        </div>
      </div>
    ))
  );

  return (
    <div className="flex flex-row flex-wrap max-w-full overflow-x-hidden h-full bg-custom-light-gray bg-opacity-65  rounded-xl overflow-y-auto py-2 z-20">
      <div className="flex flex-col w-full md:w-1/3">
        {renderColumn(column1)}
      </div>
      <div className="flex flex-col w-full md:w-1/3">
        {renderColumn(column2)}
      </div>
      <div className="flex flex-col w-full md:w-1/3">
        {renderColumn(column3)}
      </div>
    </div>
  );
};

export default MedizinischeInfo;
