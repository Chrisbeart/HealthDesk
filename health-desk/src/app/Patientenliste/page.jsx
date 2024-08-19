import React from 'react';
import { useParams } from 'react-router-dom';

const patients = [
  { id: 1, name: 'Max Mustermann', room: '030', birthYear: 1934, notes: '', tasksCompleted: 7 },
  { id: 2, name: 'Anna Müller', room: '028', birthYear: 1935, notes: 'Anna Müller ist auffällig reich, sie hat jedoch vergessen, dass sie Enkel hat, vielleicht sollte ich sie daran erinnern', tasksCompleted: 3 },
  { id: 3, name: 'John Doe', room: '029', birthYear: 1940, notes: 'John Doe needs regular check-ups.', tasksCompleted: 5 },
  { id: 4, name: 'Jane Smith', room: '031', birthYear: 1945, notes: 'Jane Smith requires special dietary meals.', tasksCompleted: 8 },
  { id: 5, name: 'Peter Parker', room: '032', birthYear: 1960, notes: 'Peter Parker has a known allergy to penicillin.', tasksCompleted: 2 },
  { id: 6, name: 'Bruce Wayne', room: '033', birthYear: 1955, notes: 'Bruce Wayne prefers evening check-ups.', tasksCompleted: 6 },
  { id: 7, name: 'Clark Kent', room: '034', birthYear: 1952, notes: 'Clark Kent needs regular eye check-ups.', tasksCompleted: 8 },
  { id: 8, name: 'Diana Prince', room: '035', birthYear: 1970, notes: 'Diana Prince is scheduled for a physiotherapy session.', tasksCompleted: 4 },
  // Add more patients as needed
];

const PatientDetails = () => {
  const { id } = useParams();
  const patient = patients.find((p) => p.id === parseInt(id));

  if (!patient) {
    return <div>Patient not found</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">Patient Details: {patient.name}</h1>
      <p><strong>Room:</strong> {patient.room}</p>
      <p><strong>Birth Year:</strong> {patient.birthYear}</p>
      <p><strong>Notes:</strong> {patient.notes}</p>
      <p><strong>Tasks Completed:</strong> {patient.tasksCompleted}</p>
    </div>
  );
};

export default PatientDetails;
