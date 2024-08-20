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
        router.push('/Aufnahme/step3');
      }}
    >
      {({ values }) => (
        <Form className="flex flex-col w-full h-full z-20 text-black">
          <div className="flex h-[15%] justify-between items-center">
            <div className="flex p-10 py-16">
              <h2 className="text-4xl font-fjalla p-6">
                Medizinische Diagnosen und Therapie<span className="text-xl"></span>
              </h2>
            </div>
          </div>
          <div className="flex justify-center items-center h-[70%] w-full">
            <div className="flex w-[95%] h-full bg-custom-light-gray bg-opacity-25 rounded-xl p-4 overflow-y-scroll custom-scrollbar">
              <div className="flex flex-col w-full space-y-4">
                <div className="flex flex-col space-y-2">
                  <h3 className="text-2xl font-thin">Aktuelle Diagnosen</h3>
                  <Field
                    name="diagnoses"
                    placeholder="Geben Sie Diagnosen ein"
                    className="font-lato text-md text-center p-4 mx-4 rounded-xl bg-custom-light-gray bg-opacity-35 drop-shadow-xl w-full"
                    component="textarea"
                    rows="4"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <h3 className="text-2xl font-thin">Medikamente</h3>
                  <FieldArray name="medications">
                    {({ form, push, remove }) => (
                      <>
                        {form.values.medications.map((_, index) => (
                          <div key={index} className="flex flex-row gap-2 items-center">
                            <Field as="select" name={`medications[${index}].name`} className="drop-shadow-md font-lato text-md text-center p-4 mx-4 rounded-xl bg-custom-light-gray bg-opacity-45 w-full">
                              <option value="">Medikament</option>
                              {medicationOptions.map((option, i) => (
                                <option key={i} value={option}>{option}</option>
                              ))}
                            </Field>
                            <Field as="select" name={`medications[${index}].dose`} className="drop-shadow-md font-lato text-md text-center p-4 mx-4 rounded-xl bg-custom-light-gray bg-opacity-45 w-full">
                              <option value="">Dosis</option>
                              {doseOptions.map((option, i) => (
                                <option key={i} value={option}>{option}</option>
                              ))}
                            </Field>
                            <Field as="select" name={`medications[${index}].frequency`} className="drop-shadow-md font-lato text-md text-center p-4 mx-4 rounded-xl bg-custom-light-gray bg-opacity-45 w-full">
                              <option value="">Frequenz</option>
                              {frequencyOptions.map((option, i) => (
                                <option key={i} value={option}>{option}</option>
                              ))}
                            </Field>
                            <Field as="select" name={`medications[${index}].duration`} className="drop-shadow-md font-lato text-md text-center p-4 mx-4 rounded-xl bg-custom-light-gray bg-opacity-45 w-full">
                              <option value="">Dauer</option>
                              {durationOptions.map((option, i) => (
                                <option key={i} value={option}>{option}</option>
                              ))}
                            </Field>
                            {index !== form.values.medications.length - 1 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className=" flex justify-center items-center font-lato semibold text-white bg-opacity-75 text-xl w-16 h-4 rounded-full bg-red-600"
                              >
                                -
                              </button>
                            )}
                            {index === form.values.medications.length - 1 &&
                              form.values.medications[index].name &&
                              form.values.medications[index].dose &&
                              form.values.medications[index].frequency &&
                              form.values.medications[index].duration && (
                                <button
                                  type="button"
                                  onClick={() => push({ name: '', dose: '', frequency: '', duration: '' })}
                                  className="font-lato semibold text-white bg-opacity-75 text-md w-24 h-10 rounded-xl bg-custom-dark-gray"
                                >
                                  +
                                </button>
                              )}
                          </div>
                        ))}
                      </>
                    )}
                  </FieldArray>
                </div>
                <div className="flex flex-col space-y-2">
                  <h3 className="text-2xl font-thin">Allergien und Unverträglichkeiten</h3>
                  <FieldArray name="allergies">
                    {({ form, push, remove }) => (
                      <>
                        {form.values.allergies.map((_, index) => (
                          <div key={index} className="flex flex-col space-y-2">
                            <Field as="select" name={`allergies[${index}].type`} className="drop-shadow-md font-lato text-md text-center p-4 mx-4 rounded-xl bg-custom-light-gray bg-opacity-35 w-full"
                              value={form.values.allergies[index].type}
                              onChange={(e) => {
                                form.setFieldValue(`allergies[${index}].type`, e.target.value);
                                form.setFieldValue(`allergies[${index}].details`, '');
                              }}
                            >
                              <option value="">Wählen Sie eine Allergie</option>
                              {allergyOptions.map((option, i) => (
                                <option key={i} value={option}>{option}</option>
                              ))}
                            </Field>
                            {form.values.allergies[index].type === 'Tierallergie' && (
                              <Field as="select" name={`allergies[${index}].details`} className="drop-shadow-md font-lato text-md text-center p-4 mx-4 rounded-xl bg-custom-light-gray bg-opacity-35 w-full">
                                <option value="">Wählen Sie ein Tier</option>
                                {animalOptions.map((option, i) => (
                                  <option key={i} value={option}>{option}</option>
                                ))}
                              </Field>
                            )}
                            {form.values.allergies[index].type && form.values.allergies[index].type !== 'Tierallergie' && form.values.allergies[index].type !== 'Heuschnupfen' && (
                              <Field
                                name={`allergies[${index}].details`}
                                placeholder="Geben Sie Details ein"
                                className="drop-shadow-md font-lato text-md text-center p-4 mx-4 rounded-xl bg-custom-light-gray bg-opacity-35 w-full"
                                component="textarea"
                                rows="4"
                              />
                            )}
                            {form.values.allergies[index].type && (
                              <>
                                <Field as="select" name={`allergies[${index}].intensity`} className="drop-shadow-md font-lato text-md text-center p-4 mx-4 rounded-xl bg-custom-light-gray bg-opacity-35 w-full">
                                  <option value="">Wählen Sie die Intensität</option>
                                  {intensityOptions.map((option, i) => (
                                    <option key={i} value={option}>{option}</option>
                                  ))}
                                </Field>
                                <Field
                                  name={`allergies[${index}].treatment`}
                                  placeholder="Geben Sie eine Behandlung ein"
                                  className="drop-shadow-md font-lato text-md text-center p-4 mx-4 rounded-xl bg-custom-light-gray bg-opacity-35 w-full"
                                  component="textarea"
                                  rows="4"
                                />
                              </>
                            )}
                            {index !== form.values.allergies.length - 1 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="flex justify-center items-center font-lato semibold text-white bg-opacity-75 text-xl w-16 h-4 rounded-full bg-red-600"
                              >
                                -
                              </button>
                            )}
                            {index === form.values.allergies.length - 1 &&
                              form.values.allergies[index].type &&
                              form.values.allergies[index].intensity &&
                              form.values.allergies[index].treatment && (
                                <button
                                  type="button"
                                  onClick={() => push({ type: '', details: '', intensity: '', treatment: '' })}
                                  className="font-lato semibold text-white bg-opacity-75 text-md w-24 h-10 rounded-xl bg-custom-dark-gray"
                                >
                                  Hinzufügen
                                </button>
                              )}
                          </div>
                        ))}
                      </>
                    )}
                  </FieldArray>
                </div>
                <div className="flex flex-col space-y-2">
                  <h3 className="text-2xl font-thin">Wichtige medizinische Informationen</h3>
                  <Field
                    name="importantInfo"
                    placeholder="Geben Sie wichtige medizinische Informationen ein"
                    className="drop-shadow-md font-lato text-md text-center p-4 mx-4 rounded-xl bg-custom-light-gray bg-opacity-35 w-full"
                    component="textarea"
                    rows="4"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <h3 className="text-2xl font-thin">Therapien und Behandlungen</h3>
                  <Field
                    name="therapies"
                    placeholder="Geben Sie Therapien ein"
                    className="drop-shadow-md font-lato text-md text-center p-4 mx-4 rounded-xl bg-custom-light-gray bg-opacity-35 w-full"
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

export default Step2;
