import React, { useState } from 'react';

const Notizen = () => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState('');

  const addNote = () => {
    if (note.trim()) {
      setNotes([...notes, note]);
      setNote('');
    }
  };

  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-bold mb-4">Notizen</h2>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="Notiz eingeben"
      />
      <button
        onClick={addNote}
        className="w-full bg-custom-light-gray hover:bg-custom-dark-gray hover:text-white p-2 rounded-lg transition-all"
      >
        Notiz hinzufügen
      </button>
      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Gespeicherte Notizen:</h3>
        <ul>
          {notes.map((note, index) => (
            <li key={index} className="list-disc list-inside">
              {note}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notizen;
