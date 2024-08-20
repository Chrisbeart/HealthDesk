import React, { useState, useEffect } from 'react';

const PatientInfoComponent = ({ profile }) => {
  const {
    vorname,
    nachname,
    geburtsdatum,
    geschlecht,
    adresse,
    plz,
    stadt,
    email,
    telefon,
    notfallkontakt,
    notfalltelefon,
    versicherungsnummer,
    zimmernummer,
    nationalitaet,
    allergies,
    categories,
    diagnoses,
    evaluation,
    goalsAndMeasures,
    importantInfo,
    medications,
    therapies
  } = profile;

  return (
    <div className="patient-info z-20 overflow-y-auto">
      <h2>Patient Information</h2>
      <div><strong>Name:</strong> {vorname} {nachname}</div>
      <div><strong>Geburtsdatum:</strong> {geburtsdatum}</div>
      <div><strong>Geschlecht:</strong> {geschlecht}</div>
      <div><strong>Adresse:</strong> {adresse}, {plz} {stadt}</div>
      <div><strong>E-Mail:</strong> {email}</div>
      <div><strong>Telefon:</strong> {telefon}</div>
      <div><strong>Notfallkontakt:</strong> {notfallkontakt}</div>
      <div><strong>Notfalltelefon:</strong> {notfalltelefon}</div>
      <div><strong>Versicherungsnummer:</strong> {versicherungsnummer}</div>
      <div><strong>Zimmernummer:</strong> {zimmernummer}</div>
      <div><strong>Nationalität:</strong> {nationalitaet}</div>

      <h3>Allergien</h3>
      <ul>
        {allergies.map((allergy, index) => (
          <li key={index}>
            <strong>Typ:</strong> {allergy.type}<br />
            <strong>Details:</strong> {allergy.details}<br />
            <strong>Intensität:</strong> {allergy.intensity}<br />
            <strong>Behandlung:</strong> {allergy.treatment}
          </li>
        ))}
      </ul>

      <h3>Kategorien</h3>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <strong>Name:</strong> {category.name}<br />
            <strong>Details:</strong> {category.details}<br />
            <strong>Intensität:</strong> {category.intensity}
          </li>
        ))}
      </ul>

      <h3>Diagnosen</h3>
      <div><strong>Diagnosen:</strong> {diagnoses}</div>

      <h3>Evaluation</h3>
      <ul>
        {evaluation.map((evalItem, index) => (
          <li key={index}>
            <strong>Name:</strong> {evalItem.name}<br />
            <strong>Frequenz:</strong> {evalItem.frequency}<br />
            <strong>Verantwortlich:</strong> {evalItem.responsible}<br />
            <strong>Notizen:</strong> {evalItem.notes}
          </li>
        ))}
      </ul>

      <h3>Ziele und Maßnahmen</h3>
      <ul>
        {goalsAndMeasures.map((goal, index) => (
          <li key={index}>
            <strong>Name:</strong> {goal.name}<br />
            <strong>Ziel:</strong> {goal.goal}<br />
            <strong>Maßnahmen:</strong> {goal.measures}<br />
            <strong>Verantwortlichkeiten:</strong> {goal.responsibilities}<br />
            <strong>Status:</strong> {goal.status}
          </li>
        ))}
      </ul>

      <h3>Wichtige Informationen</h3>
      <div><strong>Wichtige Informationen:</strong> {importantInfo}</div>

      <h3>Medikationen</h3>
      <ul>
        {medications.map((medication, index) => (
          <li key={index}>
            <strong>Name:</strong> {medication.name}<br />
            <strong>Dosis:</strong> {medication.dose}<br />
            <strong>Dauer:</strong> {medication.duration}<br />
            <strong>Häufigkeit:</strong> {medication.frequency}
          </li>
        ))}
      </ul>

      <h3>Therapien</h3>
      <div><strong>Therapien:</strong> {therapies}</div>
    </div>
  );
};

const PatientListComponent = () => {
  const [patientsData, setPatientsData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    fetch('/patientsData.json')
      .then(response => response.json())
      .then(data => setPatientsData(data.patients))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleClick = (patient) => {
    setSelectedPatient(patient.profile);
  };

  return (
    <div className="patient-list z-20 overflow-y-auto">
      <h1>Patientenliste</h1>
      <ul>
        {patientsData.map((patient) => (
          <li className='cursor-pointer py-2 bg-pink-200 w-32 border-2 border-red-200 rounded-xl' key={patient.id} onClick={() => handleClick(patient)}>
            {patient.name} (Zimmer: {patient.room})
          </li>
        ))}
      </ul>

      {selectedPatient && <PatientInfoComponent profile={selectedPatient} />}
    </div>
  );
};

export default PatientListComponent;
