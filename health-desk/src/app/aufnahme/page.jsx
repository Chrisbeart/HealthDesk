"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';



const Aufnahme = () => {
  const router = useRouter(); // Verwende useRouter anstelle von useNavigate
  const [stammdaten, setStammdaten] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/stammdaten')
      .then(response => {
        setStammdaten(response.data);
      })
      .catch(error => {
        console.error('Fehler beim Abrufen der Stammdaten:', error);
      });
  }, []);

  return (
    <Formik
      initialValues={{
        klient: ['', '', '', ''],
        eigeneFamiliengruendung: ['', '', '', ''],
        praegendeErlebnisse: '',
      }}
      onSubmit={(values) => {
        console.log(values);
        router.push('aufnahme/step1');  // Navigiere zu Step1 nach Einreichung des Formulars
      }}
    >
      {() => (
        <Form className='flex flex-col w-full h-full z-20'>
          {/* Form Inhalt */}
          <div className="flex justify-between mt-4 px-10">
            <button
              type="submit"
              className='font-lato semibold text-white bg-opacity-75 text-xl w-32 h-12 rounded-xl bg-custom-dark-gray'
            >
              Weiter
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Aufnahme;
