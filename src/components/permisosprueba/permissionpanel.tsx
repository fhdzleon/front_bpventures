'use client';
import { useState, useEffect } from 'react';

//  estado global simulado para permisos PORQUE NECESITO DONDE GUARDAR
let simulatedPermissionsData = [


  { userId: 2, fileId: 1, permissionTypes: [''] },
];

interface PermissionPanelProps {
  fileId: number;
  users: { id: number, name: string }[];
  closePanel: () => void;
}

export default function PermissionPanel({ fileId, users, closePanel }: PermissionPanelProps) {
  const [userPermissions, setUserPermissions] = useState<{ [key: number]: string[] }>({});
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [newUserId, setNewUserId] = useState<number | null>(null);

  useEffect(() => {
    const permissions = simulatedPermissionsData.filter(permission => permission.fileId === fileId);
    const permissionsMap = permissions.reduce<{ [key: number]: string[] }>((acc, curr) => {
      acc[curr.userId] = curr.permissionTypes;
      return acc;
    }, {});
    setUserPermissions(permissionsMap);
  }, [fileId]);
  // useEffect(() => {
  //   const permissionsMap = simulatedPermissionsData.reduce<{ [key: number]: string[] }>((acc, curr) => {
  //     acc[curr.userId] = curr.permissionTypes;
  //     return acc;
  //   }, {});
  //   setUserPermissions(permissionsMap);
  // }, []); 
  

  const handlePermissionChange = (userId: number, permission: string) => {
    setUserPermissions(prevPermissions => {
      const userPerms = prevPermissions[userId] || [];
      if (userPerms.includes(permission)) {
        return {
          ...prevPermissions,
          [userId]: userPerms.filter(perm => perm !== permission)
        };
      } else {
        return {
          ...prevPermissions,
          [userId]: [...userPerms, permission]
        };
      }
    });
  };

  const savePermissions = () => {
 
    const updatedPermissions = Object.entries(userPermissions).map(([userId, permissionTypes]) => ({
      userId: parseInt(userId),
      fileId,
      permissionTypes
    }));


    simulatedPermissionsData = simulatedPermissionsData.filter(p => p.fileId !== fileId);


    simulatedPermissionsData.push(...updatedPermissions);

    alert(`Permisos actualizados para el archivo ${fileId}`);
    closePanel();
  };
  // const savePermissions = () => {
  //   const updatedPermissions = Object.entries(userPermissions).map(([userId, permissionTypes]) => ({
  //     userId: parseInt(userId),
  //     permissionTypes,
  //   }));
  
  //   simulatedPermissionsData = updatedPermissions;
  
  //   alert('Permisos actualizados para el archivo actual');
  //   closePanel();
  // };
  
  const handleAddUser = () => {
    if (newUserId !== null) {
      setUserPermissions(prevPermissions => ({
        ...prevPermissions,
        [newUserId]: []  
      }));
      setNewUserId(null);
    }
  };

  const filteredUser = users.find(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="absolute top-0 left-0 bottom-0  z-10 transform -translate-x-full">
      <div className="w-96 rounded-md m-2  bg-white p-4 shadow-lg border border-gray-300">
        <div className="flex justify-end items-center mb-4">
  
          <button onClick={closePanel} className="text-white text-right bg-secundary rounded-md hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-6">
          <h4 className="text-md font-futura font-bold mb-2">Asignar Permisos a Nuevos Usuarios</h4>
          <input
            type="text"
            placeholder="Buscar usuario..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded w-full"
          />
          {filteredUser ? (
            <div className="mt-2 flex items-center mb-2">
              <span className="mr-2">{filteredUser.name}</span>
              <button
                onClick={() => setNewUserId(filteredUser.id)}
                className="ml-4 bg-emerald-500 text-white px-2 py-1 rounded"
              >
                Agregar
              </button>
            </div>
          ) : searchQuery ? (
            <p className="text-gray-500">No se encontraron usuarios.</p>
          ) : null}
        </div>

        {newUserId !== null && (
          <div className="mb-6">
            <h4 className="text-md font-semibold mb-2">Permisos para {users.find(user => user.id === newUserId)?.name}</h4>
            {['view', 'edit', 'delete','share Link'].map((perm) => (
              <label key={perm} className="ml-2">
                <input
                  type="checkbox"
                  checked={userPermissions[newUserId]?.includes(perm) || false}
                  onChange={() => handlePermissionChange(newUserId, perm)}
                />
                {perm}
              </label>
            ))}
          </div>
        )}

        <div className="mb-6  ">
          <h4 className="text-md font-semibold mb-2">Permisos Actuales</h4>
          {Object.entries(userPermissions).map(([userId, permissions]) => (
            <div key={userId} className="flex items-center mb-2">
              <span className="mr-2">{users.find(user => user.id === parseInt(userId))?.name}</span>
              {['view', 'edit', 'delete', 'share Link'].map((perm) => (
                <label key={perm} className="ml-2">
                  <input
                    type="checkbox"
                    checked={permissions.includes(perm)}
                    onChange={() => handlePermissionChange(parseInt(userId), perm)}
                  />
                  {perm}
                </label>
              ))}
            </div>
          ))}
        </div>

        <button
          onClick={savePermissions}
          className="bg-secundary font-futura text-white px-4 py-2 rounded"
        >
          Guardar
        </button>
      </div>
    </div>
  );
}
