"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';


const initialValues = {
  vorname: '',
  nachname: '',
  geburtsdatum: '',
  geschlecht: '',
  nationalitaet: '',
  adresse: '',
  plz: '',
  stadt: '',
  land: '',
  telefon: '',
  email: '',
  versicherungsnummer: '',
  notfallkontakt: '',
  notfalltelefon: '',
  zimmernummer: ''
};

const Step1 = () => {
  const router = useRouter();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('/api/savePatient', values);
      if (response.status === 201) {
        const patientId = response.data.patientId;
        router.push(`/Aufnahme/step2?patientId=${patientId}`);
      }
    } catch (error) {
      console.error('Fehler beim Speichern des Patienten:', error);
      alert('Es gab ein Problem beim Speichern der Daten. Bitte versuche es erneut.');
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <Form className="flex flex-col w-full h-full z-20 text-black">
          {/* Form-Inhalt */}
        </Form>
      )}
    </Formik>
  );
};

export default Step1;
