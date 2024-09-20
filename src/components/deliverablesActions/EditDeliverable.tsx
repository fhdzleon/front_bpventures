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
    path,
    description,
    category,
  });
  const [file, setFile] = useState<File | null>(null);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
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
          let response;

          if (type === "Link") {
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
      
          } else {
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("category", formData.category);
            formDataToSend.append("description", formData.description);

            if (file) {
              formDataToSend.append("file", file);
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
            throw new Error("No se logro actualizar el archivo");
          }
          console.log(response);
          
          // const data = await response.json();
          // console.log(data);
          
          
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
          console.error("hubo un problema con la peticion, error", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al actualizar el archivo.",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#2b4168",
          });
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
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931ZM16.862 4.487L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
      </svg>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-lg mx-4 sm:mx-auto space-y-7">
            <form className="flex flex-col  space-y-3">
              {type === "Link" ? (
                <h3 className="text-secundary text-xl mb-2 text-center font-sans  text-secondary">
                  Edición de Link
                </h3>
              ) : (
                <h3 className="text-secundary text-xl mb-2 text-center font-sans  text-secondary">
                  Edición de Archivo
                </h3>
              )}

              <label className="font-sans" htmlFor="name">
                Nombre:
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="border py-2 font-sans text-slate-400"
                placeholder="Nombre"
              />

              {type === "Link" && (
                <>
                  <label className="font-sans" htmlFor="name">
                    URL:
                  </label>
                  <input
                    type="text"
                    name="path"
                    value={formData.path}
                    onChange={handleInputChange}
                    className="border py-2 font-sans text-slate-400"
                    placeholder="URL"
                  />
                </>
              )}

              {type !== "Link" && (
                <div className=" space-y-4">
                  <label className="font-sans  " htmlFor="">
                    Actualizar archivo desde tu PC (opcional) :
                  </label>
                  <input
                    type="file"
                    className="font-sans w-full overflow-auto border-2"
                    onChange={handleFileChange}
                  />
                </div>
              )}
            </form>
            <div className="flex justify-center mt-4">
              <button
                onClick={handleClick}
                className="bg-secundary font-sans text-white font-bold py-2 px-4 mr-2 rounded"
              >
                Actualizar
              </button>
              <button
                className="bg-acent font-sans text-white font-bold py-2 px-4 rounded "
                onClick={toggleModal}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditDeliverable;
