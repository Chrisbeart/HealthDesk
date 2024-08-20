import React from 'react';

const Berichte = ({ reports }) => {
  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-bold mb-4">Berichte</h2>
      <div className="flex flex-col space-y-2">
        {reports.map((report, index) => (
          <div
            key={index}
            className="w-full text-left bg-custom-light-gray hover:bg-custom-dark-gray hover:text-white p-2 rounded-lg transition-all"
          >
            {report}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Berichte;
