"use client";
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Formik, Form, Field, FieldArray } from 'formik';
import axios from 'axios';

const initialValues = {
  evaluation: [
    { name: 'Regelmäßige Überprüfung der Pflegeplanung', responsible: '', frequency: '', notes: '' },
    { name: 'Anpassungen basierend auf aktuellen Bedürfnissen und Veränderungen', responsible: '', frequency: '', notes: '' },
  ],
  nurse: '',
  management: '',
};

const frequencyOptions = ['Täglich', 'Wöchentlich', 'Monatlich', 'Vierteljährlich', 'Halbjährlich', 'Jährlich'];

const Step6 = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const patientId = searchParams.get('patientId');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (values) => {
    const completeData = {
      ...values,
      patientId,
    };

    try {
      const response = await axios.post('/api/saveEvaluation', completeData);

      if (response.status === 201) {
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Fehler beim Speichern der Patientendaten:', error);
      alert('Es gab ein Problem beim Speichern der Daten. Bitte versuche es erneut.');
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    router.push('/Patientenliste'); // Navigiere nach Abschluss zur Patientenliste
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values }) => (
        <Form className="flex flex-col w-full h-full z-20 text-black">
          {/* Form-Inhalt */}
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center text-black bg-gray-500 bg-opacity-75">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl mb-4">Patient erfolgreich angelegt</h3>
                <button
                  onClick={handlePopupClose}
                  className="font-lato semibold text-black bg-opacity-75 text-xl w-32 h-12 rounded-xl bg-custom-dark-gray"
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

export default Step6;
