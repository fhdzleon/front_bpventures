"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Button from '@/components/FormComponent/Button';
import "../../../../../styles/form-style.css";

interface Company {
  name: string;
  cuit: string;
  address: string;
}

interface IdParams {
  params: {
    id: string;
  };
}

const EditCompany: React.FC<IdParams> = ({ params }) => {
  const [company, setCompany] = useState<Company>({
    name: '',
    cuit: '',
    address: ''
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [nameError, setNameError] = useState('');
  const [cuitError, setCuitError] = useState('');
  const [addressError, setAddressError] = useState('');
  
  const router = useRouter();
  const { id } = params;

  // Función para obtener los detalles de la empresa por ID
  const fetchCompanyDetails = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies/${id}`);
      if (response.ok) {
        const data = await response.json();
        setCompany(data);
        setLoading(false);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al cargar los detalles de la empresa',
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#2b4168",
        });
      }
    } catch (error: any) {
      console.error("Error al obtener detalles de la empresa", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al cargar los detalles',
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#2b4168",
      });
    }
  };

  // Función para actualizar los detalles de la empresa
  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validaciones antes de enviar el formulario
    if (nameError || cuitError || addressError) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Corrige los errores antes de continuar.',
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#2b4168",
      });
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(company),
      });
  
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Actualizado',
          text: 'Empresa actualizada correctamente',
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#2b4168",
        });
        // router.push(`/in/company/${id}`);
      } else {
        const errorData = await response.json(); // Leer el cuerpo de la respuesta del error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorData.message || 'Error al actualizar la empresa', // Mostrar el mensaje enviado por el backend
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#2b4168",
        });
      }
    } catch (error: any) {
      console.error("Error al actualizar empresa", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Error al actualizar la empresa', // Mostrar el error del frontend
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#2b4168",
      });
    }
  };

  // Validación de campos con onBlur
  const validateName = () => {
    if (company.name.length > 20) {
      setNameError('El nombre no puede tener más de 20 caracteres.');
    } else {
      setNameError('');
    }
  };

  const validateCuit = () => {
    if (company.cuit.length !== 11) {
      setCuitError('El CUIT debe tener 11 caracteres.');
    } else {
      setCuitError('');
    }
  };

  const validateAddress = () => {
    if (company.address.length > 40) {
      setAddressError('La dirección no puede tener más de 40 caracteres.');
    } else {
      setAddressError('');
    }
  };

  useEffect(() => {
    if (id) {
      fetchCompanyDetails(id);
    }
  }, [id]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="flex flex-col justify-start items-center w-full min-h-screen">
      <button
        onClick={() => router.back()}
        className="bg-[#2B4168] text-white py-2 px-4 rounded-full shadow-md hover:bg-[#4a9c80] transition duration-300 self-start ml-4 mt-4"
      >
        Volver
      </button>

      <form className="form-apply" onSubmit={handleUpdate}>
        <h1 className="text-center text-[1.2rem] mb-6">Editar Empresa</h1>

        <div className="mb-4">
          <label className="label-apply" htmlFor="name">Razón Social:</label>
          <input
            type="text"
            id="name"
            value={company.name}
            onChange={(e) => setCompany({ ...company, name: e.target.value })}
            onBlur={validateName} // Validación onBlur
            className="input-apply"
            required
          />
          {nameError && <p className="text-red-500 mt-2">{nameError}</p>}
        </div>

        <div className="mb-4">
          <label className="label-apply" htmlFor="cuit">CUIT:</label>
          <input
            type="text"
            id="cuit"
            value={company.cuit}
            onChange={(e) => setCompany({ ...company, cuit: e.target.value })}
            onBlur={validateCuit} // Validación onBlur
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
            value={company.address}
            onChange={(e) => setCompany({ ...company, address: e.target.value })}
            onBlur={validateAddress} // Validación onBlur
            className="input-apply"
            required
          />
          {addressError && <p className="text-red-500 mt-2">{addressError}</p>}
        </div>

        <Button type="submit">Actualizar Empresa</Button>
      </form>
    </div>
  );
};

export default EditCompany;
