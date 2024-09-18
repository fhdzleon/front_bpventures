import React from "react";

interface FilterInputProps {
  filter: string;
  onFilterChange: (value: string) => void;
}

const FilterInput: React.FC<FilterInputProps> = ({ filter, onFilterChange }: FilterInputProps) => {
  return (
    <div className="flex my-3 items-center">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-8 bg-gray-200 h-12 px-1 rounded-l-2xl"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>

      <div>
        <input
          type="text"
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          placeholder="Buscar por Nombre"
          className="bg-gray-200 w-40 font-sans text-xs md:text-lg h-12 md:w-96 outline-none rounded-r-2xl placeholder-secundary px-3"
          aria-label="Buscar por Nombre"
        />
      </div>
    </div>
  );
};

export default FilterInput;
