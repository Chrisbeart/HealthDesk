"use client";
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

const initialValues = {
  currentHealth: '',
  psychologicalSupport: '',
  socialSupport: '',
  spiritualSupport: '',
};

const Step2 = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const patientId = searchParams.get('patientId');

  const handleSubmit = async (values) => {
    try {
      await axios.post('/api/savePsychosocialSupport', { ...values, patientId });
      router.push(`/Aufnahme/step3?patientId=${patientId}`);
    } catch (error) {
      console.error('Fehler beim Speichern der psychosozialen Unterstützung:', error);
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
                Psychosoziale Unterstützung<span className="text-xl">_Details</span>
              </h2>
            </div>
          </div>
          <div className="flex justify-center items-center h-[70%] w-full">
            <div className="flex w-[95%] h-full bg-custom-light-gray bg-opacity-25 rounded-xl p-4 overflow-y-scroll custom-scrollbar">
              <div className="flex flex-col w-full space-y-4">
                <Field
                  name="currentHealth"
                  placeholder="Aktuelle Gesundheitszustand"
                  className="field"
                  component="textarea"
                  rows="4"
                />
                <Field
                  name="psychologicalSupport"
                  placeholder="Psychologische Unterstützung"
                  className="field"
                  component="textarea"
                  rows="4"
                />
                <Field
                  name="socialSupport"
                  placeholder="Soziale Unterstützung"
                  className="field"
                  component="textarea"
                  rows="4"
                />
                <Field
                  name="spiritualSupport"
                  placeholder="Spirituelle Unterstützung"
                  className="field"
                  component="textarea"
                  rows="4"
                />
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

export default Step2;
