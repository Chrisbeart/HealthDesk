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
      patientId,
      evaluation: values.evaluation,
      nurse: values.nurse,
      management: values.management,
    };

    try {
      const response = await axios.post('/api/saveEvaluation', completeData);
      if (response.status === 201) {
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Fehler beim Speichern der Pflegeplanung:', error);
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
          <FieldArray name="evaluation">
            {({ form }) => (
              <div className="flex flex-col w-full space-y-6">
                <div className="grid grid-cols-4 gap-4 items-center">
                  <div className="text-xl text-center font-fjalla">Kategorie</div>
                  <div className="text-xl text-center font-fjalla">Verantwortlich</div>
                  <div className="text-xl text-center font-fjalla">Häufigkeit</div>
                  <div className="text-xl text-center font-fjalla">Notizen</div>
                </div>
                {form.values.evaluation.map((_, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 items-center">
                    <Field
                      name={`evaluation[${index}].name`}
                      placeholder="Kategorie"
                      className="drop-shadow-md font-lato text-md text-center p-4 rounded-xl bg-custom-light-gray bg-opacity-35"
                      disabled
                    />
                    <Field
                      name={`evaluation[${index}].responsible`}
                      placeholder="Verantwortlich"
                      className="drop-shadow-md font-lato text-md text-center p-4 rounded-xl bg-custom-light-gray bg-opacity-35 w-full"
                    />
                    <Field as="select" name={`evaluation[${index}].frequency`} className="drop-shadow-md font-lato text-md text-center p-4 rounded-xl bg-custom-light-gray bg-opacity-35 w-full">
                      <option value="">Wählen Sie die Häufigkeit</option>
                      {frequencyOptions.map((option, i) => (
                        <option key={i} value={option}>{option}</option>
                      ))}
                    </Field>
                    <Field
                      name={`evaluation[${index}].notes`}
                      placeholder="Geben Sie Notizen ein"
                      className="flex justify-center items-center drop-shadow-md pt-4 h-16 font-lato text-md text-left rounded-xl bg-custom-light-gray bg-opacity-35 px-6 w-full"
                      component="textarea"
                      rows="4"
                    />
                  </div>
                ))}
              </div>
            )}
          </FieldArray>
          <div className="flex justify-center mt-4 px-10">
            <button
              type="submit"
              className="font-lato semibold text-white bg-opacity-75 text-xl w-32 h-12 rounded-xl bg-custom-dark-gray"
            >
              Daten senden
            </button>
          </div>
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
