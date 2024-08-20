"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { saveStep5Data } from '../state/actions';

const initialValues = {
  dailyRoutine: '',
  nutrition: '',
  physicalActivity: '',
  sleepPattern: '',
};

const Step5 = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        const patientId = 1; // Verwende die tatsächliche patientId, die du zuordnen möchtest
        dispatch(saveStep5Data({ ...values, patientId }));
        router.push('/step6');
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

export default Step5;
