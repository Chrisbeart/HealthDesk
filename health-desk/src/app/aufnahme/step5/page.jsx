"use client";
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Formik, Form, Field, FieldArray } from 'formik';
import axios from 'axios';

const initialValues = {
  goalsAndMeasures: [
    {
      name: 'Kurzfristige Ziele',
      goal: '',
      measures: '',
      responsibilities: '',
      status: ''
    },
    {
      name: 'Langfristige Ziele',
      goal: '',
      measures: '',
      responsibilities: '',
      status: ''
    },
    {
      name: 'Konkrete Maßnahmen zur Zielerreichung',
      goal: '',
      measures: '',
      responsibilities: '',
      status: ''
    },
    {
      name: 'Verantwortlichkeiten und Zuständigkeiten',
      goal: '',
      measures: '',
      responsibilities: '',
      status: ''
    }
  ]
};

const responsibilityOptions = ['Pflegekraft', 'Arzt', 'Angehörige', 'Patient'];
const statusOptions = ['In Bearbeitung', 'Abgeschlossen', 'Ausstehend'];

const Step5 = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const patientId = searchParams.get('patientId');

  const handleSubmit = async (values) => {
    try {
      await axios.post('/api/saveCarePlan', { ...values, patientId });
      router.push(`/Aufnahme/step6?patientId=${patientId}`);
    } catch (error) {
      console.error('Fehler beim Speichern der Pflegeplanung:', error);
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

export default Step5;
