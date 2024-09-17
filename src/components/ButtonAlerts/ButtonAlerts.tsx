'use client';
import { useEffect, useState } from "react";
import { usersData } from "@/helpers/UsersData";
import { useAuth } from "@/context/AuthContext";
import { io } from "socket.io-client";

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {userData}= useAuth()
  const[notification, setnotification] = useState();

  const userId = userData?.isAdmin? 'Admin': userData?.id
  // const [showAll, setShowAll] = useState(false); // Nuevo estado para controlar si se muestran todas las notificaciones
  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`, {
      query: { userId: userId }, // Pasa el userId cuando te conectas
    });

    socket.on('newNotification', (data) => {
      console.log('Nueva notificación:', data);
      setnotification(data)
    });

    return () => {
      socket.disconnect(); // Limpia la conexión cuando el componente se desmonta
    };
  }, [userId]);
  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  // const handleShowAll = () => {
  //   setShowAll(true);
  // };

  // Mostrar solo las 5 primeras notificaciones si showAll es falso
  // const notificationsToShow = showAll ? usersData : usersData.slice(0, 5);

  return (
    <div className="relative">
      <button
        onClick={toggleNotifications}
        className="bg-acent flex text-white p-2 rounded-full focus:outline-none hover:bg-acent transition"
      >
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
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
          />
        </svg>
        Notificaciones
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 bg-white w-80 border border-gray-200 rounded-lg shadow-lg transition-transform duration-300 ease-in-out">
          {/* Header con botón de cerrar */}
          <div className="flex justify-between items-center bg-slate-300 px-4 py-2 rounded-t-lg">
            <span className="text-secundary font-semibold">Notificaciones</span>
            <button
              onClick={toggleNotifications}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 text-secundary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
                />
              </svg>
            </button>
          </div>

          <ul className="p-4 space-y-4 h-56 overflow-auto">
            {usersData.map((notification, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
</svg>

                </div>
                <div>
                  <p className="text-secundary font-semibold">
                    {notification?.notificationType?.name || "Sin tipo de notificación"} - {notification?.invoice?.number || "Sin número de factura"}
                  </p>
                  {/* <p className="text-gray-600 text-sm">
                    Nota: {notification?.note || "Sin nota"}
                  </p> */}
                  {/* <p className="text-gray-600 text-sm">
                    Impactado: {notification?.impactedUser?.Names || "Desconocido"} {notification?.impactedUser?.LastName || ""}
                  </p> */}
                  <p className="text-gray-600 text-sm">
                    Activado por: <strong>{notification?.triggerUser?.Names || "Desconocido"} {notification?.triggerUser?.LastName || ""}</strong>
                  </p>
                  <p className="text-gray-600 text-sm">
                    {new Date(notification?.createdAt).toLocaleString() || "Fecha desconocida"}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* Botón para ver todas las notificaciones si hay más de 5 */}
        
            {/* <div className="p-4 text-center">
              <button
               
                className="text-white hover:underline bg-acent rounded-md p-2"
              >
                Ver todas las notificaciones
              </button>
            </div> */}
         
        </div>
      )}
    </div>
  );
};

export default Notifications;


function setShowAll(arg0: boolean) {
  throw new Error("Function not implemented.");
}
// import React, { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';

// const socket = io('http://localhost:83'); // Conéctate al servidor WebSocket en el puerto 83

// const PermissionsComponent = () => {
//   const [permissions, setPermissions] = useState([]);

//   useEffect(() => {
//     // Escucha el evento de 'permissionsUpdate'
//     socket.on('permissionsUpdate', (data) => {
//       console.log('Received permissions update:', data);
//       // Actualiza el estado con los permisos recibidos
//       setPermissions(data.permissions);
//     });

//     // Cleanup para desconectar el socket cuando el componente se desmonta
//     return () => {
//       socket.off('permissionsUpdate');
//     };
//   }, []);

//   return (
//     <div>
//       <h3>Permissions</h3>
//       <ul>
//         {permissions.map((permission, index) => (
//           <li key={index}>
//             User: {permission.userId}, Permission Type: {permission.permissionType.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default PermissionsComponent;