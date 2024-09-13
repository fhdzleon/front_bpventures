"use client";
import React, { useEffect, useState } from "react";
import "../../styles/form-style.css";
import Button from "../FormComponent/Button";
import Swal from 'sweetalert2';

const invoiceStatuses = [
  { id: 1, name: "Pendiente" },
  { id: 2, name: "Pagada" },
  { id: 3, name: "Anulada" },
  { id: 4, name: "En revisión" },
];

export const UploadInvoiceComponent: React.FC<{ userId: number }> = ({ userId }) => {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [invoiceStatusId, setInvoiceStatusId] = useState(invoiceStatuses[0].id);
  const [file, setFile] = useState<File | null>(null);
  const [invoiceNumberExists, setInvoiceNumberExists] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [companies, setCompanies] = useState<any[]>([]);
  const [companyId, setCompanyId] = useState<number | null>(null); // Estado para companyId

  const getCompanies = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies`);
    if (response.ok) {
      const data = await response.json();
      setCompanies(data);
      if (data.length > 0) {
        setCompanyId(data[0].id); // Set the first company as the default selected
      }
    }
  };

  useEffect(() => {
    getCompanies();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const checkInvoiceNumber = async (newInvoiceNumber: string) => {
    if (newInvoiceNumber.length > 0) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoices/check-invoice-number?invoiceNumber=${newInvoiceNumber}`);
        if (response.ok) {
          const data = await response.json();
          setInvoiceNumberExists(data.exists);
          if (data.exists) {
            setErrorMessage("Ya existe una factura con este número");
          } else {
            setErrorMessage("");
          }
        } else {
          throw new Error("Error al verificar el número de factura");
        }
      } catch (error: any) {
        console.error("Error al verificar el número de factura", error);
        setErrorMessage("Error al verificar el número de factura");
      }
    } else {
      setErrorMessage("");
    }
  };

  const handleInvoiceNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInvoiceNumber = e.target.value;
    setInvoiceNumber(newInvoiceNumber);
    checkInvoiceNumber(newInvoiceNumber); // Valida en cada cambio
  };

  const handleInvoiceNumberBlur = () => {
    checkInvoiceNumber(invoiceNumber); // Valida al perder el foco
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (invoiceNumberExists) {
      setErrorMessage("No se puede cargar la factura porque el número ya existe");
      return;
    }
  
    const formData = new FormData();
    formData.append("invoiceNumber", invoiceNumber);
    formData.append("issueDate", issueDate);
    formData.append("dueDate", dueDate);
    formData.append("amount", amount.toString());
    formData.append("userId", userId.toString());
    formData.append("invoiceStatusId", invoiceStatusId.toString());
    if (companyId) {
      formData.append("companyId", companyId.toString());
    }
    if (file) {
      formData.append("file", file);
    }
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoices`, {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const result = await response.json();
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Factura cargada correctamente',
        });
        console.log(result);
  
        // Limpiar los campos del formulario después de una carga exitosa
        setInvoiceNumber("");
        setIssueDate("");
        setDueDate("");
        setAmount(0);
        setInvoiceStatusId(invoiceStatuses[0].id);
        setCompanyId(null);
        setFile(null);
        setErrorMessage("");
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorData.message || "Error al cargar la factura",
        });
      }
    } catch (error: any) {
      console.error("Error al cargar la factura", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al cargar la factura. Inténtalo de nuevo.',
      });
    }
  };
  

  return (
    <div className="flex justify-center items-center w-full min-h-screen">

      <form className="form-apply" onSubmit={handleSubmit}>
        <h1 className="text-center text-[1.2rem] mb-6">Cargar Nueva Factura{/*  {userId} */}</h1>
        <div className="mb-4">
          <label className="label-apply">Número de Factura:</label>
          <input
            type="text"
            id="numeroFactura"
            value={invoiceNumber}
            onChange={handleInvoiceNumberChange} // Valida en cada cambio
            onBlur={handleInvoiceNumberBlur} // Valida al salir del campo
            className="input-apply"
            required
          />
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </div>

        <div className="mb-4">
          <label className="label-apply">Fecha de Emisión:</label>
          <input type="date" id="fechaEmision" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} className="input-apply" required />
        </div>
        <div className="mb-4">
          <label className="label-apply">Fecha de Vencimiento:</label>
          <input type="date" id="fechaVencimiento" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="input-apply" required />
        </div>
        <div className="mb-4">
          <label className="label-apply">Monto:</label>
          <input type="number" id="monto" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} className="input-apply" required />
        </div>
        <div className="mb-4">
          <label className="label-apply">Estado de la Factura:</label>
          <select id="estadoFactura" value={invoiceStatusId} onChange={(e) => setInvoiceStatusId(parseInt(e.target.value))} className="input-apply" required>
            {invoiceStatuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
        </div>

        {/* Select para empresas */}
        <div className="mb-4">
          <label className="label-apply">Empresa:</label>
          <select id="companyId" value={companyId ?? ''} onChange={(e) => setCompanyId(parseInt(e.target.value))} className="input-apply" required>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="label-apply">Cargar Factura:</label>
          <input
            type="file"
            id="cargadeFactura"
            onChange={handleFileChange}
            accept=".pdf,image/*" // Solo permite PDF y cualquier tipo de imagen
            className="input-apply"
            required // Hace que el campo sea obligatorio
          />
        </div>

        <Button type="submit">Guardar Factura</Button>
      </form>
    </div>
  );
};

export default UploadInvoiceComponent;
