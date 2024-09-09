"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

interface Company {
  id: number;
  name: string;
  cuit: string;
  address: string;
}

const FilterDeliverableForBussines = () => {
  const [bussinesData, setBussinesData] = useState<Company[]>([]);
  const { userData } = useAuth();

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

  return (
    <>
      {userData?.isAdmin && (
        <div>
          <select
            name="company"
            id="company"
            className="py-2 font-sans bg-secundary rounded-xl text-white px-4"
          >
            <option value="">Selecciona una empresa</option>
            {bussinesData.map((company) => (
              <option key={company.id} value={company.name}>
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
