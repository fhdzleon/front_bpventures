"use client";

import React, { useState } from "react";
import Cookies from "js-cookie";
import { useAuth } from "@/context/AuthContext";
import GoogleDrivePicker from "./GoogleDrivePicker";
import Swal from "sweetalert2";

interface UploadDeliverableProps {
  currentFolder: string | null;
  parentId: any;
}

const UploadDeliverable: React.FC<UploadDeliverableProps> = ({
  currentFolder,
  parentId,
}) => {
  const token = Cookies.get("token");
  const { fetchAgain, setFetchAgain, deliverableData } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [categoryOption, setCategoryOption] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    link: "",
  });

  /* console.log(deliverableData); */

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Maneja el cambio de selección
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  // Maneja el cambio de los campos del formulario
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategory = event.target.value;
    setCategoryOption(selectedCategory);
    setFormData((prevFormData) => ({
      ...prevFormData,
      category: selectedCategory,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isDeliverableDataAvailable =
      Array.isArray(deliverableData) && deliverableData.length > 0;

    const verifyName =
      isDeliverableDataAvailable &&
      deliverableData?.some(
        (deliverable: any) =>
          deliverable.deliverableName.toLowerCase() ===
          formData.name.toLowerCase()
      );
    if (verifyName) {
      Swal.fire({
        icon: "warning",
        title: "Nombre del archivo en uso",
        text: " El nombre del archivo ya existe, elige otro",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#2b4168",
      });
      return;
    }

    let body;
    let headers: HeadersInit = {
      Authorization: `Bearer ${token}`,
    };

    if (selectedOption > "2" && file) {
      const formDataFetch = new FormData();
      formDataFetch.append("name", formData.name);
      formDataFetch.append("deliverableTypeId", selectedOption);
      formDataFetch.append("deliverableCategoryId", categoryOption);
      formDataFetch.append(
        "isFolder",
        selectedOption === "1" ? "true" : "false"
      );

      if (currentFolder !== null && currentFolder !== undefined) {
        formDataFetch.append("parentId", parentId);
      }

      formDataFetch.append("file", file);

      body = formDataFetch;
    } else {
      // Manejo de JSON cuando selectedOption es 2 o menos
      const jsonData = {
        name: formData.name,
        deliverableTypeId: selectedOption,
        deliverableCategoryId: categoryOption,
        parentId:
          currentFolder !== null && currentFolder !== undefined
            ? parentId
            : null,
        path:
          formData.link !== null && selectedOption === "2"
            ? formData.link
            : null,
      };

      body = JSON.stringify(jsonData);
      headers["Content-Type"] = "application/json";
    }
    try {
      const url =
        Number(selectedOption) > 2
          ? `${process.env.NEXT_PUBLIC_API_URL}/deliverables/file`
          : Number(selectedOption) === 2
          ? `${process.env.NEXT_PUBLIC_API_URL}/deliverables/link`
          : `${process.env.NEXT_PUBLIC_API_URL}/deliverables/folder`;

      const response = await fetch(url, {
        method: "POST",
        headers,
        body,
      });

      /* console.log(formDataFetch); */

      if (response.ok) {
        const result = await response.json();
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Archivo agregado con éxito",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#2b4168",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al subir el archivo",
          text: "",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#2b4168",
        });
      }
    } catch (error) {
      console.error("Error", error);
    } finally {
      setFetchAgain(!fetchAgain);
      setFormData({ name: "", description: "", category: "", link: "" });
      setCategoryOption("");
      setIsModalOpen(false);
    }
  };

  return (
    <div className="flex justify-start">
      <button
        className="flex items-center h-12 justify-center   bg-secundary hover:text-secundary hover:bg-acent text-white font-sans px-4  rounded-xl"
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
            <form
              className="flex flex-col w-3/4 space-y-3"
              onSubmit={handleSubmit}
            >
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

                <option className="font-sans" value="1">
                  Nueva carpeta
                </option>

                <option className="font-sans" value="3">
                  Nuevo archivo
                </option>

                <option className="font-sans" value="2">
                  Nuevo link
                </option>
              </select>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="border border-1 font-sans py-2"
                placeholder="Nombre"
                required
              />
              {/* INPUT DESCRIPTION NO NECESARIO EN ESTA VERSION */}
              {/*     <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="border border-1 font-sans py-2"
                placeholder="Descripción"
                required
              /> */}

              <h3 className="font-sans text-lg text-secundary">
                Elije la categoría:
              </h3>
              <select
                className="px-11 font-sans w-auto py-2"
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                required
              >
                <option value="" disabled hidden>
                  Selecciona una categoría
                </option>
                <option className="font-sans" value="1">
                  Archivo Final
                </option>
                <option className="font-sans" value="2">
                  Archivo Parcial
                </option>
                <option className="font-sans" value="3">
                  Borrador
                </option>
              </select>

              {/* Vista condicional según la selección */}
              {Number(selectedOption) > 2 && (
                <div className=" space-y-5 mt-4">
                  <h3 className="font-sans text-lg text-secundary">
                    Subir Archivo:
                  </h3>
                  {/*  <GoogleDrivePicker /> */}
                  <p className="font-sans mb-2">
                    Selecciona un archivo desde tu PC.
                  </p>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="w-full mb-4 border-2 overflow-auto"
                      required
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
                <div className="mt-4">
                  <h3 className="font-sans text-lg text-secundary">
                    Agregar Link:
                  </h3>
                  <input
                    type="url"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                    placeholder="URL del Link"
                    className="border border-1 font-sans py-2 w-full"
                  />
                </div>
              )}

              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="bg-secundary font-sans text-white font-bold py-2 px-4 mr-2 rounded"
                >
                  Agregar
                </button>
                <button
                  className="bg-acent font-sans text-white font-bold py-2 px-4 rounded "
                  onClick={toggleModal}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadDeliverable;
