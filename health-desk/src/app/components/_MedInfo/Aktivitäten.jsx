import React, { useState, useRef } from 'react';
import { FiMaximize, FiMinimize } from 'react-icons/fi';

const AktivitätenProtokoll = () => {
  const initialActivities = {
    walking: '',
    eating: '',
    sleeping: '',
    exercising: '',
    socializing: '',
  };

  const [activities, setActivities] = useState(initialActivities);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const activitiesRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivities((prevActivities) => ({
      ...prevActivities,
      [name]: value,
    }));
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (activitiesRef.current.requestFullscreen) {
        activitiesRef.current.requestFullscreen();
      } else if (activitiesRef.current.mozRequestFullScreen) { /* Firefox */
        activitiesRef.current.mozRequestFullScreen();
      } else if (activitiesRef.current.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        activitiesRef.current.webkitRequestFullscreen();
      } else if (activitiesRef.current.msRequestFullscreen) { /* IE/Edge */
        activitiesRef.current.msRequestFullscreen();
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
    <div ref={activitiesRef} className="p-4 rounded-2xl bg-white bg-opacity-60 overflow-y-auto w-full h-full z-20 custom-scrollbar">
      <div className="flex justify-end items-center w-[95%] absolute">
        <button onClick={toggleFullscreen} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-all duration-300">
          {isFullscreen ? <FiMinimize className="w-6 h-6" /> : <FiMaximize className="w-6 h-6" />}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 space-y-4">
          <div className="border-2 border-gray-400 rounded-xl p-4 bg-white shadow-lg">
            <label className="block text-2xl pb-2 font-Beba text-gray-700">Gehen</label>
            <textarea
              name="walking"
              value={activities.walking}
              onChange={handleChange}
              className="mt-1 block w-full h-32 p-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>
          <div className="border-2 border-gray-400 rounded-xl p-4 bg-white shadow-lg">
            <label className="block text-2xl pb-2 font-Beba text-gray-700">Essen</label>
            <textarea
              name="eating"
              value={activities.eating}
              onChange={handleChange}
              className="mt-1 block w-full h-32 p-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>
          <div className="border-2 border-gray-400 rounded-xl p-4 bg-white shadow-lg">
            <label className="block text-2xl pb-2 font-Beba text-gray-700">Schlafen</label>
            <textarea
              name="sleeping"
              value={activities.sleeping}
              onChange={handleChange}
              className="mt-1 block w-full h-32 p-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>
        </div>
        <div className="col-span-1 space-y-4">
          <div className="border-2 border-gray-400 rounded-xl p-4 bg-white shadow-lg">
            <label className="block text-2xl pb-2 font-Beba text-gray-700">Sport treiben</label>
            <textarea
              name="exercising"
              value={activities.exercising}
              onChange={handleChange}
              className="mt-1 block w-full h-32 p-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>
          <div className="border-2 border-gray-400 rounded-xl p-4 bg-white shadow-lg">
            <label className="block text-2xl pb-2 font-Beba text-gray-700">Sozialisation</label>
            <textarea
              name="socializing"
              value={activities.socializing}
              onChange={handleChange}
              className="mt-1 block w-full h-32 p-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AktivitätenProtokoll;
