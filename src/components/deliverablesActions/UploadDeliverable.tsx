"use client";

import React, { useState } from "react";

const UploadDeliverable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="mt-5 flex justify-start">
      {/* Botón que abre el modal */}
      <button
        className="flex items-center justify-center bg-secundary hover:text-secundary hover:bg-acent text-white font-sans px-4 py-2 rounded-full"
        onClick={toggleModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
        <span>Subir Archivo</span>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white flex flex-col justify-center items-center space-y-5 rounded-lg p-8 shadow-lg w-full max-w-lg mx-4 sm:mx-auto">
            <h2 className=" font-futura text-4xl ">Subir Archivo</h2>
            <button className="font-sans bg-google p-2 rounded text-white">
              Subir Con Google Drive
            </button>
            <p className="font-sans">O selecciona un archivo desde tu PC.</p>

            <input type="file" className="mb-4 border-2" />

            <div className="flex justify-end ">
              <button
                className="bg-acent font-sans text-white font-bold py-2 px-4 rounded mr-2"
                onClick={toggleModal}
              >
                Cancelar
              </button>
              <button className="bg-secundary  font-sans text-white font-bold py-2 px-4 rounded">
                Subir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadDeliverable;
