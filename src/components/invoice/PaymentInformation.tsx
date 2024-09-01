import React, { useState } from 'react';

const PaymentInformation: React.FC<{ facturaId: number; onClose: () => void }> = ({ facturaId, onClose }) => {
  const [comprobante, setComprobante] = useState<File | null>(null);

  const handleSubirComprobante = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setComprobante(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    // Lógica para subir el comprobante
    console.log(`Subir comprobante para factura ${facturaId}`, comprobante);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded">
        <h2 className="text-xl mb-4">Informar Pago - Factura {facturaId}</h2>
        <input type="file" onChange={handleSubirComprobante} className="mb-4" />
        <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Subir</button>
        <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cancelar</button>
      </div>
    </div>
  );
};
