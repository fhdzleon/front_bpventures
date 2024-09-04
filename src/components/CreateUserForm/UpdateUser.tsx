// "use client";

// import { GetUserById, UpdateUser } from "@/helpers/auth.helper";
// import React, { useEffect, useState } from "react";
// import "../../styles/form-style.css";
// import Button from "../FormComponent/Button";
// import { Toaster, toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { PATHROUTES } from "@/helpers/pathRoutes";
// import { useParams } from "next/navigation";

// interface User {
//   email: string;
//   password: string;
//   Names: string;
//   LastName: string;
//   Position: string;
//   Empresa:string;
//   Cuit: number,
//   Domicilio:string,
// }

// interface Props {
//   id: number;
// }

// const UpdateUserComponent: React.FC<Props> = (props) => {
//   const { id } = props;
//   const userId = id;
//   const params = useParams();

//   const myAccount = Object.keys(params).length === 0;

//   const [userData, setUserData] = useState<User>({
//     email: "",
//     password: "",
//     Names: "",
//     LastName: "",
//     Position: "",
//     Empresa:"",
//     Cuit:0,
//     Domicilio:"",
//   });

//   const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await GetUserById(userId.toString());
//         setUserData(res);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUser();
//   }, [userId]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setUserData((prevUser) => ({ ...prevUser, [name]: value }));
//   };

//   const handlePasswordVisibilityToggle = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const res = await UpdateUser(userData, userId.toString());
//       router.push(`${PATHROUTES.LIST}/${res.id}`);

//       toast.success("Usuario actualizado exitosamente!");
//     } catch (error: any) {
//       console.error("Error al actualizar el usuario:", error);
//       toast.error(error.message);
//     }
//   };

//   const fieldLabels: { [key: string]: string } = {
//     email: "Correo electrónico",
//     password: "Contraseña",
//     Names: "Nombres",
//     LastName: "Apellidos",
//     Position: "Puesto",
//     Empresa: "Empresa",
//     Cuit: "CUIT",
//     Domicilio:"Domicilio"
//   };

//   return (
//     <div className="flex w-full justify-center">
//       <Toaster richColors />
//       <div className="md:grid md:grid-cols-2 p-5 bg-white shadow-lg rounded-lg">
//         {myAccount ? (
//           <div className="col-span-1 font-futura">
//             {" "}
//             <h2 className="text-start mt-10 text-2xl text-[#2B4168]">
//               Editar mi Cuenta
//             </h2>
//             <p className="text-black/50">
//               Si deseas editar los datos de tu cuenta, puedes llenar los
//               siguientes campos:
//             </p>
//           </div>
//         ) : (
//           <div className="col-span-1 font-futura">
//             {" "}
//             <h2 className="text-start mt-10 text-2xl text-[#2B4168]">
//               Actualizar la Información del Usuario
//             </h2>
//             <p className="text-black/50">
//               Si deseas editar los datos de este usuario, llena los siguientes
//               campos:
//             </p>
//           </div>
//         )}

//         <div className="col-span-1">
//           <form className="form-apply" onSubmit={handleSubmit}>
//             {["email", "password", "Names", "LastName", "Position", "Empresa", "Cuit", "Domicilio"].map(
//               (field, index) => (
//                 <React.Fragment key={index}>
//                   <label htmlFor={field} className="label-apply">
//                     {fieldLabels[field]}
//                   </label>
//                   <div className="relative">
//                     <input
//                       className="relative font-futura border-[0.5px] border-gray-300 appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-transparent"
//                       type={
//                         field === "password" && !passwordVisible
//                           ? "password"
//                           : "text"
//                       }
//                       name={field}
//                       value={userData[field as keyof User]}
//                       onChange={handleInputChange}
//                       placeholder={fieldLabels[field]}
//                       // required
//                     />
//                     {field === "password" && (
//                       <button
//                         type="button"
//                         onClick={handlePasswordVisibilityToggle}
//                         className="absolute inset-y-0 right-0 px-3 py-2 text-gray-500"
//                       >
//                         {passwordVisible ? "Ocultar" : "Mostrar"}
//                       </button>
//                     )}
//                   </div>
//                 </React.Fragment>
//               )
//             )}
//             <Button type="submit">Guardar Cambios</Button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateUserComponent;

