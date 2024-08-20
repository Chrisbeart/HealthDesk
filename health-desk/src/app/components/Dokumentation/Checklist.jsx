import React, { useState, useRef } from 'react';
import { TfiWrite } from "react-icons/tfi";
import { GrNotes } from "react-icons/gr";
import { GoInfo } from "react-icons/go";
import { FiMaximize, FiMinimize } from 'react-icons/fi';

const Checklist = () => {
  const initialItems = [
    { label: 'Waschen', status: 'red' },
    { label: 'Medikamenten Vergabe', status: 'green' },
    { label: 'Wundversorgung', status: 'green' },
    { label: 'Ernährung und Flüssigkeitszufuhr', status: 'green' },
    { label: 'Kommunikation mit Angehörigen und Ärzten', status: 'red' },
    { label: 'Hygiene und Sauberkeit', status: 'green' },
    { label: 'Schmerzmanagement', status: 'red' },
    { label: 'Mobilitätsübungen', status: 'green' },
    { label: 'Vitalzeichenüberwachung', status: 'green' },
    { label: 'Beschäftigungstherapie', status: 'red' },
    { label: 'Regelmäßige Toilettengänge', status: 'green' },
    { label: 'Kleidung wechseln', status: 'red' },
    { label: 'Hautpflege', status: 'green' },
    { label: 'Trinkmenge kontrollieren', status: 'green' },
    { label: 'Zimmer lüften', status: 'red' },
  ];

  const [items, setItems] = useState(initialItems);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const checklistRef = useRef(null);

  const handleToggle = (index) => {
    const updatedItems = items.map((item, idx) => {
      if (idx === index) {
        return { ...item, status: item.status === 'green' ? 'red' : 'green' };
      }
      return item;
    });

    setItems(updatedItems);

    if (updatedItems[index].status === 'green') {
      setTimeout(() => {
        setItems((prevItems) =>
          prevItems.map((item, idx) => {
            if (idx === index) {
              return { ...item, status: 'red' };
            }
            return item;
          })
        );
      }, 5000); // Adjust this timeout as needed
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (checklistRef.current.requestFullscreen) {
        checklistRef.current.requestFullscreen();
      } else if (checklistRef.current.mozRequestFullScreen) { /* Firefox */
        checklistRef.current.mozRequestFullScreen();
      } else if (checklistRef.current.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        checklistRef.current.webkitRequestFullscreen();
      } else if (checklistRef.current.msRequestFullscreen) { /* IE/Edge */
        checklistRef.current.msRequestFullscreen();
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
    <div ref={checklistRef} className="p-4 rounded-2xl bg-custom-light-gray bg-opacity-60 overflow-hidden w-full h-full z-20 custom-scrollbar">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-lato text-2xl mx-4">CHECKLISTE DOKUMENTATION</h2>
        <button onClick={toggleFullscreen} className="p-2 bg-custom-light-gray rounded-full hover:bg-custom-dark-gray transition-all duration-300">
          {isFullscreen ? <FiMinimize className="w-6 h-6" /> : <FiMaximize className="w-6 h-6" />}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full overflow-y-scroll">
        {items.map((item, index) => (
          <div key={index} className="flex items-center px-4 col-span-1">
            <span className="font-medium font-istok text-lg tracking-wide flex-1">{item.label}</span>
            <div className="flex items-center space-x-4">
              <button
                className={`w-20 h-6 rounded-full flex items-center justify-start px-1 transition duration-300 bg-custom-light-gray shadow-md drop-shadow-lg`}
                onClick={() => handleToggle(index)}
              >
                <div
                  className={`w-10 h-5 rounded-full transform transition-transform duration-300 ${item.status === 'green' ? 'translate-x-8 bg-green-800' : 'translate-x-0 bg-red-800'}`}
                ></div>
              </button>
            </div>
            <div className="flex w-12 h-8 mx-6 space-x-4">
              <button className="w-10 h-10 px-1 bg-custom-light-gray hover:bg-custom-dark-gray bg-opacity-50 rounded-full flex items-center justify-center hover:w-12 hover:bg-opacity-90 transition duration-300">
                <GrNotes className='w-6 h-6' />
              </button>
              <button className="w-10 h-10 px-1 bg-custom-light-gray hover:bg-custom-dark-gray bg-opacity-50 rounded-full flex items-center justify-center hover:w-12 hover:bg-opacity-90 transition duration-300">
                <GoInfo className='w-6 h-6' />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checklist;
