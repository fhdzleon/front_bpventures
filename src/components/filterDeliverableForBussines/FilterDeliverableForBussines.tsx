"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchDeliverables } from "@/helpers/fetchDeliverables";

interface Company {
  id: number;
  name: string;
  cuit: string;
  address: string;
}

interface FilterProps {
  userId: number;
  token: any;
  currentPage: any;
  currentFolder: any;
}

const FilterDeliverableForBussines: React.FC<FilterProps> = ({
  userId,
  token,
  currentPage,
  currentFolder,
}) => {
  const [bussinesData, setBussinesData] = useState<Company[]>([]);
  const { userData, setDeliverableData } = useAuth();

  useEffect(() => {
    const fetchCompanys = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/companies`
        );
        if (response.ok) {
          const data = await response.json();
          setBussinesData(data);
        } else {
          throw new Error("No se cargaron las empresas");
        }
      } catch (error) {
        console.error("Error al cargar las empresas");
      }
    };
    fetchCompanys();
  }, []);

  const handleFilter = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const companyId = event.target.value ? Number(event.target.value) : null;

    try {
      await fetchDeliverables(
        userId,
        token,
        currentPage,
        currentFolder,
        setDeliverableData,
        undefined,
        companyId
      );
    } catch (error) {
      throw new Error("Error al filtrar las empresas");
    }
  };

  return (
    <>
      {userData?.isAdmin && (
        <div>
          <select
            name="company"
            id="company"
            className="py-2 font-sans h-12 bg-secundary rounded-xl text-white px-4"
            onChange={handleFilter}
          >
            <option value="">Todas las empresas</option>
            {bussinesData.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
};

export default FilterDeliverableForBussines;
