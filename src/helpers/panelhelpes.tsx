import React, { useState, useEffect } from 'react';
import deliverableData from './deliverableData';

// Definición de interfaces
interface Permission {
  id: number;
  permisos: string[];
}

interface Deliverable {
  id: number;
  archivo: string;
  tipo: string;
  fechaCreacion: string;
  autor: string;
  permisos?: Permission[];
}

interface User {
  id: number;
  nombre: string;
}

interface PermissionsPanelProps {
  deliverableId: number;
  onClose: () => void;
}

const PermissionsPanel: React.FC<PermissionsPanelProps> = ({ deliverableId, onClose }) => {
  const [deliverables, setDeliverables] = useState<Deliverable[]>(deliverableData);
  const [selectedDeliverable, setSelectedDeliverable] = useState<Deliverable | undefined>(undefined);
  const [users, setUsers] = useState<User[]>([]); // Cargar usuarios desde el backend o un JSON
  const [userPermissions, setUserPermissions] = useState<{ [userId: number]: string[] }>({});

  useEffect(() => {
    const deliverable = deliverables.find(d => d.id === deliverableId);
    setSelectedDeliverable(deliverable);

    if (deliverable && deliverable.permisos) {
      const perms = deliverable.permisos.reduce((acc, perm) => {
        acc[perm.id] = perm.permisos;
        return acc;
      }, {} as { [userId: number]: string[] });
      setUserPermissions(perms);
    } else {
      setUserPermissions({});
    }
  }, [deliverableId, deliverables]);

  const handlePermissionChange = (userId: number, permission: string) => {
    setUserPermissions(prev => {
      const newPerms = new Set(prev[userId] || []);
      if (newPerms.has(permission)) {
        newPerms.delete(permission);
      } else {
        newPerms.add(permission);
      }
      return {
        ...prev,
        [userId]: Array.from(newPerms)
      };
    });
  };

  const savePermissions = () => {
    // Actualizar deliverables con los permisos modificados
    const updatedDeliverables = deliverables.map(d => {
      if (d.id === deliverableId) {
        return {
          ...d,
          permisos: Object.keys(userPermissions).map(userId => ({
            id: parseInt(userId),
            permisos: userPermissions[parseInt(userId)]
          }))
        };
      }
      return d;
    });
    setDeliverables(updatedDeliverables);
    onClose(); // Cerrar el panel
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">Asignar Permisos</h2>
        <div className="mb-4">
          <h3 className="text-md font-semibold">Usuarios</h3>
          {users.map(user => (
            <div key={user.id} className="mb-2">
              <h4 className="font-semibold">{user.nombre}</h4>
              {['read', 'edit', 'share', 'delete'].map(perm => (
                <label key={perm} className="block">
                  <input
                    type="checkbox"
                    checked={userPermissions[user.id]?.includes(perm) || false}
                    onChange={() => handlePermissionChange(user.id, perm)}
                  />
                  {perm}
                </label>
              ))}
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button onClick={savePermissions} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Guardar</button>
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default PermissionsPanel;
