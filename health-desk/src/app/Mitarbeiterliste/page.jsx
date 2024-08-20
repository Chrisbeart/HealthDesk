"use client"
import React, { useState, useEffect } from 'react';
import MitarbeiterItem from '../components/Mitarbeiteritem';
import { CiFilter, CiCirclePlus } from "react-icons/ci";
import Link from 'next/link';

const MitarbeiterListe = () => {
  const [mitarbeiter, setMitarbeiter] = useState([]);

  useEffect(() => {
    fetch('./employeeData.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setMitarbeiter(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      })
      .catch(error => console.error('Error fetching employee data:', error));
  }, []);

  return (
    <div className="z-20 p-6 pb-20 h-screen flex flex-col rounded-xl overflow-y-auto custom-scrollbar-container custom-scrollbar bg-opacity-80" 
      data-aos="fade-zoom-in"
      data-aos-easing="ease-in-out"
      data-aos-duration="1000"
      data-aos-once="true" 
    >
      <div className="flex w-full h-32 justify-between items-center">
        <h1 className="text-6xl tracking-wide mb-4 font-fjalla">Mitarbeiterliste</h1>
        <div className="flex w-full justify-end p-4">
          <div className="flex w-72 h-8 m-4 bg-custom-light drop-shadow-xl rounded-xl items-center hover:cursor-pointer">
            <input type="text" placeholder="Suchen..." className="text-gray-500 p-2 w-full rounded-xl" />
          </div>
          <div className="flex m-4">
            <button>
              <CiFilter className='w-6 h-6 opacity-40 transition transform hover:opacity-70 duration-200' />
            </button>
          </div>
          <div className="flex">
            <Link href="/Mitarbeiterliste/AddEmployee" className='flex m-4'>
              <button>
                <CiCirclePlus className='w-6 h-6 opacity-40 transition transform hover:opacity-70 duration-200' />
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {mitarbeiter.map((employee) => (
          <MitarbeiterItem key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  );
};

export default MitarbeiterListe;
