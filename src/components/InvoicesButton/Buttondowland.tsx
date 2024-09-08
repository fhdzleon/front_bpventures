// import React from "react";

// export interface Invoice {
//   id: number;
//   invoicePath: string | null;
//   invoiceNumber: string;
//   invoiceIssueDate: string;
//   invoiceDueDate: string;
//   invoiceAmount: string;
//   invoiceStatus: string;
//   overdueIndicator: boolean;
// }

// interface InvoiceDetailProps {
//   Invoice: Invoice;
// }

// const InvoiceDownload: React.FC<InvoiceDetailProps> = ({ Invoice }) => {
//   if (!Invoice.invoicePath) {
//     return (
//       <div>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth="1.5"
//           stroke="currentColor"
//           className="w-6 h-6 mx-auto"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M15 13.5H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
//           />
//           <title>Sin Archivo</title>
//         </svg>
//       </div>
//     );
//   }

//   // Construir la URL de descarga con el ID
//   const downloadUrl = `${process.env.NEXT_PUBLIC_API_URL}/deliverables/download/${Invoice.id}`;
//   const fileExtension = Invoice.invoicePath.split('.').pop()?.toLowerCase();
//   const fileName = `${Invoice.invoiceNumber}.${fileExtension}`;

//   // Definir icono según el tipo de archivo
//   let icon = "";
//   if (fileExtension === "pdf") {
//     icon = "Descargar PDF";
//   } else if (fileExtension === "doc" || fileExtension === "docx") {
//     icon = "Descargar Documento Word";
//   } else if (fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "png") {
//     icon = "Descargar Imagen";
//   } else {
//     icon = "Descargar Archivo";
//   }

//   return (
//     <div>
//       <a href={downloadUrl} download={fileName} className="hover:text-acent">
//         <button>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="1.5"
//             stroke="currentColor"
//             className="w-6 h-6 mx-auto"
//           >
//             <title>{icon}</title>
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
//             />
//           </svg>
//         </button>
//       </a>
//     </div>
//   );
// };

// export default InvoiceDownload;
interface InvoiceButtonProps {
  userId: any;        // Agregado para recibir el userId
  invoiceId: any;     // ID de la factura
}

const InvoiceDownload: React.FC<InvoiceButtonProps> = ({ userId, invoiceId }) => {
  const handleDownload = async () => {
    try {
      // Solicitar la información de la factura
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoices/download/${userId}/${invoiceId}`,{
        method: 'GET',
      });

      if (!response.ok) {
          throw new Error('Failed to fetch invoice details');
      }
  
    const contentDisposition = response.headers.get('Content-Disposition');
  
      
    const fileName = contentDisposition
      ? contentDisposition.split('filename=')[1].replace(/"/g, '')
      : 'invoice.pdf'; 
      console.log(fileName);
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName; // Cambia el nombre del archivo si es necesario
      document.body.appendChild(link);
      link.click();
  
      // Limpiar
      link.remove();
      window.URL.revokeObjectURL(url);

  } catch (error) {
      console.error('Error downloading file:', error);
  }
  };

  return (
    <button onClick={handleDownload} className="btn btn-primary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6 mx-auto"
      >
        <title>Descargar</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
        />
      </svg>
    </button>
  );
};

export default InvoiceDownload;

