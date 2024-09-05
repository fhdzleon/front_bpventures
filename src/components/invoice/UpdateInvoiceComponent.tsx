"use client";
import React, { useState, useEffect } from 'react';
import "../../styles/form-style.css";
import Button from "../FormComponent/Button";
import { Toaster, toast } from "sonner";
import { useRouter } from 'next/navigation';

const invoiceStatuses = [
  { id: 1, name: 'Pendiente' },
  { id: 2, name: 'Pagada' },
  { id: 3, name: 'Anulada' },
];

const UpdateInvoiceComponent: React.FC<{ invoiceId: number }> = ({ invoiceId }) => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [amount, setAmount] = useState(0);
  const [invoiceStatusId, setInvoiceStatusId] = useState(invoiceStatuses[0].id);
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoices/getbyid/${invoiceId}`);
        if (response.ok) {
          const data = await response.json();
          setInvoiceNumber(data.number);
          setIssueDate(data.issueDate);
          setDueDate(data.dueDate);
          setAmount(data.amount);
          setInvoiceStatusId(data.invoiceStatus.id);
          setLoading(false);
        } else {
          throw new Error('Error al obtener los datos de la factura');
        }
      } catch (error: any) {
        console.error('Error al obtener la factura', error);
        setErrorMessage('Error al obtener los datos de la factura');
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [invoiceId]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('invoiceNumber', invoiceNumber);
    formData.append('issueDate', issueDate);
    formData.append('dueDate', dueDate);
    formData.append('amount', amount.toString());
    formData.append('invoiceStatusId', invoiceStatusId.toString());
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoices/${invoiceId}`, {
        method: 'PATCH',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Factura actualizada correctamente");
        // router.push('/invoices'); // Redirige a la página de facturas después de la actualización
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Error al actualizar la factura');
      }
      
    } catch (error: any) {
      console.error("Error al actualizar la factura", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Toaster richColors />

      <form className="form-apply" onSubmit={handleSubmit}>
        <h1 className="text-center text-[1.2rem] mb-6">Actualizar Factura</h1>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <>
            <div className="mb-4">
              <label className="label-apply">Número de Factura:</label>
              <input
                type="text"
                id="numeroFactura"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="input-apply"
                required
              />
              {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
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
                accept=".pdf,image/*"
                className="input-apply"
              />
            </div>

            <Button type="submit">Guardar Cambios</Button>
          </>
        )}
      </form>
    </div>
  );
};

export default UpdateInvoiceComponent;
