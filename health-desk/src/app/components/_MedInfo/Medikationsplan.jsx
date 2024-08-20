import React, { useState, useRef } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { FiMaximize, FiMinimize } from 'react-icons/fi';
import PropTypes from 'prop-types';

const MedicationPlan = ({ patient }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const medicationRef = useRef(null);

  if (!patient) {
    return <div>No patient data available</div>;
  }

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (medicationRef.current.requestFullscreen) {
        medicationRef.current.requestFullscreen();
      } else if (medicationRef.current.mozRequestFullScreen) { /* Firefox */
        medicationRef.current.mozRequestFullScreen();
      } else if (medicationRef.current.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        medicationRef.current.webkitRequestFullscreen();
      } else if (medicationRef.current.msRequestFullscreen) { /* IE/Edge */
        medicationRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari & Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div ref={medicationRef} className="p-4 rounded-2xl bg-custom-light-gray bg-opacity-60 overflow-hidden w-full h-full z-20 custom-scrollbar">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-lato text-2xl mx-4">MEDIKATIONSPLAN</h2>
        <button onClick={toggleFullscreen} className="p-2 bg-custom-light-gray rounded-full hover:bg-custom-dark-gray transition-all duration-300">
          {isFullscreen ? <FiMinimize className="w-6 h-6" /> : <FiMaximize className="w-6 h-6" />}
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full overflow-y-scroll">
        <div className="space-y-4">
          <Section title="Morgens" medications={patient.morningMedications} />
          <Section title="Nachmittags" medications={patient.afternoonMedications} />
          <Section title="Abends" medications={patient.eveningMedications} />
        </div>
        <div className="space-y-4">
          <Section title="Aktiv" medications={patient.activeMedications} />
          <Section title="Vorherig" medications={patient.previousMedications} />
        </div>
        <div className="space-y-4">
          <Appointments appointments={patient.appointments} />
          <AddMedicationForm />
        </div>
      </div>
      <div className="mt-6">
        <Reminders />
      </div>
    </div>
  );
};

const Section = ({ title, medications }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    {medications?.map((med, index) => (
      <div key={index} className="medication-item flex justify-between items-center bg-gray-100 p-2 rounded-lg mb-2">
        <div>
          <p className="font-semibold">{med.name}</p>
          <p className="text-sm text-gray-600">{med.dosage}</p>
          <p className="text-sm text-gray-600">{med.type}</p>
        </div>
        <FaCheckCircle className="text-green-500" />
      </div>
    ))}
  </div>
);

const Appointments = ({ appointments }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold mb-2">Termine</h2>
    {appointments?.map((appointment, index) => (
      <div key={index} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-2">
        <div>
          <p className="font-semibold">{appointment.doctor}</p>
          <p className="text-sm text-gray-600">{appointment.date}</p>
        </div>
        <FaCheckCircle className="text-green-500" />
      </div>
    ))}
  </div>
);

const AddMedicationForm = () => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold mb-2">Neue Medikation hinzufügen</h2>
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700">Datum auswählen</label>
        <input type="date" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
      </div>
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700">Medikationsname</label>
        <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
      </div>
      <div className="col-span-2 md:col-span-1">
        <label className="block text-sm font-medium text-gray-700">Medikationstyp</label>
        <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
      </div>
      <div className="col-span-2 md:col-span-1">
        <label className="block text-sm font-medium text-gray-700">Dosis</label>
        <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
      </div>
      <div className="col-span-2 md:col-span-1">
        <label className="block text-sm font-medium text-gray-700">Vom</label>
        <input type="date" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
      </div>
      <div className="col-span-2 md:col-span-1">
        <label className="block text-sm font-medium text-gray-700">Bis</label>
        <input type="date" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
      </div>
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700">Beschreibung</label>
        <textarea className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
      </div>
    </div>
  </div>
);

const Reminders = () => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold mb-2">Erinnerungen</h2>
    <div className="bg-gray-100 p-4 rounded-lg">
      <p className="font-semibold">Termin mit Dr. Sunshine in 20min</p>
      <p className="text-sm text-gray-600">Raum 094, 16:00</p>
    </div>
  </div>
);

MedicationPlan.propTypes = {
  patient: PropTypes.shape({
    morningMedications: PropTypes.array,
    afternoonMedications: PropTypes.array,
    eveningMedications: PropTypes.array,
    activeMedications: PropTypes.array,
    previousMedications: PropTypes.array,
    appointments: PropTypes.array,
  }),
};

MedicationPlan.defaultProps = {
  patient: {
    morningMedications: [
      { name: 'Aspirin', dosage: '100mg', type: 'Tablette' },
      { name: 'Vitamin D', dosage: '1000 IU', type: 'Tropfen' },
    ],
    afternoonMedications: [
      { name: 'Ibuprofen', dosage: '200mg', type: 'Tablette' },
    ],
    eveningMedications: [
      { name: 'Paracetamol', dosage: '500mg', type: 'Tablette' },
      { name: 'Omega-3', dosage: '1 Kapsel', type: 'Kapsel' },
    ],
    activeMedications: [
      { name: 'Metformin', dosage: '500mg', type: 'Tablette' },
      { name: 'Lisinopril', dosage: '20mg', type: 'Tablette' },
    ],
    previousMedications: [
      { name: 'Atorvastatin', dosage: '10mg', type: 'Tablette' },
    ],
    appointments: [
      { doctor: 'Dr. Smith', date: '2024-07-15' },
      { doctor: 'Dr. Jones', date: '2024-08-01' },
    ],
  },
};

export default MedicationPlan;
