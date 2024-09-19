
"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { io } from "socket.io-client";
import Cookies from 'js-cookie'; 
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
        const token = Cookies.get('token'); 
        if (!token) throw new Error("Token no encontrado en las cookies");
  
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications`, {
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          
      
          const recentNotifications = data.slice(0, 5);
  
          setNotifications(recentNotifications);
          console.log(recentNotifications, "últimas 5 notificaciones");
        } else {
          throw new Error("No se cargaron las notificaciones");
        }
      } catch (error) {
        console.error("Error al cargar las notificaciones:");
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
      setNotifications((prev) => [...prev, data]);
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
    audio.src = "/sounds/notification.mp3"; 
    audio.onerror = () => {
      audio.src = "/sounds/notification.ogg"; 
    };
    audio.volume = 0.6;
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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
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

