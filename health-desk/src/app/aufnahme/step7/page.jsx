"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, FieldArray } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { createSelector } from 'reselect';

const initialValues = {
  evaluation: [
    { name: 'Regelmäßige Überprüfung der Pflegeplanung', responsible: '', frequency: '', notes: '' },
    { name: 'Anpassungen basierend auf aktuellen Bedürfnissen und Veränderungen', responsible: '', frequency: '', notes: '' },
  ],
  nurse: '',
  management: '',
};

// Selektoren für die Daten der vorherigen Schritte
const step1DataSelector = createSelector(
  (state) => state.step1,
  (step1) => step1?.data || {}
);

const step2DataSelector = createSelector(
  (state) => state.step2,
  (step2) => step2?.data || {}
);

const Step7 = () => {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  const step1Data = useSelector(step1DataSelector);
  const step2Data = useSelector(step2DataSelector);

  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    const completeData = {
      ...step1Data,
      ...step2Data,
      evaluation: values.evaluation,
      nurse: values.nurse,
      management: values.management,
      patientId: step1Data.patientId, 
    };

    axios.post('http://your-api-url/step7', completeData)
      .then(response => {
        setShowPopup(true);
      })
      .catch(error => {
        console.error('Fehler beim Speichern der Patientendaten:', error);
      });
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    router.push('/patientenliste');  // Navigiere nach Abschluss zur Patientenliste
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values }) => (
        <Form className="flex flex-col w-full h-full z-20">
          {/* Form Inhalt */}
          <div className="flex justify-center mt-4 px-10">
            <button
              type="submit"
              className="font-lato semibold text-white bg-opacity-75 text-xl w-32 h-12 rounded-xl bg-custom-dark-gray"
            >
              Daten senden
            </button>
          </div>
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl mb-4">Patient erfolgreich angelegt</h3>
                <button
                  onClick={handlePopupClose}
                  className="font-lato semibold text-white bg-opacity-75 text-xl w-32 h-12 rounded-xl bg-custom-dark-gray"
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default Step7;
