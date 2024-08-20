"use client";
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

const initialValues = {
  resources: '',
  supportNetwork: '',
  copingStrategies: '',
  previousTherapies: '',
};

const Step3 = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const patientId = searchParams.get('patientId');

  const handleSubmit = async (values) => {
    try {
      await axios.post('/api/saveResources', { ...values, patientId });
      router.push(`/Aufnahme/step4?patientId=${patientId}`);
    } catch (error) {
      console.error('Fehler beim Speichern der Daten:', error);
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

export default Step3;
