import React from 'react';

const Qualifikationen = ({ employee }) => {
  return (
    <div>
      <h2>Qualifikationen</h2>
      <p>Position: {employee.position}</p>
      <p>Qualifikationen: {employee.qualifications || 'Keine Angaben'}</p>
    </div>
  );
};

export default Qualifikationen;
