'use client';
import { useState } from 'react';
import PermissionPanel from '../deliverablesView/permissionpanel';
import { filesData } from './data';

export default function FileTableNew() {
  const [openPanel, setOpenPanel] = useState<number | null>(null);

  const togglePanel = (fileId: number | null) => {
    setOpenPanel(openPanel === fileId ? null : fileId);
  };

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
                    <button className="text-gray-900 hover:text-blue-700">Ver</button>
                    <button className="text-gray-900 ml-2 hover:text-yellow-700">Editar</button>
                    <button className="text-gray-900 ml-2 hover:text-red-700">Eliminar</button>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700 relative">
                    <button
                      onClick={() => togglePanel(file.id)}
                      className="text-gray-500 hover:text-gray-700 "
                    >
                      {/* Administrar permisos */}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128c.332-.183.582-.495.644-.869l.214-1.28Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    </button>
                    {openPanel === file.id && (
                      <PermissionPanel
                        fileId={file.id}
                    
                        closePanel={() => setOpenPanel(null)}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
