import React, { useState } from "react";

const iframes = {
  iframes: [
    {
      url: "https://docs.google.com/spreadsheets/d/1tn7ecE62TUf3PmmOWhEj_hS2HnzpvtYbwi1Deoxi5yw/edit?usp=drivesdk",
    },
    {
      url: "https://docs.google.com/spreadsheets/d/1Y2ydZZ6ZgBQpl-vm9gJi0kKXzGIPETpriZOaTBnY_Xc/edit?gid=0#gid=0",
    },
    // Agrega más URLs según sea necesario
  ],
};

const PreviewButton = () => {
  const [isGoogleModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* botón para abrir el modal */}
      <button onClick={handleOpenModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
          />
        </svg>
      </button>

      {/* Modal */}
      {isGoogleModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-slate-300 bg-opacity-95 p-6 rounded-lg shadow-lg max-w-6xl max-h-full ">
            <button
              onClick={handleCloseModal}
              className="bg-secundary text-white px-4 py-2 mb-5 rounded-full"
            >
              Cerrar
            </button>
            <div className="flex overflow-x-auto space-x-4">
              {iframes.iframes.map((iframe, index) => (
                <iframe
                  key={index}
                  src={iframe.url}
                  frameBorder="0"
                  className="w-full h-96 min-w-[320px] max-w-[640px] flex-shrink-0"
                  title={`iframe-${index}`}
                ></iframe>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewButton;
