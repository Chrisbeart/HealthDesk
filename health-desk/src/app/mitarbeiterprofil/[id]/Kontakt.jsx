import React from 'react';

const Kontakt = ({ employee }) => {
  return (
    <div>
      <h2>Kontaktinformationen</h2>
      <p>Adresse: {employee.address}</p>
      <p>Telefon: {employee.phone || 'Keine Angaben'}</p>
      <p>Email: {employee.email || 'Keine Angaben'}</p>
    </div>
  );
};

export default Kontakt;
