'use client'
import { useState } from "react";

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
        {/* <div>conteo</div> */}
      <button
        onClick={toggleNotifications}
        className="bg-acent flex text-white p-2 rounded-full focus:outline-none hover:bg-acent transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
          />
        </svg>
        Notificaciones
      </button>

      {isOpen && (
        <div className="fixed top-16 right-0  bg-white w-80 border border-gray-200 rounded-lg shadow-lg transition-transform duration-300 ease-in-out">
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
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6 text-secundary"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
                />
              </svg>
            </button>
          </div>

          <ul className="p-4 space-y-4">
            <li className="flex items-start space-x-2">
              <div className="flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-800 font-semibold">
                  Se descargo la factura IIOOV
                </p>
                <p className="text-gray-600 font-semibold text-sm">Por el Juan Perez</p>
                <p className="text-gray-600 text-sm">Hace 10 minutos</p>
              </div>
            </li>
            <li className="flex items-start space-x-2">
              <div className="flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-800 font-semibold">
                  Tienes un nuevo mensaje
                </p>
                <p className="text-gray-600 text-sm">Hace 30 minutos</p>
              </div>
            </li>
            <li className="flex items-start space-x-2">
              <div className="flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-800 font-semibold">
                  Alerta de seguridad
                </p>
                <p className="text-gray-600 text-sm">Hace 1 hora</p>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notifications;

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