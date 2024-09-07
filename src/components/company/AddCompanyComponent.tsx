"use client";
import React, { useState } from 'react';
import "../../styles/form-style.css";
import Button from "../FormComponent/Button";
import { Toaster, toast } from "sonner";

export const AddCompanyComponent: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [cuit, setCuit] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!companyName || !cuit) {
      setErrorMessage('Todos los campos son obligatorios');
      return;
    }

    const formData = new FormData();
    formData.append('companyName', companyName);
    formData.append('cuit', cuit);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Empresa añadida correctamente");
        console.log(result);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Error al añadir la empresa');
      }
    } catch (error: any) {
      console.error("Error al añadir la empresa", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Toaster richColors />

      <form className="form-apply" onSubmit={handleSubmit}>
        <h1 className="text-center text-[1.2rem] mb-6">Añadir Empresa</h1>

        <div className="mb-4">
          <label className="label-apply">Razón Social:</label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="input-apply"
            required
          />
        </div>

        <div className="mb-4">
          <label className="label-apply">CUIT:</label>
          <input
            type="text"
            id="cuit"
            value={cuit}
            onChange={(e) => setCuit(e.target.value)}
            className="input-apply"
            required
          />
        </div>

        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

        <Button type="submit">Guardar Empresa</Button>
      </form>
    </div>
  );
};

export default AddCompanyComponent;
