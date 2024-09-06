import React from "react";

interface SortDeliverableProps {
  name: string;
}

const handleSort = (name: string) => {
  alert(`Columna ${name} ordenada`);
};

const SortDeliverable: React.FC<SortDeliverableProps> = ({ name }) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6 cursor-pointer"
        onClick={() => handleSort(name)}
      >
        <title>Ordenar</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
        />
      </svg>
    </div>
  );
};

export default SortDeliverable;
