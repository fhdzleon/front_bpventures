import React, { useState, useEffect } from 'react';
import { filesData } from './data';

export default function FileTableNew() {
  const [openPanel, setOpenPanel] = useState<number | null>(null);
  const [previewData, setPreviewData] = useState(null); // Estado para guardar los datos obtenidos

  const togglePanel = (fileId: number | null) => {
    setOpenPanel(openPanel === fileId ? null : fileId);
  };

  const fetchPreview = async (fileId: number) => {
    try {
      const response = await fetch(`https://api.1rodemayo.com/deliverables/preview/${fileId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data === null) {
        console.warn('Received null data');
      }
      setPreviewData(data);
      togglePanel(fileId);
    } catch (error) {
      console.error('Error:');
    }
  };
  
console.log (previewData, "preview")
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="relative flex justify-center mb-6">
        <div className="w-full max-w-full">
          <table className="w-full rounded-md bg-white shadow-lg border border-gray-300">
            <thead className="bg-secundary text-white rounded-md">
              <tr>
                <th className="py-3 px-6 text-left text-lg">Nombre del Archivo</th>
                <th className="py-3 px-6 text-left text-lg">Tipo</th>
                <th className="py-3 px-6 text-left text-lg">Fecha de Creación</th>
                <th className="py-3 px-6 text-left text-lg">Autor</th>
                <th className="py-3 px-6 text-left text-lg">Acciones</th>
                <th className="py-3 px-6 text-left text-lg">Permisos</th>
              </tr>
            </thead>
            <tbody>
              {filesData.map((file) => (
                <tr key={file.id} className="relative hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-4 px-6 text-sm text-gray-900">{file.name}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{file.type}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{file.creationDate}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{file.autor}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    <button onClick={() => fetchPreview(file.id)}>Vista</button>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {/* Otros botones de acción o permisos */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Panel de vista previa o cualquier otro contenido que desees mostrar */}
          {openPanel && previewData && (
            <div className="preview-panel">
              <h3>Vista previa del archivo {openPanel}</h3>
              <p>{JSON.stringify(previewData, null, 2)}</p>
              {/* Aquí puedes mostrar la información que obtuviste en el fetch */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}