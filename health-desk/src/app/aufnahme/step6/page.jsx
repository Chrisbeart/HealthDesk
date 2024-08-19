"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, FieldArray } from 'formik';
import { useDispatch } from 'react-redux';
import { saveStep6Data } from '../state/actions';

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

const Step6 = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        const patientId = 1; // Verwende die tatsächliche patientId, die du zuordnen möchtest
        dispatch(saveStep6Data({ ...values, patientId }));
        router.push('/step7');
      }}
    >
      {() => (
        <Form className="flex flex-col w-full h-full z-20">
          {/* Restliche Form-Inhalte */}
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

export default Step6;
