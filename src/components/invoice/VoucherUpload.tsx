import React, { useEffect, useState } from 'react';
import "../../styles/form-style.css";
import Button from "../FormComponent/Button";

export interface Invoice {
  id: number;
  invoicePath: null;
  invoiceNumber: string;
  invoiceIssueDate: string;
  invoiceDueDate: string;
  invoiceAmount: string;
  invoiceStatus: string;
  overdueIndicator: boolean;
}

interface InvoiceDetailProps {
  Invoice: Invoice;
}

export const VoucherUpload: React.FC<InvoiceDetailProps> = ({ Invoice }) => {
  const [invoiceNumber, setInvoiceNumber] = useState('INV-123456');
  const [paymentDate, setPaymentDate] = useState('2024-09-01');
  const [amount, setAmount] = useState(1500);
  const [file, setFile] = useState<File | null>(null);
  const [voucherState, setVoucherState] = useState<any>(null);

  const getVoucherById = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vouchers/${Invoice.id}`);
    if (response.ok) {
      const data = await response.json();
      setVoucherState(data);
    }
  };

  useEffect(() => {
    getVoucherById();
  }, []);

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vouchers`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert('Payment voucher uploaded successfully!');
        setVoucherState(result);
      } else {
        alert('Error uploading payment voucher');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while uploading the payment voucher.');
    }
  };

  const renderVoucherFile = () => {
    const fileExtension = voucherState.path.split('.').pop().toLowerCase();

    if (fileExtension === 'pdf') {
      return (
        <div className="mb-2">
          <strong>Archivo Comprobante:</strong>
          <a href={`${process.env.NEXT_PUBLIC_API_URL}/${voucherState.path}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            Abrir PDF en otra ventana
          </a>
        </div>
      );
    } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
      return (
        <div className="mb-2">
          <strong>Previsualización de Comprobante:</strong>
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}/${voucherState.path}`}
            alt="Comprobante de Pago"
            className="mt-2 max-w-xs"
          />
        </div>
      );
    } else {
      return (
        <div className="mb-2">
          <strong>Archivo Comprobante:</strong>
          <a href={`${process.env.NEXT_PUBLIC_API_URL}/${voucherState.path}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            Descargar archivo
          </a>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {voucherState ? (
        <div className="voucher-detail-container mt-8 p-4 border rounded shadow">
          <h2 className="text-center text-[1.2rem] mb-4">Detalle del Comprobante de Pago</h2>
          <div className="mb-2">
            <strong>Número de Comprobante:</strong> {voucherState.number}
          </div>
          <div className="mb-2">
            <strong>Fecha de Pago:</strong> {voucherState.paymentDate}
          </div>
          <div className="mb-2">
            <strong>Monto Pagado:</strong> {voucherState.amount}
          </div>
          <div className="mb-2">
            <strong>Factura Asociada:</strong> {voucherState.invoiceId.number}
          </div>
          {renderVoucherFile()}
        </div>
      ) : (
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
              accept="image/*,application/pdf" // Limita la selección a imágenes y PDF
              onChange={handleFileChange}
              className="input-apply"
              required
            />
          </div>

          <Button type="submit">Guardar Comprobante</Button>
        </form>
      )}
    </div>
  );
};

export default VoucherUpload;
