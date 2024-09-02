import React, { useState } from "react";
import EditDeliverableProps from "@/interfaces/editDeliverablesProps";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { PATHROUTES } from "@/helpers/pathRoutes";

const EditDeliverable: React.FC<EditDeliverableProps> = ({
  id,
  name,
  description,
  category,
}) => {
  const router = useRouter();
  const token = Cookies.get("token");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name,
    description,
    category,
  });

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Estas a punto de actualizar este archivo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2b4168",
      cancelButtonColor: "#5eba98",
      confirmButtonText: "Si, actualizalo",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/deliverables/${id}`,
            {
              method: "PATCH",
              headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("No se logro actualizar el archivo");
          }

          const data = await response.json();

          Swal.fire({
            title: "Eliminado",
            text: "El archivo a sido actualizado",
            icon: "success",
            confirmButtonColor: "#2b4168",
          }).finally(() => router.push(PATHROUTES.DELIVERABLES));
        } catch (error) {
          console.error("hubo un problema con la peticion, error");
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
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931ZM16.862 4.487L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
      </svg>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-lg mx-4 sm:mx-auto space-y-5">
            <form className="flex flex-col  space-y-3">
              <h3 className="text-secundary text-xl mb-2 text-center font-sans  text-secondary">
                Edita los campos que Necesites
              </h3>

              <label className="font-sans" htmlFor="name">
                Nombre del Archivo:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="border py-2 font-sans text-slate-400"
                placeholder="Nombre"
              />

              <label className="font-sans" htmlFor="description">
                Descripción:
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="border py-2 font-sans text-slate-400"
                placeholder="Descripción"
              />

              <h3 className="font-sans text-lg text-secondary">
                Elije la categoría:
              </h3>
              <select
                className="px-11 font-sans py-2"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="" disabled hidden>
                  Selecciona una categoría
                </option>
                <option value="pending">Pendientes</option>
                <option value="done">Terminados</option>
                <option value="review">Revisión</option>
              </select>
            </form>
            <div className="flex justify-center mt-4">
              <button
                className="bg-acent font-sans text-white font-bold py-2 px-4 rounded mr-2"
                onClick={toggleModal}
              >
                Cancelar
              </button>

              <button
                onClick={handleClick}
                className="bg-secundary font-sans text-white font-bold py-2 px-4 rounded"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditDeliverable;
