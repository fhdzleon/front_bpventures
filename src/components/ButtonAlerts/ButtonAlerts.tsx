// 'use client';
// import { useEffect, useState } from "react";
// import { usersData } from "@/helpers/UsersData";
// import { useAuth } from "@/context/AuthContext";
// import { io } from "socket.io-client";

// const Notifications = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const {userData}= useAuth()
//   const[notification, setnotification] = useState();

//   const userId = userData?.isAdmin? 'Admin': userData?.id
//   // const [showAll, setShowAll] = useState(false); // Nuevo estado para controlar si se muestran todas las notificaciones
//   useEffect(() => {
//     const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`, {
//       query: { userId: userId }, // Pasa el userId cuando te conectas
//     });

//     socket.on('newNotification', (data) => {
//       console.log('Nueva notificación:', data);
//       setnotification(data)
//     });

//     return () => {
//       socket.disconnect(); // Limpia la conexión cuando el componente se desmonta
//     };
//   }, [userId]);
//   const toggleNotifications = () => {
//     setIsOpen(!isOpen);
//   };

//   // const handleShowAll = () => {
//   //   setShowAll(true);
//   // };

//   // Mostrar solo las 5 primeras notificaciones si showAll es falso
//   // const notificationsToShow = showAll ? usersData : usersData.slice(0, 5);

//   return (
//     <div className="relative">
//       <button
//         onClick={toggleNotifications}
//         className="bg-acent flex text-white p-2 rounded-full focus:outline-none hover:bg-acent transition"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth="1.5"
//           stroke="currentColor"
//           className="size-6"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
//           />
//         </svg>
//         Notificaciones
//       </button>

//       {isOpen && (
//         <div className="absolute top-12 right-0 bg-white w-80 border border-gray-200 rounded-lg shadow-lg transition-transform duration-300 ease-in-out">
//           {/* Header con botón de cerrar */}
//           <div className="flex justify-between items-center bg-slate-300 px-4 py-2 rounded-t-lg">
//             <span className="text-secundary font-semibold">Notificaciones</span>
//             <button
//               onClick={toggleNotifications}
//               className="text-gray-500 hover:text-gray-700"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="1.5"
//                 stroke="currentColor"
//                 className="size-6 text-secundary"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
//                 />
//               </svg>
//             </button>
//           </div>

//           <ul className="p-4 space-y-4 h-56 overflow-auto">
//             {usersData.map((notification, index) => (
//               <li key={index} className="flex items-start space-x-2">
//                 <div className="flex-shrink-0">
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
//   <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
// </svg>

//                 </div>
//                 <div>
//                   <p className="text-secundary font-semibold">
//                     {notification?.notificationType?.name || "Sin tipo de notificación"} - {notification?.invoice?.number || "Sin número de factura"}
//                   </p>
//                   {/* <p className="text-gray-600 text-sm">
//                     Nota: {notification?.note || "Sin nota"}
//                   </p> */}
//                   {/* <p className="text-gray-600 text-sm">
//                     Impactado: {notification?.impactedUser?.Names || "Desconocido"} {notification?.impactedUser?.LastName || ""}
//                   </p> */}
//                   <p className="text-gray-600 text-sm">
//                     Activado por: <strong>{notification?.triggerUser?.Names || "Desconocido"} {notification?.triggerUser?.LastName || ""}</strong>
//                   </p>
//                   <p className="text-gray-600 text-sm">
//                     {new Date(notification?.createdAt).toLocaleString() || "Fecha desconocida"}
//                   </p>
//                 </div>
//               </li>
//             ))}
//           </ul>

//           {/* Botón para ver todas las notificaciones si hay más de 5 */}

//             {/* <div className="p-4 text-center">
//               <button

//                 className="text-white hover:underline bg-acent rounded-md p-2"
//               >
//                 Ver todas las notificaciones
//               </button>
//             </div> */}

//         </div>
//       )}
//     </div>
//   );
// };

// export default Notifications;
"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { io } from "socket.io-client";

const formatRelativeTime = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  const now = new Date();

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  const rtf = new Intl.RelativeTimeFormat("es", { numeric: "auto" });

  // if (days > 30) {
  //   return date.toLocaleDateString("es-ES", {
  //     weekday: "long",
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   });
  // } else if (days >= 7) {
  //   return rtf.format(-weeks, "week");
  // } else if (days > 0) {
  //   return rtf.format(-days, "day");
  // } else if (hours > 0) {
  //   return rtf.format(-hours, "hour");
  // } else if (minutes > 0) {
  //   return rtf.format(-minutes, "minute");
  // } else {
  //   return rtf.format(-seconds, "second");
  // }
};

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const { userData } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);

  const userId = userData?.isAdmin ? "Admin" : userData?.id;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/notifications`
        );
        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
          console.log(data, "datanotif");
        } else {
          throw new Error("No se cargaron las notificaciones");
        }
      } catch (error) {
        console.error("Error al cargar las notificaciones");
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`, {
      query: { userId: userId },
    });

    socket.on("newNotification", (data) => {
      console.log("Nueva notificación:", data);
      setHasNewNotification(true);
      setNotifications((prev) => [data, ...prev]);
      playSound();
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [userId]);

  function playSound() {
    const audio = new Audio();
    audio.src = "/sounds/notification.mp3"; // Formato MP3 para mayor compatibilidad
    audio.onerror = () => {
      audio.src = "/sounds/notification.ogg"; // Fallo con MP3, usa OGG
    };
    audio.play();
  }

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
    if (hasNewNotification) {
      setHasNewNotification(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleNotifications}
        className={`bg-acent flex items-center text-white p-2 rounded-full focus:outline-none hover:bg-acent transition ${
          hasNewNotification ? "bg-acent" : ""
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
          />
        </svg>
        {/* Texto visible solo en pantallas grandes */}
        <span className="hidden md:inline ml-2">Notificaciones</span>
        {/* Indicador de notificaciones */}
        {hasNewNotification && (
          <span className="absolute -top-3 -right-3 bg-red-400 text-white text-xs rounded-full px-2 py-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 bg-white w-96 border border-gray-200 rounded-lg shadow-lg transition-transform duration-300 ease-in-out">
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
        
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <li key={index} className="flex items-start space-x-2"> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
</svg>

                  <div>
                    <p className="text-gray-600 text-sm">
                      <strong>
                        {notification?.triggerUser?.Names || "Desconocido"}{" "}
                        {notification?.triggerUser?.LastName || ""}
                      </strong>{" "}
                      acaba de: <br />
                      <strong> {notification?.notificationType?.name}</strong>
                      <br />{" "}
                      {notification?.deliverable
                        ? `${notification.deliverable.name}`
                        : notification?.invoice?.number
                        ? ` ${notification.invoice.number}`
                        : ""}{" "}
                      <br />
                      {(notification?.impactedUser?.Names ||
                        notification?.impactedUser?.LastName) && (
                        <>
                          Para:{" "}
                          <strong>
                            {notification?.impactedUser?.Names || "Desconocido"}{" "}
                            {notification?.impactedUser?.LastName || ""}
                          </strong>
                        </>
                      )}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {/* {formatRelativeTime(notification?.createdAt)} */}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-gray-600 text-center">Sin notificaciones</li>
            )}
          </ul>
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
