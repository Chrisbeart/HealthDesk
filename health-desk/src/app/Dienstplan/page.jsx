import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaCalendar, FaPlus } from "react-icons/fa";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US'; // Import locale directly
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CompactPicker } from 'react-color';
import '../styles/dienstplan.css'; // Import the custom CSS (assuming it's in the styles directory)

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const initialPeople = [
  { name: "Neu", color: "#f44336" },
  { name: "Chris", color: "#2196f3" },
  { name: "Jac", color: "#4caf50" },
  { name: "Jojo", color: "#ffeb3b" },
];

const initialEvents = [
  { title: 'Pflegedienst', start: new Date(2024, 8, 14, 11, 0), end: new Date(2024, 8, 14, 12, 0), resource: 'Chris', color: '#2196f3' },
  { title: 'Pflegedienst', start: new Date(2024, 8, 14, 12, 0), end: new Date(2024, 8, 14, 13, 0), resource: 'Chris', color: '#2196f3' },
  { title: 'Pause', start: new Date(2024, 8, 14, 14, 0), end: new Date(2024, 8, 14, 15, 0), resource: 'Jac', color: '#4caf50' },
  { title: 'Meeting', start: new Date(2024, 8, 14, 15, 0), end: new Date(2024, 8, 14, 16, 0), resource: 'Jac', color: '#4caf50' },
];

const loggedInPerson = "Chris"; // Simulating the logged-in person

const Dienstplan = () => {
  const [people, setPeople] = useState(initialPeople);
  const [selectedPerson, setSelectedPerson] = useState(loggedInPerson);
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 8, 14));
  const [events, setEvents] = useState(initialEvents);
  const [newPersonName, setNewPersonName] = useState('');
  const [newPersonColor, setNewPersonColor] = useState('#000000');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showEventAdder, setShowEventAdder] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventStart, setNewEventStart] = useState('');
  const [newEventEnd, setNewEventEnd] = useState('');

  const handlePersonChange = (event) => {
    setSelectedPerson(event.target.value);
  };

  const handleDateChange = (direction) => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (direction === 'next') {
      newDate.setDate(newDate.getDate() + 1);
    }
    setSelectedDate(newDate);
  };

  const formatDate = (date) => {
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const filteredEvents = events.filter(event => event.resource === selectedPerson);

  const handleAddPerson = () => {
    if (newPersonName) {
      setPeople([...people, { name: newPersonName, color: newPersonColor }]);
      setNewPersonName('');
      setNewPersonColor('#000000');
      setShowColorPicker(false);
    }
  };

  const handleAddEvent = () => {
    if (newEventTitle && newEventStart && newEventEnd && selectedPerson) {
      const personColor = people.find(person => person.name === selectedPerson).color;
      setEvents([...events, {
        title: newEventTitle,
        start: new Date(newEventStart),
        end: new Date(newEventEnd),
        resource: selectedPerson,
        color: personColor,
      }]);
      setNewEventTitle('');
      setNewEventStart('');
      setNewEventEnd('');
      setShowEventAdder(false);
    }
  };

  return (
    <div className="calendar-container h-full z-20">
      <div className="calendar-header">
        <div className="flex items-center mx-6 justify-around w-[40%]">
          <button onClick={() => handleDateChange('prev')} className="button-nav">
            <FaArrowLeft className="w-6 h-6" />
          </button>
          <div className="date-display space-x-6">
            <FaCalendar className="w-8 h-8 " />
            <p>{formatDate(selectedDate)}</p>
          </div>
          <button onClick={() => handleDateChange('next')} className="button-nav">
            <FaArrowRight className="w-6 h-6" />
          </button>
        </div>
        <div className="person-select-container">
          <select
            id="personSelect"
            value={selectedPerson}
            onChange={handlePersonChange}
            className="person-select"
            style={{ backgroundColor: people.find(person => person.name === selectedPerson)?.color }}
          >
            {people.map((person, index) => (
              <option
                key={index}
                value={person.name}
                style={{ backgroundColor: person.color, color: 'white' }}
              >
                {person.name}
              </option>
            ))}
          </select>
          <button onClick={() => setShowColorPicker(!showColorPicker)} className="button-add-person">
            <FaPlus />
          </button>
        </div>
      </div>
      {showColorPicker && (
        <div className="popup">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="New Person Name"
              value={newPersonName}
              onChange={(e) => setNewPersonName(e.target.value)}
              className="p-2 border rounded mr-2"
            />
            <CompactPicker
              color={newPersonColor}
              onChangeComplete={(color) => setNewPersonColor(color.hex)}
            />
            <button onClick={handleAddPerson} className="button-add-person">
              Add Person
            </button>
          </div>
        </div>
      )}
      <div className="flex justify-between p-4">
        <button onClick={() => setShowEventAdder(!showEventAdder)} className="button-add-event">
          <FaPlus className="mr-2" />
          Add Event
        </button>
      </div>
      {showEventAdder && (
        <div className="popup">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Event Title"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              className="p-2 border rounded mr-2 bg-white text-black"
            />
            <input
              type="datetime-local"
              value={newEventStart}
              onChange={(e) => setNewEventStart(e.target.value)}
              className="p-2 border rounded mr-2 bg-white text-black"
            />
            <input
              type="datetime-local"
              value={newEventEnd}
              onChange={(e) => setNewEventEnd(e.target.value)}
              className="p-2 border rounded mr-2 bg-white text-black"
            />
            <button onClick={handleAddEvent} className="button-add-event">
              Add Event
            </button>
          </div>
        </div>
      )}
      <div className="calendar-grid">
        <Calendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 550, width: '100%' }}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.color,
            },
          })}
        />
      </div>
    </div>
  );
};

export default Dienstplan;
