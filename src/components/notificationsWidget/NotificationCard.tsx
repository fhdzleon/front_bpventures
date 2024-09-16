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
    const now = new Date();

    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    const rtf = new Intl.RelativeTimeFormat("es", { numeric: "auto" });

    if (days > 30) {
      return date.toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (days >= 7) {
      return rtf.format(-weeks, "week");
    } else if (days > 0) {
      return rtf.format(-days, "day");
    } else if (hours > 0) {
      return rtf.format(-hours, "hour");
    } else if (minutes > 0) {
      return rtf.format(-minutes, "minute");
    } else {
      return rtf.format(-seconds, "second");
    }
  };

  return (
    <div className="bg-white shadow-md border border-1 py-7 px-10">
      <div className="flex flex-col md:flex-row items-start justify-between">
        <div className="flex flex-col md:flex-row items-center text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-7 text-secundary mr-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d={
                impactedUser
                  ? "M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  : "M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
              }
            />
          </svg>
          {deliverable && (
            <span className="font-bold text-secundary mr-5">
              {deliverable.name}
            </span>
          )}
          {invoice && (
            <span className="font-bold text-secundary mr-5">
              {invoice.number}
            </span>
          )}
          <span className="mr-1">El usuario</span>
          <span className="font-bold mr-1">
            {triggerUser.Names} {triggerUser.LastName}
          </span>
          <span className="mr-1">acaba de</span>
          <span className="text-acent font-bold mr-1">
            {notificationType.name}
          </span>
          {deliverable && (
            <span className="font-bold mr-1">{deliverable.name}</span>
          )}
          {invoice && <span className="font-bold mr-1">{invoice.number}</span>}
          {impactedUser && (
            <>
              <span className="mr-1">al usuario</span>
              <span className="font-bold mr-1">
                {impactedUser.Names} {impactedUser.LastName}
              </span>
            </>
          )}
          .
        </div>
        <span className="text-xs text-gray-500 text-end">
          {formatDate(createdAt)}
        </span>
      </div>
    </div>
  );
};

export default NotificationCard;
