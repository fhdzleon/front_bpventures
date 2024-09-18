"use client";
import { usersData } from "@/helpers/UsersData";
import React, { useState, useEffect } from "react";
import NotificationCard from "./NotificationCard";
import { Notification } from "@/interfaces/notifications";
import Cookies from "js-cookie";

const Notifications: React.FC = () => {
  const [notificationsData, setNotificationData] = useState<Notification[]>([]);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/notifications`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setNotificationData(data);
        } else {
          throw new Error("No se cargaron las notificaciones");
        }
      } catch (error) {
        console.error("Error al cargar las notificaciones");
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="px-10">
      <h2 className="text-4xl font-futura mb-6 text-secundary">
        Actividad reciente
      </h2>
      <div className="space-y-0">
        {Array.isArray(notificationsData) && notificationsData.length > 0 ? (
          notificationsData.map((notification, index) => (
            <NotificationCard
              key={index}
              note={notification.note}
              notificationType={notification.notificationType}
              impactedUser={notification.impactedUser}
              triggerUser={notification.triggerUser}
              deliverable={notification.deliverable}
              invoice={notification.invoice}
              createdAt={notification.createdAt}
            />
          ))
        ) : (
          <span>No hay actividad registrada</span>
        )}
      </div>
    </div>
  );
};

export default Notifications;
