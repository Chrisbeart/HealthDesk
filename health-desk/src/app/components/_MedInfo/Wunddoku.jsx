import React, { useState, useRef } from 'react';
import { FiMaximize, FiMinimize } from 'react-icons/fi';
import BodyDiagram from "../../assets/BodyDiagram.png"
import Feet1 from "../../assets/feet1.png";
import Feet2 from "../../assets/Feet2.png";
import Hand1 from "../../assets/hand1.png";
import Hand2 from "../../assets/hand2.png";
import SpinningBody from './SpinningBody';

const Wunddoku = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [show3DBody, setShow3DBody] = useState(false);
  const wunddokuRef = useRef(null);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (wunddokuRef.current.requestFullscreen) {
        wunddokuRef.current.requestFullscreen();
      } else if (wunddokuRef.current.mozRequestFullScreen) { /* Firefox */
        wunddokuRef.current.mozRequestFullScreen();
      } else if (wunddokuRef.current.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        wunddokuRef.current.webkitRequestFullscreen();
      } else if (wunddokuRef.current.msRequestFullscreen) { /* IE/Edge */
        wunddokuRef.current.msRequestFullscreen();
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

  const toggle3DBody = () => {
    setShow3DBody(!show3DBody);
  };

  return (
    <div ref={wunddokuRef} className="p-4 rounded-2xl bg-white bg-opacity-60 overflow-y-auto w-full h-full z-20 custom-scrollbar">
      <div className="flex justify-end items-center w-[95%] absolute  ">
        <button onClick={toggleFullscreen} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-all duration-300">
          {isFullscreen ? <FiMinimize className="w-6 h-6" /> : <FiMaximize className="w-6 h-6" />}
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <div>
            <label className="block text-2xl pb-2 font-thin text-gray-700">Anamnese</label>
            <textarea className="mt-1 block w-full h-52 p-2 border border-gray-300 rounded-md"></textarea>
          </div>
          <div>
            <label className="block text-2xl pb-2 font-thin text-gray-700">Wundbeschreibung</label>
            <textarea className="mt-1 block w-full h-52 p-2 border border-gray-300 rounded-md"></textarea>
          </div>
          <div>
            <label className="block text-2xl pb-2 font-thin text-gray-700">Wundbehandlung</label>
            <textarea className="mt-1 block w-full h-52 p-2 border border-gray-300 rounded-md"></textarea>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center col-span-1 space-y-4">
          <div>
            <label className="block text-2xl pb-2 font-thin text-gray-700">Neurological Findings</label>
            <div onClick={toggle3DBody} className="cursor-pointer flex justify-center items-center p-2 border border-gray-300 rounded-md">
              <img src={BodyDiagram} alt="Neurological Findings" className="max-w-full h-auto"/>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 ">
            <img src={Hand1} alt="Hand Diagram" className="col-span-1 border border-gray-300 rounded-md"/>
            <img src={Hand2} alt="Hand Diagram" className="col-span-1 border border-gray-300 rounded-md"/>
            <img src={Feet1} alt="Foot Diagram" className="col-span-1 border border-gray-300 rounded-md"/>
            <img src={Feet2} alt="Foot Diagram" className="col-span-1 border border-gray-300 rounded-md"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Add Images</label>
            <div className="flex flex-wrap p-2 border border-gray-300 rounded-md">
              {/* Add a map function to loop through and display images */}
              {[...Array(8)].map((_, index) => (
                <div key={index} className="w-16 h-16 border border-gray-300 rounded-md m-1"></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {show3DBody && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30">
          <div className="relative w-3/4 h-3/4 bg-white p-4 rounded-lg">
            <button onClick={toggle3DBody} className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full">
              Close
            </button>
            <SpinningBody />
          </div>
        </div>
      )}
    </div>
  );
};

export default Wunddoku;

