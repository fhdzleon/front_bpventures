import React from "react";
import { usersData } from "@/helpers/UsersData";
import NotificationCard from "./NotificationCard";

const Notifications: React.FC = () => {
  return (
    <div className="px-10">
      <h2 className="text-4xl font-futura mb-6 text-secundary">
        Actividad reciente
      </h2>
      <div className="space-y-0">
        {usersData.map((notification, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default Notifications;