'use client'
import React, { useEffect, useState } from "react";
import "../../styles/form-style.css";
import Button from "../FormComponent/Button";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { PATHROUTES } from "@/helpers/pathRoutes";
import { useParams } from "next/navigation";
import Preloader from "../preloader/Preloader";
import { GetUserById, UpdateUser } from "@/helpers/auth.helper";
import { useAuth } from "@/context/AuthContext";
interface User {
  email: string;
  password: string;
  Names: string;
  LastName: string;
  Position: string;
  Empresa: string;
  Cuit: number;
  Domicilio: string;
}

interface Props {
  id: number;
}

const UpdateUserComponent: React.FC<Props> = (props) => {
  const { id } = props;
  const userId = id;
  const params = useParams();

  const myAccount = Object.keys(params).length === 0;

  const [userDataForm, setUserDataForm] = useState<User>({
    email: "",
    password: "",
    Names: "",
    LastName: "",
    Position: "",
    Empresa: "",
    Cuit: 0,
    Domicilio: "",
  });

  const {loading, userData, setUserData} = useAuth();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {


    if(userData){
      const {email, Names, LastName, Position} = userData;
      const data ={
        ...userDataForm,
        email, Names, LastName, Position
      }
      setUserDataForm(data);
      
    }
  
  }, [userData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDataForm((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handlePasswordVisibilityToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await UpdateUser(userDataForm, userId.toString());
      setUserData(res);
      
      router.push(`${PATHROUTES.LIST}/${res.id}`);
      toast.success("Usuario actualizado exitosamente!");
      
    } catch (error: any) {
      console.error("Error al actualizar el usuario:", error);
      toast.error(error.message);
    }
  };

  const fieldLabels: { [key: string]: string } = {
    email: "Correo electrónico",
    password: "Contraseña",
    Names: "Nombres",
    LastName: "Apellidos",
    Position: "Puesto",
    Empresa: "Empresa",
    Cuit: "CUIT",
    Domicilio: "Domicilio",
  };

  return (
    <div className="flex w-full justify-center">
      <Toaster richColors />
      <div className="md:grid md:grid-cols-2 p-5 bg-white shadow-lg rounded-lg">
        {myAccount ? (
          <div className="col-span-1 font-futura">
            <h2 className="text-start mt-10 text-2xl text-[#2B4168]">
              Editar mi Cuenta
            </h2>
            <p className="text-black/50">
              Si deseas editar los datos de tu cuenta, puedes llenar los
              siguientes campos:
            </p>
          </div>
        ) : (
          <div className="col-span-1 font-futura">
            <h2 className="text-start mt-10 text-2xl text-[#2B4168]">
              Actualizar la Información del Usuario
            </h2>
            <p className="text-black/50">
              Si deseas editar los datos de este usuario, llena los siguientes
              campos:
            </p>
          </div>
        )}

        <div className="col-span-1">
            <form className="form-apply" onSubmit={handleSubmit}>
              {[
                "email",
                "password",
                "Names",
                "LastName",
                "Position",
                "Empresa",
                "Cuit",
                "Domicilio",
              ].map((field, index) => (
                <React.Fragment key={index}>
                  <label htmlFor={field} className="label-apply">
                    {fieldLabels[field]}
                  </label>
                  <div className="relative">
                    <input
                      className="relative font-futura border-[0.5px] border-gray-300 appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-transparent"
                      type={
                        field === "password" && !passwordVisible
                          ? "password"
                          : "text"
                      }
                      name={field}
                      value={userDataForm[field as keyof User]}
                      onChange={handleInputChange}
                      placeholder={fieldLabels[field]}
                      // required
                    />
                    {field === "password" && (
                      <button
                        type="button"
                        onClick={handlePasswordVisibilityToggle}
                        className="absolute inset-y-0 right-0 px-3 py-2 text-gray-500"
                      >
                        {passwordVisible ? "Ocultar" : "Mostrar"}
                      </button>
                    )}
                  </div>
                </React.Fragment>
              ))}
              <Button type="submit">Guardar Cambios</Button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserComponent;

