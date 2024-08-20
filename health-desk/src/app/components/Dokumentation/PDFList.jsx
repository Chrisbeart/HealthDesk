import React, { useState } from 'react';

const PDFList = () => {
  const pdfs = ['/Test1.pdf', '/Test2.pdf'];
  const [selectedPDF, setSelectedPDF] = useState(null);

  const handleClose = () => {
    setSelectedPDF(null);
  };

  const handleOpenInNewTab = (pdf) => {
    window.open(pdf, '_blank');
  };

  const handlePrint = (pdf) => {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = pdf;
    document.body.appendChild(iframe);
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    document.body.removeChild(iframe);
  };

  return (
    <div className="p-4 w-full">
      <h2 className="text-4xl font-lato font-bold mb-4">Dokumente</h2>
      <div className="flex flex-col space-y-2 mb-6">
        {pdfs.map((pdf, index) => (
          <button
            key={index}
            onClick={() => setSelectedPDF(pdf)}
            className="w-full text-left bg-custom-light-gray hover:bg-custom-dark-gray font-light hover:text-white px-6 p-2 text-2xl rounded-lg transition-all"
          >
            {pdf.split('/').pop()}
          </button>
        ))}
      </div>
      {selectedPDF && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-lg w-full relative">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 bg-red-800  text-white px-2  rounded-full"
            >
              X
            </button>
            <h3 className="text-md font-light font-lato mb-2">Ausgewähltes Dokument: {selectedPDF.split('/').pop()}</h3>
            <iframe
              src={selectedPDF}
              className="w-full h-64 mb-4"
              title="PDF Viewer"
            ></iframe>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => handleOpenInNewTab(selectedPDF)}
                className="bg-custom-dark-gray text-white p-2 rounded-lg"
              >
                In neuem Tab öffnen
              </button>
              <button
                onClick={() => handlePrint(selectedPDF)}
                className="bg-custom-light-gray text-custom-dark-gray p-2 rounded-lg"
              >
                Drucken
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFList;
