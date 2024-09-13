import React from "react";

interface NotificationCardProps {
  note?: string;
  notificationType: {
    name: string;
  };
  impactedUser?: {
    Names?: string | null;
    LastName?: string | null;
  } | null;
  triggerUser: {
    Names: string;
    LastName: string;
  };
  deliverable?: {
    name: string;
    path: string;
  } | null;
  invoice?: {
    number: string;
  } | null;
  createdAt: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  note,
  notificationType,
  impactedUser,
  triggerUser,
  deliverable,
  invoice,
  createdAt,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white shadow-md border border-1 rounded-lg py-7 px-10 mb-4">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-700">
          Notificación {impactedUser ? "de Permiso" : "de Acción"}
        </h3>
        <span className="text-xs text-gray-500">{formatDate(createdAt)}</span>
      </div>
      <p className="text-gray-600 mt-2">
        {impactedUser ? (
          <>
            El usuario{" "}
            <span className="font-bold">
              {triggerUser.Names} {triggerUser.LastName}
            </span>{" "}
            acaba de{" "}
            <span className="text-blue-500">{notificationType.name}</span>{" "}
            {deliverable && (
              <>
                <span className="font-bold">{deliverable.name}</span>
              </>
            )}
            {invoice && (
              <>
                <span className="font-bold">{invoice.number}</span>
              </>
            )}
            {impactedUser && (
              <>
                {" "}
                al usuario{" "}
                <span className="font-bold">
                  {impactedUser.Names} {impactedUser.LastName}
                </span>
              </>
            )}
            .
          </>
        ) : (
          <>
            El usuario{" "}
            <span className="font-bold">
              {triggerUser.Names} {triggerUser.LastName}
            </span>{" "}
            acaba de{" "}
            <span className="text-blue-500">{notificationType.name}</span>{" "}
            {deliverable && (
              <>
                <span className="font-bold">{deliverable.name}</span>
              </>
            )}
            {invoice && (
              <>
                <span className="font-bold">{invoice.number}</span>
              </>
            )}
            .
          </>
        )}
      </p>
    </div>
  );
};

export default NotificationCard;
