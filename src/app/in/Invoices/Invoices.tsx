import React, { useState } from 'react';

interface Invoices {
  id: number;
  estado: 'pagada' | 'pendiente' | 'vencida';
  fechaVencimiento: string;
  monto: number;
}

const Facturacion: React.FC = () => {
  const [facturas, setFacturas] = useState<Invoices[]>([
    { id: 1, estado: 'pendiente', fechaVencimiento: '2024-09-01', monto: 1500 },
    { id: 2, estado: 'pagada', fechaVencimiento: '2024-08-15', monto: 2000 },
    // Agrega más facturas según sea necesario
  ]);

  const handleDescargarFactura = (id: number) => {
    // Lógica para descargar la factura
    console.log(`Descargar factura con id ${id}`);
  };

  const handleEliminarFactura = (id: number) => {
    // Lógica para eliminar la factura
    setFacturas(facturas.filter(factura => factura.id !== id));
    console.log(`Eliminar factura con id ${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sección de Facturación</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Estado</th>
            <th className="py-2">Fecha de Vencimiento</th>
            <th className="py-2">Monto</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {facturas.map(factura => (
            <tr key={factura.id}>
              <td className="border px-4 py-2">{factura.id}</td>
              <td className="border px-4 py-2">{factura.estado}</td>
              <td className="border px-4 py-2">{factura.fechaVencimiento}</td>
              <td className="border px-4 py-2">${factura.monto}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDescargarFactura(factura.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Descargar
                </button>
                <button
                  onClick={() => handleEliminarFactura(factura.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Facturacion;


