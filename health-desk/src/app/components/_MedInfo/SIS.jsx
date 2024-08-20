import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const SISForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    signature: '',
    responsible: '',
    currentSituation: '',
    fields: {
      cognitive: '',
      mobility: '',
      requirements: '',
      selfCare: '',
      social: '',
      housekeeping: '',
    },
    risks: {
      cognitive: ['', '', '', '', '', ''],
      mobility: ['', '', '', '', '', ''],
      requirements: ['', '', '', '', '', ''],
      selfCare: ['', '', '', '', '', ''],
      social: ['', '', '', '', '', ''],
    },
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFieldChange = (field, value) => {
    setFormData({ ...formData, fields: { ...formData.fields, [field]: value } });
  };

  const handleRiskChange = (field, index, value) => {
    const updatedRisks = { ...formData.risks };
    updatedRisks[field][index] = value;
    setFormData({ ...formData, risks: updatedRisks });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('YOUR_BACKEND_ENDPOINT', formData);
      console.log('Form submitted successfully', response.data);
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  return (
    <div className="p-6 flex flex-col w-full h-full justify-start items-start z-20 overflow-y-auto">
      <div className="rounded-2xl p-8 w-full bg-white bg-opacity-35 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-4xl font-lato font-semibold">SIS - strukturierte Informationssammlung</h2>
          <div className="flex space-x-4">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select a date"
              className="p-2 border rounded"
            />
            <label className="flex items-center text-xl font-lato font-light">
              <input type="checkbox" className="mr-2" />
              Erstgespräch
            </label>
            <label className="flex items-center text-xl font-lato font-light">
              <input type="checkbox" className="mr-2" />
              Folgegespräch
            </label>
          </div>
        </div>

        <div className="mb-4 py-6">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Name der pflegebedürftigen Person"
              className="p-2 border rounded w-1/3 bg-custom-light-gray bg-opacity-45"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            <input
              type="date"
              placeholder="Gespräch am"
              className="p-2 border rounded w-1/3 bg-custom-light-gray bg-opacity-45"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
            />
            <input
              type="text"
              placeholder="Handzeichen Pflegefachkraft"
              className="p-2 border rounded w-1/3 bg-custom-light-gray bg-opacity-45"
              value={formData.signature}
              onChange={(e) => handleInputChange('signature', e.target.value)}
            />
            <input
              type="text"
              placeholder="pflegebedürftige Person/Angehöriger/Betreuer"
              className="p-2 border rounded w-1/3 bg-custom-light-gray bg-opacity-45"
              value={formData.responsible}
              onChange={(e) => handleInputChange('responsible', e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4 px-4 py-2 bg-white bg-opacity-45">
          <h3 className="text-lg font-semibold mb-2">Was bewegt Sie im Augenblick? Was brauchen Sie? Was können wir für Sie tun?</h3>
          <textarea
            className="w-full p-2 border rounded h-20 bg-custom-dark-gray bg-opacity-45 text-black"
            value={formData.currentSituation}
            onChange={(e) => handleInputChange('currentSituation', e.target.value)}
          ></textarea>
        </div>

        {[
          { title: ' 1 – kognitive und kommunikative Fähigkeiten', color: 'bg-red-100', field: 'cognitive' },
          { title: ' 2 – Mobilität und Beweglichkeit', color: 'bg-yellow-100', field: 'mobility' },
          { title: ' 3 – krankheitsbezogene Anforderungen und Belastungen', color: 'bg-green-100', field: 'requirements' },
          { title: ' 4 – Selbstversorgung', color: 'bg-purple-100', field: 'selfCare' },
          { title: ' 5 – Leben in sozialen Beziehungen', color: 'bg-blue-100', field: 'social' },
          { title: ' 6 – Haushaltsführung', color: 'bg-pink-100', field: 'housekeeping' },
        ].map((field, index) => (
          <div className={`mb-4 ${field.color} bg-opacity-70 px-4 py-2`} key={index}>
            <h3 className="text-lg font-semibold mb-2">{field.title}</h3>
            <textarea
              className="w-full p-2 border rounded h-20 bg-custom-dark-gray bg-opacity-45 text-black"
              value={formData.fields[field.field]}
              onChange={(e) => handleFieldChange(field.field, e.target.value)}
            ></textarea>
          </div>
        ))}

        <div className="mt-6">
          <h3 className="text-2xl font-lato font-semibold py-4 mb-2">
            Erste fachliche Einschätzung der für die Pflege und Betreuung relevanten Risiken und Phänomene
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-collapse">
              <thead>
                <tr className="bg-custom-dark-gray bg-opacity-45 text-xl">
                  <th className="border p-2 font-thin">Risiko</th>
                  {['Diabetes', 'Sturz', 'Inkontinenz', 'Schmerz', 'Ernährung', 'Sonstiges'].map((risk, index) => (
                    <th className="border p-2 font-thin" key={index}>{risk}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { field: 'cognitive', label: 'kognitive und kommunikative Fähigkeiten' },
                  { field: 'mobility', label: 'Mobilität und Beweglichkeit' },
                  { field: 'requirements', label: 'krankheitsbezogene Anforderungen u. Belastungen' },
                  { field: 'selfCare', label: 'Selbstversorgung' },
                  { field: 'social', label: 'Leben in sozialen Beziehungen' },
                ].map((field, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="border p-2">{field.label}</td>
                    {Array(6).fill(0).map((_, colIndex) => (
                      <td className="border p-2" key={colIndex}>
                        <select
                          className="w-full bg-custom-light-gray bg-opacity-45"
                          value={formData.risks[field.field][colIndex]}
                          onChange={(e) => handleRiskChange(field.field, colIndex, e.target.value)}
                        >
                          <option value="">-</option>
                          <option value="ja">Ja</option>
                          <option value="nein">Nein</option>
                          <option value="weiter beobachten">Weiter beobachten</option>
                        </select>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-700 transition-all duration-300"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}; //123

export default SISForm;
