"use client";
import React, { useState } from 'react';
import "../../styles/form-style.css";
import Button from "../FormComponent/Button";
import { Toaster, toast } from "sonner";

const invoiceStatuses = [
  { id: 1, name: 'Pendiente' },
  { id: 2, name: 'Pagada' },
  { id: 3, name: 'Anulada' },
];

export const UploadInvoiceComponet: React.FC<{ userId: number }> = ({ userId }) => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [amount, setAmount] = useState(0);
  const [invoiceStatusId, setInvoiceStatusId] = useState(invoiceStatuses[0].id);
  const [file, setFile] = useState<File | null>(null);
  const [invoiceNumberExists, setInvoiceNumberExists] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleInvoiceNumberBlur = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoices/check-invoice-number?invoiceNumber=${invoiceNumber}`);
      if (response.ok) {
        const data = await response.json();
        setInvoiceNumberExists(data.exists);
        if (data.exists) {
          toast.error('Ya existe una factura con este número');
        }
      } else {
        throw new Error('Error al verificar el número de factura');
      }
    } catch (error: any) {
      console.error('Error al verificar el número de factura', error);
      toast.error(error.message);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (invoiceNumberExists) {
      toast.error('No se puede cargar la factura porque el número ya existe');
      return;
    }

    const selectedStatus = invoiceStatuses.find(status => status.id === invoiceStatusId);

    const formData = new FormData();
    formData.append('invoiceNumber', invoiceNumber);
    formData.append('issueDate', issueDate);
    formData.append('dueDate', dueDate);
    formData.append('amount', amount.toString());
    formData.append('userId', userId.toString());
    formData.append('invoiceStatusId', invoiceStatusId.toString());
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoices`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Factura cargada correctamente");
        console.log(result);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Error al cargar la factura');
      }
      
    } catch (error: any) {
      console.error("Error al cargar la factura", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Toaster richColors />

      <form className="form-apply" onSubmit={handleSubmit}>
        <h1 className="text-center text-[1.2rem] mb-6">Cargar Nueva Factura {userId}</h1>
        <div className="mb-4">
          <label className="label-apply">Número de Factura:</label>
          <input
            type="text"
            id="numeroFactura"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            onBlur={handleInvoiceNumberBlur}
            className="input-apply"
            required
          />
        </div>

        <div className="mb-4">
          <label className="label-apply">Fecha de Emisión:</label>
          <input
            type="date"
            id="fechaEmision"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            className="input-apply"
            required
          />
        </div>
        <div className="mb-4">
          <label className="label-apply">Fecha de Vencimiento:</label>
          <input
            type="date"
            id="fechaVencimiento"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="input-apply"
            required
          />
        </div>
        <div className="mb-4">
          <label className="label-apply">Monto:</label>
          <input
            type="number"
            id="monto"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className="input-apply"
            required
          />
        </div>
        <div className="mb-4">
          <label className="label-apply">Estado de la Factura:</label>
          <select
            id='estadoFactura'
            value={invoiceStatusId}
            onChange={(e) => setInvoiceStatusId(parseInt(e.target.value))}
            className="input-apply"
            required
          >
            {invoiceStatuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
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
            className="input-apply"
          />
        </div>

        <Button type="submit">Guardar Factura</Button>
      </form>
    </div>
  );
};

export default UploadInvoiceComponet;
