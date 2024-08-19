import React from 'react';

const Persönliches = ({ employee }) => {
  return (
    <div>
      <h2>Persönliche Daten</h2>
      <p>Name: {employee.name}</p>
      <p>Alter: {new Date().getFullYear() - employee.birthYear} Jahre</p>
      <p>Geschlecht: {employee.gender || 'Unbekannt'}</p>
      <p>Aufenthaltsort: {employee.location || 'Unbekannt'}</p>
    </div>
  );
};

export default Persönliches;
