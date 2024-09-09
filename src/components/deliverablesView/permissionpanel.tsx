"use client";
import { useState, useEffect } from "react";
import { AuthContextType, useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";
import Select from "react-select";

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

interface User {
  id: number;
  email: string;
  password: string;
  Names: string;
  LastName: string;
  Position: string;
  empresa: string | null;
  cuit: string | null;
  domicilio: string | null;
  verifiedEmail: boolean;
  mfaEnabled: boolean;
  mfaBackupCodes: string;
  mfaSecret: string;
  mfaVerified: boolean | null;
  createdAt: string; // Puede ser Date si prefieres
  modifiedAt: string; // Puede ser Date si prefieres
  statusId: number;
  isAdmin: boolean;
}

interface Company {
  id: number;
  name: string;
  address: string;
  cuit: string;
  users: User[];
}

export default function PermissionPanel({
  fileId,
  closePanel,
}: PermissionPanelProps) {
  const [userPermissions, setUserPermissions] = useState<Permission[]>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [newUserId, setNewUserId] = useState<number | null>(null);
  const [agrupedPermissions, setAgrupedPermissions] = useState<any[]>([]);
  const { allUsers,userData }: AuthContextType = useAuth();
  const [Companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState(null); 
  const [selectedUser, setSelectedUser] = useState<any>(null);
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
        const companies = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        
        const companiesData = await companies.json();
        const permissionsData = await permissions.json();
        
        console.log(permissionsData);
        setCompanies(companiesData);
        setUserPermissions(permissionsData);
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
    setNewUserId(userId);
    setAgrupedPermissions((prevPermissions) => {
      const userIndex = prevPermissions.findIndex((p) => p.userId === userId);

      if (userIndex !== -1) {
        const updatedUserPermissions = { ...prevPermissions[userIndex] };
        const hasPermission =
          updatedUserPermissions.permissionTypes.includes(permission);

        if (hasPermission) {
          updatedUserPermissions.permissionTypes =
            updatedUserPermissions.permissionTypes.filter(
              (perm: string) => perm !== permission
            );
        } else {
          updatedUserPermissions.permissionTypes = [
            ...updatedUserPermissions.permissionTypes,
            permission,
          ];
        }

        const updatedPermissions = [
          ...prevPermissions.slice(0, userIndex),
          updatedUserPermissions,
          ...prevPermissions.slice(userIndex + 1),
        ];

        return updatedPermissions;
      } else {
        return [...prevPermissions, { userId, permissionTypes: [permission] }];
      }
    });
  };

  const savePermissions = async () => {
    try {
      const permissionTypes = [
        { id: 1, name: "owner" },
        { id: 2, name: "view" },
        { id: 3, name: "edit" },
      ];

      const transformPermissions = (permissions: any[]): any[] => {
        const permissionTypeMap = new Map(
          permissionTypes.map((pt) => [pt.name, pt.id])
        );

        const transformedPermissions = permissions.flatMap((permission) =>
          permission.permissionTypes.map((typeName: string) => ({
            userId: permission.userId,
            permissionTypeId: permissionTypeMap.get(typeName) ?? -1,
          }))
        );

        return transformedPermissions;
      };

      const permisosUpdated = transformPermissions(agrupedPermissions);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/deliverables/permision/${fileId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(permisosUpdated),
        }
      );

      if (!response.ok) {
        throw new Error("Error al guardar permisos");
      }

      Swal.fire({
        title: "Permiso Guardado!",
        text: "Permiso guardado para el archivo " + fileId,
        icon: "success",
        confirmButtonColor: "#2b4168",
      });
    } catch (error) {
      console.error("Hubo un problema con la petición", error);
      Swal.fire("Error", "Hubo un problema al guardar el permiso.", "error");
    }

    closePanel();
  };

  const filteredUser = allUsers?.find(
    (user) =>
      user.isAdmin !== true &&
      user.Names.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const userHandler = async (e: any) => {
    const userId = e.value;
    const user = allUsers?.find((user) => user.id === userId);
    setSelectedUser(user);
  };

  const handleCompany=  (event: any) => {
    const companyId = event.value;
    setSelectedCompany(companyId);
  };
  const empresa = Companies.find((company) =>
    company.users.some((user:User) => user.id === userData?.id)
  );
  
  const isAdmin = userData?.isAdmin;
  return (
    <div className="absolute top-0  left-0 md:-left-10 bottom-0 z-10 transform -translate-x-full">
      <div className="w-[300px] md:w-[500px] rounded-md m-2 bg-white p-4 shadow-lg border border-gray-300">
        <div className="flex justify-end items-center mb-4">
          <button
            onClick={closePanel}
            className="text-white text-right bg-secundary rounded-md hover:text-secundary hover:bg-white border border-secundary "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <h4 className="text-md font-futura font-bold mb-2">
            Asignar Permisos a Nuevos Usuarios
          </h4>
          
          {isAdmin ? (
      <>
      <div className="flex flex-row gap-3 justify-center w-full">

        <Select
          placeholder="Seleccione una empresa"
          className="w-full"
          id="companies"
          options={Companies.map((company) => ({
            key: company.id,
            value: company.id,
            label: company.name,
          })).sort((a, b) =>
            a.label
              .toString()
              .toLowerCase()
              .localeCompare(b.label.toString().toLowerCase())
          )}
          onChange={handleCompany}
        />

        {selectedCompany && Companies  && (
          <Select
          className="w-full"
            id="users"
            placeholder="Seleccione un usuario"
            options={Companies?.find((company) => company.id === selectedCompany)
              .users
              .filter((user) => !user.isAdmin)
              .map((user) => ({
                key: user.id,
                value: user.id,
                label: user.Names,
              }))
              .sort((a, b) =>
                a.label
                  .toString()
                  .toLowerCase()
                  .localeCompare(b.label.toString().toLowerCase())
              )}
            onChange={userHandler}
          />
        )}
      </div>
      </>
    ) : (
      <>
      <div className="flex flex-row justify-center w-full gap-3">

       <Select
       className="w-full"
      id="companies"
      value={empresa ? { key: empresa.id, value: empresa.id, label: empresa.name } : undefined} // Establecer el valor seleccionado
      isDisabled={true} // Deshabilitado para clientes
    />
      
      <Select
        className="w-full"
        placeholder="Seleccione un usuario"
        id="users"
        options={Companies.flatMap((company) =>
          company.users.filter((user) => !user.isAdmin).map((user) => ({
            key: user.id,
            value: user.id,
            label: user.Names,
          }))
        ).sort((a, b) =>
          a.label
            .toString()
            .toLowerCase()
            .localeCompare(b.label.toString().toLowerCase())
        )}
        onChange={userHandler}
      />
      </div>
      </>
      
      // Selector de usuarios directamente para clientes
    )}

          {selectedUser ? (
            <div className="mt-2 flex items-center mb-2">
              <span className="mr-2">{selectedUser.Names}</span>
              <button
                onClick={() => handlePermissionChange(selectedUser.id, "view")}
                className="ml-4 bg-emerald-500 text-white px-2 py-1 rounded"
              >
                Agregar
              </button>
            </div>
          ) : searchQuery ? (
            <p className="text-gray-500">No se encontraron usuarios.</p>
          ) : null}
        </div>
      
        {
          <div className="mb-6 ">
            <h4 className="text-md font-semibold mb-2 ">Permisos Actuales</h4>
            <table className="w-full border  border-gray-300">
              <thead>
                <tr className="bg-secundary">
                  <th className="border text-white border-gray-300 p-2">
                    Usuario
                  </th>
                  <th className="border text-white border-gray-300 p-2">Ver</th>
                  <th className="border text-white border-gray-300 p-2">
                    Editar
                  </th>
                </tr>
              </thead>
              <tbody>
                {agrupedPermissions
                  .filter((permission) => {
                    const user = allUsers.find(
                      (user) => user.id === permission.userId
                    );
                    // Filtrar si el usuario no es el actual y no es administrador
                    return user && !user.isAdmin;
                  })
                  .map((permission, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">
                        {
                          allUsers.find((user) => user.id === permission.userId)
                            ?.Names
                        }
                      </td>
                      {["view", "edit"].map((perm) => (
                        <td
                          key={perm}
                          className="border border-gray-300 p-2 text-center"
                        >
                          <input
                            type="checkbox"
                            checked={permission.permissionTypes.includes(perm)}
                            onChange={() =>
                              handlePermissionChange(permission.userId, perm)
                            }
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        }
        <button
          onClick={savePermissions}
          className="bg-secundary text-white px-4 py-2 rounded"
        >
          Guardar
        </button>
      </div>
    </div>
  );
}
