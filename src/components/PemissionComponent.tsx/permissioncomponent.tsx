


// Interface Permissions = {
//     userId:number, // o el tipo adecuado si no es string
//     deliverableId: string, // o el tipo adecuado si no es string
//     permissionTypes: string[], // Podrías usar un tipo literal si los tipos de permiso son limitados
// };
'use client';

import React, { useState, useContext, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';


type Permission = {
    userId: string;
    deliverableId: number;
    permissionTypes: string[];
};

interface PermissionManagerProps {
    deliverableId: number;
}

const PermissionManager: React.FC<PermissionManagerProps> = ({ deliverableId }) => {
    const { allUsers } = useAuth();
    const { deliverableData, setDeliverableData } = useAuth();
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Simulación de carga de datos si es necesario
    useEffect(() => {
        // Aquí puedes cargar deliverableData si no se ha cargado ya
    }, [setDeliverableData]);

    const handleCheckboxChange = (userId: string, permissionType: string) => {
        setPermissions(prevPermissions => {
            const userPermissionIndex = prevPermissions.findIndex(
                perm => perm.userId === userId && perm.deliverableId === deliverableId
            );

            if (userPermissionIndex > -1) {
                const updatedPermissionTypes = [...prevPermissions[userPermissionIndex].permissionTypes];

                const permissionTypeIndex = updatedPermissionTypes.indexOf(permissionType);

                if (permissionTypeIndex > -1) {
                    updatedPermissionTypes.splice(permissionTypeIndex, 1);
                } else {
                    updatedPermissionTypes.push(permissionType);
                }

                const updatedPermissions = [...prevPermissions];
                updatedPermissions[userPermissionIndex] = {
                    ...updatedPermissions[userPermissionIndex],
                    permissionTypes: updatedPermissionTypes
                };

                return updatedPermissions;
            } else {
                return [
                    ...prevPermissions,
                    {
                        userId,
                        deliverableId,
                        permissionTypes: [permissionType],
                    },
                ];
            }
        });
    };

    const handleSavePermissions = () => {
        console.log("Permisos guardados:", permissions);
        // Aquí puedes añadir lógica para guardar los permisos, por ejemplo, hacer una llamada a una API.
    };

    const filteredUsers = allUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* Sección de búsqueda de usuarios */}
            <div>
                <input
                    type="text"
                    placeholder="Buscar usuario..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {/* Listado de usuarios con checkboxes para asignar permisos */}
            <div>
                {filteredUsers.map(user => (
                    <div key={user.id}>
                        <span>{user.name}</span>
                        <label>
                            <input
                                type="checkbox"
                                checked={
                                    permissions.find(
                                        perm => perm.userId === user.id &&
                                        perm.permissionTypes.includes('view')
                                    ) !== undefined
                                }
                                onChange={() => handleCheckboxChange(user.id, 'view')}
                            />
                            Ver
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={
                                    permissions.find(
                                        perm => perm.userId === user.id &&
                                        perm.permissionTypes.includes('edit')
                                    ) !== undefined
                                }
                                onChange={() => handleCheckboxChange(user.id, 'edit')}
                            />
                            Editar
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={
                                    permissions.find(
                                        perm => perm.userId === user.id &&
                                        perm.permissionTypes.includes('delete')
                                    ) !== undefined
                                }
                                onChange={() => handleCheckboxChange(user.id, 'delete')}
                            />
                            Eliminar
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={
                                    permissions.find(
                                        perm => perm.userId === user.id &&
                                        perm.permissionTypes.includes('share')
                                    ) !== undefined
                                }
                                onChange={() => handleCheckboxChange(user.id, 'share')}
                            />
                            Compartir
                        </label>
                    </div>
                ))}
            </div>

            {/* Botón para guardar los permisos */}
            <button onClick={handleSavePermissions}>Guardar</button>

            {/* Sección de usuarios con permisos asignados */}
            <div>
                <h3>Usuarios con permisos asignados</h3>
                {permissions.map(permission => (
                    <div key={permission.userId}>
                        <span>{allUsers.find(user => user.id === permission.userId)?.name}</span>
                        <span>{permission.permissionTypes.join(', ')}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PermissionManager;
