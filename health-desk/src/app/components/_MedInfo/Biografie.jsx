import React from 'react';

const Biografie = ({ biography }) => {
  return (
    <div className='flex z-20 w-full h-full rounded-lg bg-custom-light-gray bg-opacity-60 text-black '>
      <textarea 
        className='w-full h-full bg-white bg-opacity-15 rounded-lg p-4' 
        placeholder='Biografie....' 
        value={biography}
        readOnly
      />
    </div>
  );
};

export default Biografie;
