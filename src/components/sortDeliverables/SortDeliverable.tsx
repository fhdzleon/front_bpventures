"use client";

import React, { useState } from "react";
import Cookies from "js-cookie";

interface SortDeliverableProps {
  column: string;
  UserId: any;
}

const SortDeliverable: React.FC<SortDeliverableProps> = ({
  UserId,
  column,
}) => {
  const [order, setOrder] = useState<"ASC" | "DESC">("DESC");
  const token = Cookies.get("token");

  const handleSort = async () => {
    const newOrder = order === "ASC" ? "DESC" : "ASC";
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/deliverables/user/${UserId}?orderBy=${column}&orderOrientation=${newOrder}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al ordenar los entregables");
      }

      const data = await response.json();
      console.log(data);

      setOrder(newOrder);
      console.log(newOrder);
    } catch (error) {
      console.error("Hubo un problema con la solicitud de ordenamiento", error);
    }
  };

  return (
    <button onClick={handleSort}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6 cursor-pointer"
      >
        <title>Ordenar</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
        />
      </svg>
    </button>
  );
};

export default SortDeliverable;
