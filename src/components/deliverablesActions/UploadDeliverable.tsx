"use client";

import React, { useState } from "react";

const UploadDeliverable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(""); // Estado para la opción seleccionada
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
  });

  const [folders, setFolders] = useState([]); // Estado para almacenar las carpetas creadas

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Maneja el cambio de selección
  const handleSelectChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedOption(event.target.value);
  };

  // Maneja el cambio de los campos del formulario
  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
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
        <span>Agregar</span>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white flex flex-col justify-center items-center space-y-5 rounded-lg p-8 shadow-lg w-full max-w-lg mx-4 sm:mx-auto">
            {/* Formulario Inicial */}
            <form className="flex flex-col w-3/4 space-y-3">
              <label className="font-sans text-lg text-secundary">
                ¿Qué deseas agregar?
              </label>
              <select
                className="px-11 font-sans w-auto py-2"
                id="combo"
                name="combo"
                value={selectedOption}
                onChange={handleSelectChange}
              >
                <option value="" disabled hidden>
                  Selecciona una opción
                </option>
                <option className="font-sans" value="folder">
                  Carpeta
                </option>
                <option className="font-sans" value="file">
                  Archivo
                </option>
                <option className="font-sans" value="link">
                  Link
                </option>
              </select>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="border border-1 font-sans py-2"
                placeholder="Nombre"
              />

              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="border border-1 font-sans py-2"
                placeholder="Descripción"
              />

              <h3 className="font-sans text-lg text-secundary">
                Elije la categoría:
              </h3>
              <select
                className="px-11 font-sans w-auto py-2"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="" disabled hidden>
                  Selecciona una categoría
                </option>
                <option className="font-sans" value="pending">
                  Pendientes
                </option>
                <option className="font-sans" value="done">
                  Terminados
                </option>
                <option className="font-sans" value="review">
                  Revisión
                </option>
              </select>
            </form>

            {/* Vista condicional según la selección */}
            {selectedOption === "file" && (
              <div className="w-3/4 space-y-5 mt-4">
                <h3 className="font-sans text-lg text-secundary">
                  Subir Archivo:
                </h3>
                <button className="font-sans bg-google p-2 rounded text-white mb-2">
                  Subir con Google Drive
                </button>
                <p className="font-sans mb-2">
                  O selecciona un archivo desde tu PC.
                </p>
                <input type="file" className="mb-4 border-2" />
              </div>
            )}

            {selectedOption === "folder" && (
              <div className="w-3/4 mt-4">
                <p className="font-sans mb-2">
                  Se creará una carpeta con el nombre proporcionado.
                </p>
              </div>
            )}

            {selectedOption === "link" && (
              <div className="w-3/4 mt-4">
                <h3 className="font-sans text-lg text-secundary">
                  Agregar Link:
                </h3>
                <input
                  type="url"
                  name="link"
                  placeholder="URL del Link"
                  className="border border-1 font-sans py-2 w-full"
                />
              </div>
            )}

            <div className="flex justify-center w-3/4 mt-4">
              <button
                className="bg-acent font-sans text-white font-bold py-2 px-4 rounded mr-2"
                onClick={toggleModal}
              >
                Cancelar
              </button>
              <button className="bg-secundary font-sans text-white font-bold py-2 px-4 rounded">
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadDeliverable;
