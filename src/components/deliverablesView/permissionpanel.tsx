"use client";
import { useState, useEffect } from "react";
import { AuthContextType, useAuth } from "@/context/AuthContext";
//  estado global simulado para permisos PORQUE NECESITO DONDE GUARDAR
// let simulatedPermissionsData = [
//   { userId: 2, fileId: 1, permissionTypes: [''] },
// ];

interface permissionTypes {
  id: number;
  name: string;
}

interface Permission {
  userId: number;
  permissionType: permissionTypes;
}

interface PermissionPanelProps {
  fileId: number;
  closePanel: () => void;
}

export default function PermissionPanel({
  fileId,
  closePanel,
}: PermissionPanelProps) {
  const [userPermissions, setUserPermissions] = useState<Permission[]>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [newUserId, setNewUserId] = useState<number | null>(null);
  const [agrupedPermissions, setAgrupedPermissions] = useState<any[]>([]);
  const { allUsers }: AuthContextType = useAuth();
  useEffect(() => {
    const permissionsMap = async () => {
      try {
        const permissions = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/deliverables/permision/${fileId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const permissionsData = await permissions.json();

        console.log(permissionsData);
        setUserPermissions(permissionsData);
        // return permissionsData;
      } catch (error) {
        console.log(error);
      }
    };
    permissionsMap();
  }, [fileId]);

  useEffect(() => {
    if (userPermissions?.length === 0) return;

    const groupedPermissions = userPermissions?.reduce((acc, cur) => {
      const { userId, permissionType } = cur;

      if (!acc[userId]) {
        acc[userId] = { userId, permissionTypes: [] };
      }

      acc[userId].permissionTypes.push(permissionType?.name);

      return acc;
    }, {} as { [key: number]: { userId: number; permissionTypes: string[] } });

    if (groupedPermissions === undefined) return;
    const groupedPermissionsArray = Object.values(groupedPermissions);

    setAgrupedPermissions(groupedPermissionsArray);
  }, [userPermissions]);

  const handlePermissionChange = (userId: number, permission: string) => {
    setAgrupedPermissions(prevPermissions => {
      // Buscar el usuario actual en la lista de permisos
      const userIndex = prevPermissions.findIndex(p => p.userId === userId);
      
      if (userIndex !== -1) {
        // Usuario encontrado, actualizar permisos
        const updatedUserPermissions = { ...prevPermissions[userIndex] };
        const hasPermission = updatedUserPermissions.permissionTypes.includes(permission);
  
        if (hasPermission) {
          updatedUserPermissions.permissionTypes = updatedUserPermissions.permissionTypes.filter((perm: string )=> perm !== permission);
        } else {
          updatedUserPermissions.permissionTypes = [...updatedUserPermissions.permissionTypes, permission];
        }
  
        // Actualizar el array con los permisos modificados
        const updatedPermissions = [
          ...prevPermissions.slice(0, userIndex),
          updatedUserPermissions,
          ...prevPermissions.slice(userIndex + 1)
        ];
  
        return updatedPermissions;
      } else {
        // Usuario no encontrado, agregar nuevo usuario con permisos
        return [
          ...prevPermissions,
          { userId, permissionTypes: [permission] }
        ];
      }
    });
  };
  console.log(agrupedPermissions);

  const savePermissions =async () => {

    try {
      const permissionTypes = [
        // Aquí debes definir o obtener la lista completa de tipos de permisos
        {id:1, name:'owner'},
        { id: 2, name: 'view' },
        { id: 3, name: 'edit' },
        { id: 4, name: 'delete' },
        { id: 5, name: 'share Link' },
      ];
  
      const transformPermissions = (permissions: any[]): any[] => {
        // Crea un mapa de nombres de permisos a IDs
        const permissionTypeMap = new Map(permissionTypes.map(pt => [pt.name, pt.id]));
      
        // Transforma los permisos agrupados en el formato requerido
        const transformedPermissions = permissions.flatMap(permission => 
          permission.permissionTypes.map((typeName: string) => ({
            userId: permission.userId,
            permissionTypeId: permissionTypeMap.get(typeName) ?? -1 // Usa -1 si el tipo no se encuentra
          }))
        );
      
        return transformedPermissions;
      };
      
      // Ejemplo de uso con agrupedPermissions
      const permisosUpdated = transformPermissions(agrupedPermissions);
      console.log(permisosUpdated);
      
      // Envía los datos al servidor
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/deliverables/permision/${fileId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(permisosUpdated),
      });
  
      if (!response.ok) {
        throw new Error('Error al guardar permisos');
      }
  
      
          alert(`Permisos actualizados para el archivo ${fileId}`);
          closePanel();
    } catch (error) {
      console.error('Error al guardar permisos:', error);
      alert('Hubo un error al guardar los permisos');
    }

  };


  


  const filteredUser = allUsers?.find((user) =>
    user.Names.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="absolute top-0 left-0 bottom-0  z-10 transform -translate-x-full">
      <div className="w-96 rounded-md m-2  bg-white p-4 shadow-lg border border-gray-300">
        <div className="flex justify-end items-center mb-4">
          <button
            onClick={closePanel}
            className="text-white text-right bg-secundary rounded-md hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <h4 className="text-md font-futura font-bold mb-2">
            Asignar Permisos a Nuevos Usuarios
          </h4>
          <input
            type="text"
            placeholder="Buscar usuario..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded w-full"
          />
          {filteredUser ? (
            <div className="mt-2 flex items-center mb-2">
              <span className="mr-2">{filteredUser.Names}</span>
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
            <h4 className="text-md font-semibold mb-2">
              Permisos para{" "}
              {allUsers.find((user) => user.id === newUserId)?.Names}
            </h4>
            {["view", "edit", "delete", "share Link"].map((perm) => (
              
              <label key={perm} className="ml-2">
                <input
                  type="checkbox"
                  checked={
                    agrupedPermissions[newUserId]?.includes(perm)
                  }
                  onChange={() => handlePermissionChange(newUserId, perm)}
                />
                {perm}
              </label>
            ))}
          </div>
        )}

        <div className="mb-6  ">
          <h4 className="text-md font-semibold mb-2">Permisos Actuales</h4>
          {agrupedPermissions?.map((permission, index) => (
            <div key={index} className="flex items-center mb-2">
              <span className="mr-2">
                {allUsers.find((user) => user.id === permission.userId)?.Names}
              </span>
              {["view", "edit", "delete", "share Link"].map((perm) => (
                <label key={perm} className="ml-2">
                  <input
                    type="checkbox"
                    checked={permission.permissionTypes.includes(perm)}
                    onChange={() =>
                      handlePermissionChange(permission.userId, perm)
                    }
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
