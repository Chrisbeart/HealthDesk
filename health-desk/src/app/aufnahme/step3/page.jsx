"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { saveStep3Data } from '../state/actions';

const initialValues = {
  currentHealth: '',
  psychologicalSupport: '',
  socialSupport: '',
  spiritualSupport: '',
};

const Step3 = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        const patientId = 1; // Verwende die tatsächliche patientId, die du zuordnen möchtest
        dispatch(saveStep3Data({ ...values, patientId }));
        router.push('/aufnahme/step4');
      }}
    >
      {() => (
        <Form className="flex flex-col w-full h-full z-20">
          <div className="flex h-[15%] justify-between items-center">
            <div className="flex p-10 py-16">
              <h2 className="text-4xl font-fjalla p-6">
                Psychosoziale und spirituelle Unterstützung<span className="text-xl"></span>
              </h2>
            </div>
          </div>
          <div className="flex justify-center items-center h-[70%] w-full">
            <div className="flex w-[95%] h-full bg-custom-light-gray bg-opacity-25 rounded-xl p-4 overflow-y-scroll custom-scrollbar">
              <div className="flex flex-col w-full space-y-4">
                <div className="flex flex-col space-y-2">
                  <h3 className="text-2xl font-thin">Aktuelle Gesundheit</h3>
                  <Field
                    name="currentHealth"
                    placeholder="Beschreiben Sie den aktuellen Gesundheitszustand"
                    className="font-lato text-md text-center p-4 mx-4 rounded-xl bg-custom-light-gray bg-opacity-35 drop-shadow-xl w-full"
                    component="textarea"
                    rows="4"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <h3 className="text-2xl font-thin">Psychologische Unterstützung</h3>
                  <Field
                    name="psychologicalSupport"
                    placeholder="Beschreiben Sie die psychologische Unterstützung"
                    className="font-lato text-md text-center p-4 mx-4 rounded-xl bg-custom-light-gray bg-opacity-35 drop-shadow-xl w-full"
                    component="textarea"
                    rows="4"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <h3 className="text-2xl font-thin">Soziale Unterstützung</h3>
                  <Field
                    name="socialSupport"
                    placeholder="Beschreiben Sie die soziale Unterstützung"
                    className="font-lato text-md text-center p-4 mx-4 rounded-xl bg-custom-light-gray bg-opacity-35 drop-shadow-xl w-full"
                    component="textarea"
                    rows="4"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <h3 className="text-2xl font-thin">Spirituelle Unterstützung</h3>
                  <Field
                    name="spiritualSupport"
                    placeholder="Beschreiben Sie die spirituelle Unterstützung"
                    className="font-lato text-md text-center p-4 mx-4 rounded-xl bg-custom-light-gray bg-opacity-35 drop-shadow-xl w-full"
                    component="textarea"
                    rows="4"
                  />
                </div>
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

export default Step3;
