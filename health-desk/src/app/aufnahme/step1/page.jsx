"use client";  // Dies ist notwendig, um sicherzustellen, dass es sich um eine Client-Komponente handelt

import React from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { saveStep1Data } from '../state/actions';

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
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        dispatch(saveStep1Data(values));
        router.push('/aufnahme/step2');
      }}
    >
      {() => (
        <Form className="flex flex-col w-full h-full z-20">
          {/* Form-Inhalte */}
          <div className="flex justify-between mt-4 px-10">
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
