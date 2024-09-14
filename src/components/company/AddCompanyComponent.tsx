"use client";
import React, { useState } from 'react';
import "../../styles/form-style.css";
import Button from "../FormComponent/Button";
import Swal from 'sweetalert2';

export const AddCompanyComponent: React.FC = () => {
  const [name, setName] = useState('');
  const [cuit, setCuit] = useState('');
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    // Validación simple de campos obligatorios
    if (!name || !cuit || !address) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos son obligatorios',
      });
      return;
    }
  
    const companyData = {
      name,
      address,
      cuit: parseInt(cuit, 10), // Aseguramos que CUIT sea un número
    };
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(companyData),
      });
  
      if (response.ok) {
        const result = await response.json();
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Empresa añadida correctamente',
          timer: 1500,
          showConfirmButton: false,
        });
        console.log(result);
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorData.message || 'Error al añadir la empresa',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#2b4168',
        });
      }
    } catch (error: any) {
      console.error("Error al añadir la empresa", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al añadir la empresa. Inténtalo de nuevo.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#2b4168',
      });
    }
  };
  

  return (
    <div className="flex justify-center items-center w-full min-h-screen">

      <form className="form-apply" onSubmit={handleSubmit}>
        <h1 className="text-center text-[1.2rem] mb-6">Añadir Empresa</h1>

        <div className="mb-4">
          <label className="label-apply" htmlFor="name">Razón Social:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-apply"
            required
          />
        </div>

        <div className="mb-4">
          <label className="label-apply" htmlFor="cuit">CUIT:</label>
          <input
            type="number"
            id="cuit"
            value={cuit}
            onChange={(e) => setCuit(e.target.value)}
            className="input-apply"
            required
          />
        </div>

        <div className="mb-4">
          <label className="label-apply" htmlFor="address">Dirección:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
