"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, FieldArray } from 'formik';
import { useDispatch } from 'react-redux';
import { saveStep2Data } from '../state/actions';

const initialValues = {
  diagnoses: '',
  medications: [{ name: '', dose: '', frequency: '', duration: '' }],
  allergies: [{ type: '', details: '', intensity: '', treatment: '' }],
  importantInfo: '',
  therapies: ''
};

const medicationOptions = ['Medikament A', 'Medikament B', 'Medikament C'];
const doseOptions = ['1mg', '5mg', '10mg'];
const frequencyOptions = ['1x täglich', '2x täglich', '3x täglich'];
const durationOptions = ['1 Woche', '1 Monat', '3 Monate'];
const allergyOptions = ['Heuschnupfen', 'Hausstaubmilbenallergie', 'Tierallergie', 'Nesselsucht', 'Sonnenallergie', 'Kontaktallergie', 'Schimmelallergie', 'Kreuzallergien', 'Insektengiftallergie', 'Nahrungsmittelallergie', 'Histamin', 'Berufsbedingte Allergien'];
const animalOptions = ['Katzen', 'Hunde', 'Pferde', 'Nagetiere'];
const intensityOptions = ['Leicht', 'Mittel', 'Schwer'];

const Step2 = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        const patientId = 1; // Verwende die tatsächliche patientId, die du zuordnen möchtest
        dispatch(saveStep2Data({ ...values, patientId }));
        router.push('/step3');
      }}
    >
      {({ values }) => (
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

export default Step2;
