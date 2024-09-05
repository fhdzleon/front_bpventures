import React, { useEffect, useState } from 'react';
import "../../styles/form-style.css";
import Button from "../FormComponent/Button";
import { Toaster, toast } from 'sonner';

export interface Invoice {
  id: number;
  invoicePath: string | null;
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
        toast.success("Comprobante de pago cargado correctamente");
        setVoucherState(result);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Error al cargar el comprobante de pago');
      }
    } catch (error: any) {
      console.error("Error al cargar el comprobante de pago", error);
      toast.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vouchers/${voucherState.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success("Comprobante de pago eliminado correctamente");
        setVoucherState(null); // Reinicia el estado para mostrar el formulario de carga nuevamente
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Error al eliminar el comprobante de pago');
      }
    } catch (error: any) {
      console.error("Error al eliminar el comprobante de pago", error);
      toast.error(error.message);
    }
  };

  const renderVoucherFile = () => {
    if (!voucherState?.path) {
      return <p>No hay archivo asociado.</p>;
    }

    const fileExtension = voucherState.path.split('.').pop()?.toLowerCase();
    const fileUrl = `${process.env.NEXT_PUBLIC_API_URL}/${voucherState.path}`;

    if (fileExtension === 'pdf') {
      return (
        <div className="mb-4">
          <strong>Archivo Comprobante:</strong>
          <iframe
            src={fileUrl}
            title="Comprobante PDF"
            className="w-full h-96 border-0"
          />
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline mt-2 block"
          >
            Ver PDF en Nueva Ventana
          </a>
        </div>
      );
    } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
      return (
        <div className="mb-4">
          <strong>Previsualización de Comprobante:</strong>
          <img
            src={fileUrl}
            alt="Comprobante de Pago"
            className="mt-2 max-w-xs"
          />
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline mt-2 block"
          >
            Ver Imagen en Nueva Ventana
          </a>
        </div>
      );
    } else {
      return (
        <div className="mb-4">
          <strong>Archivo Comprobante:</strong>
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Descargar archivo
          </a>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Toaster richColors />
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
          <Button onClick={handleDelete} type="button" className="mt-4 bg-red-500 hover:bg-red-600 text-white">
            Eliminar Comprobante
          </Button>
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
