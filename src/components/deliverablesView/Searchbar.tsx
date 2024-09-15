import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  fetchdeliverable: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  fetchdeliverable,
}) => {
  const { deliverableData, setDeliverableData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = Cookies.get("token");

  const searchDeliverables = async (name: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/deliverables/file/${name}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al buscar archivos");
      }

      const data = await response.json();

      if (!data) {
        throw new Error("Error al buscar archivos");
      }

      const deliverables = data?.map((item: any) => {
        return {
          id: item.id,
          parentId: item.parentId,
          deliverableName: item.name,
          deliverableIsFolder: item.isFolder,
          deliverablePath: item.path,
          deliverableType: item.deliverableType.name,
          deliverableCategory: item.deliverableCategory.name,
          permissionTypes: item.permissions.map(
            (permission: any) => permission.permissionType.name
          ),
          lastDate: item.modifiedAt || item.createdAt,
        };
      });

      setDeliverableData(deliverables);
    } catch (err) {
      console.error("Error al buscar archivos:", err);
      setError("Error al buscar archivos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      searchDeliverables(searchTerm);
    } else {
      fetchdeliverable();
    }
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    console.log("Término de búsqueda actualizado:", e.target.value);
  };

  return (
    <div className="flex my-3 items-center relative">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-8 bg-slate-300 h-12 px-1 rounded-l-2xl"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>

      <div className="relative">
        <input
          className="bg-slate-300 w-40 font-sans text-xs md:text-lg h-12 md:w-96 outline-none rounded-r-2xl placeholder-secundary px-3"
          type="text"
          placeholder="Buscar por nombre de archivo"
          aria-label="Buscar por nombre de archivo"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchTerm && loading && (
          <span className="absolute top-14 left-3 text-sm text-gray-500">
            Cargando...
          </span>
        )}
        {searchTerm && error && (
          <span className="absolute top-14 left-3 text-sm text-red-500">
            Error: {error}
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
