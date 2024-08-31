


// Interface Permissions = {
//     userId:number, // o el tipo adecuado si no es string
//     deliverableId: string, // o el tipo adecuado si no es string
//     permissionTypes: string[], // Podrías usar un tipo literal si los tipos de permiso son limitados
// };import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, useEffect, useState } from 'react';
import deliverableMock from "@/helpers/deliverableData"

const DeliverableList: React.FC = () => {
    const { deliverableData } = useAuth(); // Obtén los datos del contexto
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Número de elementos por página
    const totalPages = Math.ceil((deliverableData?.length || 0) / itemsPerPage);

    useEffect(() => {
        // Resetear la página actual si los datos cambian
        setCurrentPage(1);
    }, [deliverableData]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev: number) => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev: number) => prev - 1);
        }
    };

    return (
        <div>
           
        
            <div>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>Anterior</button>
                <span>Página {currentPage} de {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Siguiente</button>
            </div>
        </div>
    );
};

export default DeliverableList;
