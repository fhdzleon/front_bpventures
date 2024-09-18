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
  const [nameError, setNameError] = useState('');
  const [cuitError, setCuitError] = useState('');
  const [addressError, setAddressError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validaciones de los campos
    if (!name || !cuit || !address) {
      setErrorMessage('Todos los campos son obligatorios.');
      return;
    }

    if (cuit.length !== 11) {
      setErrorMessage('El CUIT debe tener 11 caracteres.');
      return;
    }

    if (name.length > 100) {
      setErrorMessage('El nombre no puede tener más de 100 caracteres.');
      return;
    }

    if (address.length > 100) {
      setErrorMessage('La dirección no puede tener más de 100 caracteres.');
      return;
    }

    const companyData = {
      name,
      address,
      cuit: parseInt(cuit, 10),
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
          confirmButtonColor: "#2b4168",
        });
        console.log(result);
        setErrorMessage(''); // Limpiar el mensaje de error
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

  const validateName = () => {
    if (name.length > 20) {
      setNameError('El nombre no puede tener más de 20 caracteres.');
    } else {
      setNameError('');
    }
  };

  const validateCuit = () => {
    if (cuit.length !== 11) {
      setCuitError('El CUIT debe tener 11 caracteres.');
    } else {
      setCuitError('');
    }
  };

  const validateAddress = () => {
    if (address.length > 40) {
      setAddressError('La dirección no puede tener más de 40 caracteres.');
    } else {
      setAddressError('');
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
            onBlur={validateName} // Validación al perder el foco
            className="input-apply"
            required
            maxLength={100}
          />
          {nameError && <p className="text-red-500 mt-2">{nameError}</p>}
        </div>

        <div className="mb-4">
          <label className="label-apply" htmlFor="cuit">CUIT:</label>
          <input
            type="number"
            id="cuit"
            value={cuit}
            onChange={(e) => setCuit(e.target.value)}
            onBlur={validateCuit} // Validación al perder el foco
            className="input-apply"
            required
          />
          {cuitError && <p className="text-red-500 mt-2">{cuitError}</p>}
        </div>

        <div className="mb-4">
          <label className="label-apply" htmlFor="address">Dirección:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onBlur={validateAddress} // Validación al perder el foco
            className="input-apply"
            required
            maxLength={100}
          />
          {addressError && <p className="text-red-500 mt-2">{addressError}</p>}
        </div>

        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

        <Button type="submit">Guardar Empresa</Button>
      </form>
    </div>
  );
};

export default AddCompanyComponent;
