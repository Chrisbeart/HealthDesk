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
        const { patientId } = response.data;
        router.push(`/Aufnahme/step2?patientId=${patientId}`);  // Navigiere zu Step2 mit patientId
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
          <div className="flex h-[15%] justify-between items-center">
            <div className="flex p-10 py-16">
              <h2 className="text-4xl font-fjalla p-6">
                Stammdaten<span className="text-xl">_Patient</span>
              </h2>
            </div>
          </div>
          <div className="flex justify-center items-center h-[70%] w-full">
            <div className="flex w-[95%] h-full bg-custom-light-gray bg-opacity-25 rounded-xl p-4 overflow-y-scroll custom-scrollbar">
              <div className="flex flex-col w-full space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Field name="vorname" placeholder="Vorname" className="p-4 rounded-xl bg-custom-light-gray bg-opacity-35" />
                  <Field name="nachname" placeholder="Nachname" className="p-4 rounded-xl bg-custom-light-gray bg-opacity-35" />
                  <Field name="geburtsdatum" placeholder="Geburtsdatum" type="date" className="p-4 rounded-xl bg-custom-light-gray bg-opacity-35" />
                  <Field name="geschlecht" placeholder="Geschlecht" className="p-4 rounded-xl bg-custom-light-gray bg-opacity-35" />
                  <Field name="nationalitaet" placeholder="Nationalität" className="p-4 rounded-xl bg-custom-light-gray bg-opacity-35" />
                  <Field name="adresse" placeholder="Adresse" className="p-4 rounded-xl bg-custom-light-gray bg-opacity-35" />
                  <Field name="plz" placeholder="PLZ" className="p-4 rounded-xl bg-custom-light-gray bg-opacity-35" />
                  <Field name="stadt" placeholder="Stadt" className="p-4 rounded-xl bg-custom-light-gray bg-opacity-35" />
                  <Field name="land" placeholder="Land" className="p-4 rounded-xl bg-custom-light-gray bg-opacity-35" />
                  <Field name="telefon" placeholder="Telefon" className="p-4 rounded-xl bg-custom-light-gray bg-opacity-35" />
                  <Field name="email" placeholder="Email" type="email" className="p-4 rounded-xl bg-custom-light-gray bg-opacity-35" />
                  <Field name="versicherungsnummer" placeholder="Versicherungsnummer" className="p-4 rounded-xl bg-custom-light-gray bg-opacity-35" />
                  <Field name="notfallkontakt" placeholder="Notfallkontakt" className="p-4 rounded-xl bg-custom-light-gray bg-opacity-35" />
                  <Field name="notfalltelefon" placeholder="Notfalltelefon" className="p-4 rounded-xl bg-custom-light-gray bg-opacity-35" />
                  <Field name="zimmernummer" placeholder="Zimmernummer" className="p-4 rounded-xl bg-custom-light-gray bg-opacity-35" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-4 px-10">
            <button
              type="button"
              onClick={() => router.back()}
              className="font-lato semibold text-white bg-opacity-75 text-xl w-32 h-12 rounded-xl bg-custom-dark-gray"
            >
              Zurück
            </button>
            <button
              type="submit"
              className="font-lato semibold text-white bg-opacity-75 text-xl w-32 h-12 rounded-xl bg-custom-dark-gray"
            >
              Weiter
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Step1;
