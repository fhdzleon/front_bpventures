"use client";

import React, { useState } from "react";
import Cookies from "js-cookie";
import { useAuth } from "@/context/AuthContext";
import GoogleDrivePicker from "./GoogleDrivePicker";

const UploadDeliverable = () => {
  const token = Cookies.get("token");
  const { fetchAgain, setFetchAgain } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [categoryOption, setCategoryOption] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
  });

  const validateFileExtension = (file: File): boolean => {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const validExtensions: { [key: string]: string[] } = {
      "3": ["pdf"],
      "4": ["doc", "docx"],
      "5": ["xls", "xlsx"],
      "6": ["jpg", "jpeg"],
      "7": ["png"],
    };

    if (selectedOption && validExtensions[selectedOption]) {
      if (!validExtensions[selectedOption].includes(fileExtension || "")) {
        alert(
          `Extensión inválida. Por favor, selecciona un archivo ${validExtensions[
            selectedOption
          ].join(", ")}. o cambia el tipo de archivo`
        );
        return false;
      }
    }
    return true;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      if (validateFileExtension(selectedFile)) {
        setFile(selectedFile);
      } else {
        event.target.value = "";
      }
    }
  };

  const formDataFetch = new FormData();
  formDataFetch.append("name", formData.name);
  formDataFetch.append("deliverableTypeId", selectedOption);
  formDataFetch.append("deliverableCategoryId", categoryOption);
  formDataFetch.append("isFolder", selectedOption === "1" ? "true" : "false");
  if (file) {
    formDataFetch.append("file", file);
  }

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

  const handleCategoryChange = (event: any) => {
    setFormData({
      ...formData,
      category: event.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const url =
        Number(selectedOption) > 2
          ? `${process.env.NEXT_PUBLIC_API_URL}/deliverables/file`
          : Number(selectedOption) === 2
          ? `${process.env.NEXT_PUBLIC_API_URL}/deliverables/link`
          : `${process.env.NEXT_PUBLIC_API_URL}/deliverables/folder`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataFetch,
      });

      if (response.ok) {
        const result = await response.json();
        alert("Archivo agregado con éxito");
      } else {
        alert("Error al subir el archivo");
      }
    } catch (error) {
      console.error("Error", error);
    } finally {
      setFetchAgain(!fetchAgain);
      setFormData({ name: "", description: "", category: "" });
      setIsModalOpen(false);
    }
  };

  return (
    <div className="mt-5 flex justify-start">
      <button
        className="flex items-center justify-center mb-3 bg-secundary hover:text-secundary hover:bg-acent text-white font-sans px-4 py-2 rounded-full"
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

                <option disabled className="font-bold">
                  Nueva Carpeta
                </option>
                <option className="font-sans" value="1">
                  Carpeta
                </option>

                <option disabled className="font-bold">
                  Nuevo Archivo
                </option>
                <option className="font-sans" value="3">
                  pdf
                </option>
                <option className="font-sans" value="4">
                  doc
                </option>
                <option className="font-sans" value="5">
                  xls
                </option>
                <option className="font-sans" value="6">
                  jpg
                </option>
                <option className="font-sans" value="7">
                  png
                </option>

                <option disabled className="font-bold">
                  Nuevo Link
                </option>
                <option className="font-sans" value="2">
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
                onChange={handleCategoryChange}
              >
                <option value="" disabled hidden>
                  Selecciona una categoría
                </option>
                <option className="font-sans" value="1">
                  Pendientes
                </option>
                <option className="font-sans" value="2">
                  Terminados
                </option>
                <option className="font-sans" value="3">
                  Revisión
                </option>
              </select>
            </form>

            {/* Vista condicional según la selección */}
            {Number(selectedOption) > 2 && (
              <div className="w-3/4 space-y-5 mt-4">
                <h3 className="font-sans text-lg text-secundary">
                  Subir Archivo:
                </h3>
                <GoogleDrivePicker />
                <p className="font-sans mb-2">
                  O selecciona un archivo desde tu PC.
                </p>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full mb-4 border-2 overflow-auto"
                  />
                </div>
              </div>
            )}

            {selectedOption === "folder" && (
              <div className="w-3/4 mt-4">
                <p className="font-sans mb-2">
                  Se creará una carpeta con el nombre proporcionado.
                </p>
              </div>
            )}

            {selectedOption === "2" && (
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

              <button
                onClick={handleSubmit}
                className="bg-secundary font-sans text-white font-bold py-2 px-4 rounded"
              >
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
