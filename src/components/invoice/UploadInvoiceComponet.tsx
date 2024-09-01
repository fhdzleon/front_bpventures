"use client";
import React, { useState } from 'react';
import "../../styles/form-style.css";
import Button from "../FormComponent/Button";

const invoiceStatuses = [
  { id: 1, name: 'Pendiente' },
  { id: 2, name: 'Pagada' },
  { id: 3, name: 'Vencida' },
];

export const UploadInvoiceComponet: React.FC = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('INV-123456');
  const [issueDate, setIssueDate] = useState('2024-08-31');
  const [dueDate, setDueDate] = useState('2024-09-15');
  const [amount, setAmount] = useState(1500);
  const [userId, setUserId] = useState(1);
  const [invoiceStatusId, setInvoiceStatusId] = useState(invoiceStatuses[0].id);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

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
      const response = await fetch('http://localhost:3000/invoices', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert('Invoice uploaded successfully!');
        console.log(result);
      } else {
        alert('Error uploading invoice');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while uploading the invoice.');
    }
    // const nuevaFactura = {
    //   numeroFactura,
    //   fechaEmision,
    //   fechaVencimiento,
    //   monto,
    //   idUser,
    //   estadoFactura: selectedStatus, // Incluye el estado como un objeto {id, name}
    //   comprobante,
    // };

    // console.log(nuevaFactura);
    // // Aquí puedes enviar `nuevaFactura` a tu backend
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen">

      <form className="form-apply" onSubmit={handleSubmit}>
        <h1 className="text-center text-[1.2rem] mb-6">Cargar Nueva Factura</h1>
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
        {/* <div className="mb-4">
          <label className="block text-gray-700">ID Usuario:</label>
          <input
            type="text"
            value={idUser}
            onChange={(e) => setIdUser(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div> */}
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
          <label className="label-apply">Cargar Comprobante de Pago:</label>
          <input
            type="file"
            id="comprobante"
            onChange={handleFileChange}
            className="input-apply"
          />
        </div>
        
        {/* <div className="flex justify-center w-3/4 mt-4"> */}
          {/* <button
            type="submit"
            className="bg-secundary font-sans text-white font-bold py-2 px-4 rounded">
            Guardar Factura
          </button> */}
          <Button type="submit">Guardar Factura</Button>
        {/* </div> */}
      </form>
    </div>
  );
};

export default UploadInvoiceComponet;
