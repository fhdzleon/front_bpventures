"use client";
import React, { useState } from 'react';
import "../../styles/form-style.css";
import Button from "../FormComponent/Button";

export interface Invoice {
  id: number,
  invoicePath: null,
  invoiceNumber: string,
  invoiceIssueDate: string,
  invoiceDueDate: string,
  invoiceAmount: string,
  invoiceStatus: string,
  overdueIndicator: boolean
  }
interface InvoiceDetailProps {
  Invoice: Invoice;
}

export const VoucherUpload: React.FC <InvoiceDetailProps>= ({ Invoice }) => {
  const [invoiceNumber, setInvoiceNumber] = useState('INV-123456');
  const [paymentDate, setPaymentDate] = useState('2024-09-01');
  const [amount, setAmount] = useState(1500);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('number', invoiceNumber);
    formData.append('paymentDate', paymentDate);
    formData.append('amount', amount.toString());
    formData.append('invoiceId', Invoice.id.toString());
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await fetch(' http://localhost:3000/vouchers', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert('Payment voucher uploaded successfully!');
        console.log(result);
      } else {
        alert('Error uploading payment voucher');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while uploading the payment voucher.');
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
     <pre>{JSON.stringify(Invoice, null, 2)}</pre>
      <form className="form-apply" onSubmit={handleSubmit}>
        <h1 className="text-center text-[1.2rem] mb-6">Cargar Comprobante de Pago</h1>
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
          <label className="label-apply">Fecha de Pago:</label>
          <input
            type="date"
            id="fechaPago"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            className="input-apply"
            required
          />
        </div>

        <div className="mb-4">
          <label className="label-apply">Monto Pagado:</label>
          <input
            type="number"
            id="montoPagado"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className="input-apply"
            required
          />
        </div>

        <div className="mb-4">
          <label className="label-apply">Cargar Comprobante:</label>
          <input
            type="file"
            id="cargarComprobante"
            onChange={handleFileChange}
            className="input-apply"
            required
          />
        </div>

        <Button type="submit">Guardar Comprobante</Button>
      </form>
    </div>
  );
};

export default VoucherUpload;
