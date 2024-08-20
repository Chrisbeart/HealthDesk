// pages/MitarbeiterProfil/[id].js
"use client"
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const MitarbeiterProfil = () => {
  const router = useRouter();
  const { id } = router.query;
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    // Fetch employee data based on ID, this is a placeholder
    if (id) {
      // Fetch the employee data here using the ID from the URL
      // For example: fetch(`/api/employees/${id}`).then(...).setEmployee(...)
    }
  }, [id]);

  if (!employee) return <div>Loading...</div>;

  return (
    <div>
      <h1>{employee.name}</h1>
      <p>Abteilung: {employee.department}</p>
      <p>Email: {employee.email}</p>
      <p>Telefon: {employee.phone}</p>
      {/* Display other employee details */}
    </div>
  );
};

export default MitarbeiterProfil;
