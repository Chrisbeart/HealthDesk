import React, { useState, useRef } from 'react';
import { FiMaximize, FiMinimize } from 'react-icons/fi';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const VitalzeichenDashboard = () => {
  const initialStats = {
    temperature: 36.5,
    pulse: 72,
    bloodPressure: '120/80',
    respiration: 16,
    oxygenSaturation: 98,
    weight: 70,
  };

  const [stats, setStats] = useState(initialStats);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const dashboardRef = useRef(null);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (dashboardRef.current.requestFullscreen) {
        dashboardRef.current.requestFullscreen();
      } else if (dashboardRef.current.mozRequestFullScreen) { /* Firefox */
        dashboardRef.current.mozRequestFullScreen();
      } else if (dashboardRef.current.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        dashboardRef.current.webkitRequestFullscreen();
      } else if (dashboardRef.current.msRequestFullscreen) { /* IE/Edge */
        dashboardRef.current.msRequestFullscreen();
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
    <div ref={dashboardRef} className="p-4 rounded-2xl bg-white bg-opacity-60 overflow-y-auto w-full h-full z-20 custom-scrollbar">
      <div className="flex justify-end items-center absolute w-[95%]">
        <button onClick={toggleFullscreen} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-all duration-300">
          {isFullscreen ? <FiMinimize className="w-6 h-6" /> : <FiMaximize className="w-6 h-6" />}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 space-y-4">
          <div className="border-2 border-gray-400 rounded-xl p-4 bg-white shadow-lg">
            <h2 className="text-2xl font-Beba text-gray-700">Temperatur</h2>
            <p className="text-xl font-thin text-gray-700">{stats.temperature} °C</p>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${(stats.temperature / 40) * 100}%` }}></div>
            </div>
          </div>
          <div className="border-2 border-gray-400 rounded-xl p-4 bg-white shadow-lg">
            <h2 className="text-2xl font-Beba text-gray-700">Puls</h2>
            <p className="text-xl font-thin text-gray-700">{stats.pulse} BPM</p>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div className="bg-red-600 h-4 rounded-full" style={{ width: `${(stats.pulse / 200) * 100}%` }}></div>
            </div>
          </div>
          <div className="border-2 border-gray-400 rounded-xl p-4 bg-white shadow-lg">
            <h2 className="text-2xl font-Beba text-gray-700">Blutdruck</h2>
            <p className="text-xl font-thin text-gray-700">{stats.bloodPressure}</p>
          </div>
        </div>
        <div className="col-span-1 space-y-4">
          <div className="border-2 border-gray-400 rounded-xl p-4 bg-white shadow-lg">
            <h2 className="text-2xl font-Beba text-gray-700">Atmung</h2>
            <p className="text-xl font-thin text-gray-700">{stats.respiration} BPM</p>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div className="bg-green-600 h-4 rounded-full" style={{ width: `${(stats.respiration / 30) * 100}%` }}></div>
            </div>
          </div>
          <div className="border-2 border-gray-400 rounded-xl p-4 bg-white shadow-lg">
            <h2 className="text-2xl font-Beba text-gray-700">Sauerstoffsättigung</h2>
            <p className="text-xl font-thin text-gray-700">{stats.oxygenSaturation} %</p>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div className="bg-purple-600 h-4 rounded-full" style={{ width: `${stats.oxygenSaturation}%` }}></div>
            </div>
          </div>
          <div className="border-2 border-gray-400 rounded-xl p-4 bg-white shadow-lg">
            <h2 className="text-2xl font-Beba text-gray-700">Gewicht</h2>
            <p className="text-xl font-thin text-gray-700">{stats.weight} kg</p>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div className="bg-yellow-600 h-4 rounded-full" style={{ width: `${(stats.weight / 150) * 100}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VitalzeichenDashboard;
