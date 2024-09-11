import React, { useState } from "react";
import EditDeliverableProps from "@/interfaces/editDeliverablesProps";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";

const EditDeliverable: React.FC<EditDeliverableProps> = ({
  id,
  type,
  name,
  path,
  description,
  category,
}) => {
  const { fetchAgain, setFetchAgain } = useAuth();
  const token = Cookies.get("token");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name,
    path, // This will be used for the file if the type is 'File'
    description,
    category,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // State for the new file

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Handle input change for name, description, and category
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Function to submit the changes
  const handleClick = async () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Estás a punto de actualizar este archivo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2b4168",
      cancelButtonColor: "#5eba98",
      confirmButtonText: "Sí, actualízalo",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let response;

          if (type === "Link") {
            // JSON payload for a link
            const jsonData = {
              name: formData.name,
              category: formData.category,
              description: formData.description,
              path: formData.path,
            };

            response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/deliverables/link/${id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(jsonData),
              }
            );
          } else if (type === "File") {
            // Handle file update with FormData
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("category", formData.category);
            formDataToSend.append("description", formData.description);

            // If a new file was selected, append it to the form data
            if (selectedFile) {
              formDataToSend.append("file", selectedFile);
            }

            response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/deliverables/file/${id}`,
              {
                method: "PUT",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                body: formDataToSend,
              }
            );
          }

          if (!response.ok) {
            throw new Error("No se logró actualizar el archivo");
          }

          const data = await response.json();

          Swal.fire({
            title: "Actualizado",
            text: "El archivo ha sido actualizado",
            icon: "success",
            confirmButtonColor: "#2b4168",
          }).finally(() => {
            setFetchAgain(!fetchAgain);
            setIsModalOpen(false);
          });
        } catch (error) {
          console.error("Hubo un problema con la petición", error);
          Swal.fire(
            "Error",
            "Hubo un problema al actualizar el archivo",
            "error"
          );
        }
      }
    });
  };

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6 mx-auto hover:text-accent hover:text-acent cursor-pointer"
        onClick={toggleModal}
      >
        <title>Editar</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.651 2.65l-1.687 1.688M4.5 19.5v-3.75a2.25 2.25 0 0 1 .659-1.591L16.876 2.44a1.875 1.875 0 0 1 2.65 2.65L7.81 16.659a2.25 2.25 0 0 1-1.591.659H2.25v-3.75z"
        />
      </svg>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Editar archivo</h2>

            <div className="space-y-4">
              {/* Input for name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {/* Select for category */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Categoría
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="1">Archivo Final</option>
                  <option value="2">Archivo Parcial</option>
                  <option value="3">Borrador</option>
                </select>
              </div>

              {/* File input for new file */}
              {type === "File" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Subir nuevo archivo (opcional)
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none"
                  />
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={toggleModal}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleClick}
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditDeliverable;
