import React, { useState } from 'react';

const invoiceStatuses = [
  { id: 1, name: 'Pendiente' },
  { id: 2, name: 'Pagada' },
  { id: 3, name: 'Vencida' },
];

const UploadInvoice: React.FC = () => {
  const [numeroFactura, setNumeroFactura] = useState('');
  const [fechaEmision, setFechaEmision] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [monto, setMonto] = useState(0);
  const [idUser, setIdUser] = useState('');
  const [estadoFactura, setEstadoFactura] = useState(invoiceStatuses[0].id);
  const [comprobante, setComprobante] = useState<File | null>(null);

  const handleComprobanteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setComprobante(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const selectedStatus = invoiceStatuses.find(status => status.id === estadoFactura);

    const nuevaFactura = {
      numeroFactura,
      fechaEmision,
      fechaVencimiento,
      monto,
      idUser,
      estadoFactura: selectedStatus, // Incluye el estado como un objeto {id, name}
      comprobante,
    };

    console.log(nuevaFactura);
    // Aquí puedes enviar `nuevaFactura` a tu backend
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cargar Nueva Factura</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Número de Factura:</label>
          <input
            type="text"
            value={numeroFactura}
            onChange={(e) => setNumeroFactura(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Fecha de Emisión:</label>
          <input
            type="date"
            value={fechaEmision}
            onChange={(e) => setFechaEmision(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Fecha de Vencimiento:</label>
          <input
            type="date"
            value={fechaVencimiento}
            onChange={(e) => setFechaVencimiento(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Monto:</label>
          <input
            type="number"
            value={monto}
            onChange={(e) => setMonto(parseFloat(e.target.value))}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">ID Usuario:</label>
          <input
            type="text"
            value={idUser}
            onChange={(e) => setIdUser(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Estado de la Factura:</label>
          <select
            value={estadoFactura}
            onChange={(e) => setEstadoFactura(parseInt(e.target.value))}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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
          <label className="block text-gray-700">Cargar Comprobante de Pago:</label>
          <input
            type="file"
            onChange={handleComprobanteChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
        >
          Guardar Factura
        </button>
      </form>
    </div>
  );
};

export default UploadInvoice;
