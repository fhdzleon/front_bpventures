const InvoiceDownload: React.FC<InvoiceButtonProps> = ({ userId, invoiceId }) => {
  const handleDownload = async () => {
    try {
      // Solicitar la información de la factura
      const response = await fetch(${process.env.NEXT_PUBLIC_API_URL}/invoices/download/${userId}/${invoiceId},{
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
      console.error('Error downloading file:', error);
  }