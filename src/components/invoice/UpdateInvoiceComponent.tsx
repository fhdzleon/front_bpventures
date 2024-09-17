"use client";
import React, { useState, useEffect } from "react";
import "../../styles/form-style.css";
import Button from "../FormComponent/Button";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';

const invoiceStatuses = [
  { id: 1, name: "Pendiente" },
  { id: 2, name: "Revisar" },
  { id: 3, name: "Pagada" },
  { id: 4, name: "Anulada" },
];

const UpdateInvoiceComponent: React.FC<{ invoiceId: number }> = ({ invoiceId }) => {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [invoiceStatusId, setInvoiceStatusId] = useState(invoiceStatuses[0].id);
  const [companyId, setCompanyId] = useState<number>();
  const [companies, setCompanies] = useState<Array<{ id: number; name: string }>>([]);
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [pathFile, setPathFile] = useState("path/to/invoice2.pdf");

  const router = useRouter();

  // Fetch invoice data
  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoices/getbyid/${invoiceId}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setInvoiceNumber(data.number);
          setIssueDate(data.issueDate);
          setDueDate(data.dueDate);
          setAmount(data.amount);
          setInvoiceStatusId(data.invoiceStatus.id);
          setCompanyId(data.company.id); // Set the company associated with the invoice
          setPathFile(data.path);
          setLoading(false);
        } else {
          throw new Error("Error al obtener los datos de la factura");
        }
      } catch (error: any) {
        console.error("Error al obtener la factura", error);
        setErrorMessage("Error al obtener los datos de la factura");
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [invoiceId]);

  // Fetch companies data
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies`);
        if (response.ok) {
          const data = await response.json();
          setCompanies(data);
        } else {
          throw new Error("Error al obtener las empresas");
        }
      } catch (error: any) {
        console.error("Error al obtener las empresas", error);
      }
    };

    fetchCompanies();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("invoiceNumber", invoiceNumber);
    formData.append("issueDate", issueDate);
    formData.append("dueDate", dueDate);
    formData.append("amount", amount.toString());
    formData.append("invoiceStatusId", invoiceStatusId.toString());
    if (companyId) {
      formData.append("companyId", companyId.toString());
    }
    if (file) {
      formData.append("file", file);
    }
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoices/${invoiceId}`, {
        method: "PATCH",
        body: formData,
      });
  
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Factura actualizada correctamente',
          confirmButtonColor: "#2b4168",
        });
        // router.push('/invoices'); // Redirigir a la página de facturas después de la actualización
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorData.message || 'Error al actualizar la factura',
          confirmButtonColor: "#2b4168",
        });
      }
    } catch (error: any) {
      console.error("Error al actualizar la factura", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al actualizar la factura. Inténtalo de nuevo.',
        confirmButtonColor: "#2b4168",
      });
    }
  };
  

    // Check if the file is a PDF or an image
    const isImage = (filePath: string) => {
      return /\.(jpg|jpeg|png|gif|bmp)$/i.test(filePath);
    };
  
    const isPDF = (filePath: string) => {
      return /\.pdf$/i.test(filePath);
    };

    const fullPathFile = `${process.env.NEXT_PUBLIC_API_URL}/${pathFile}`;


    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        {/* <pre>{JSON.stringify({  companyId }, null, 2)}</pre> */}
        <form className="form-apply" onSubmit={handleSubmit}>
          <h1 className="text-center text-[1.2rem] mb-6">Actualizar Factura</h1>
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <>
              {/* Número de Factura */}
              <div className="mb-4">
                <label className="label-apply">Número de Factura:</label>
                <input
                  type="text"
                  id="numeroFactura"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="input-apply"
                  required
                />
                {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
              </div>
    
              {/* Fecha de Emisión */}
              <div className="mb-4">
                <label className="label-apply">Fecha de Emisión:</label>
                <input
                  type="date"
                  id="fechaEmision"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="input-apply"
                  required
                />
              </div>
    
              {/* Fecha de Vencimiento */}
              <div className="mb-4">
                <label className="label-apply">Fecha de Vencimiento:</label>
                <input
                  type="date"
                  id="fechaVencimiento"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="input-apply"
                  required
                />
              </div>
    
              {/* Monto */}
              <div className="mb-4">
                <label className="label-apply">Monto:</label>
                <input
                  type="number"
                  id="monto"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
                  className="input-apply"
                  required
                />
              </div>
    
              {/* Estado de la Factura */}
              <div className="mb-4">
                <label className="label-apply">Estado de la Factura:</label>
                <select
                  id="estadoFactura"
                  value={invoiceStatusId}
                  onChange={(e) => setInvoiceStatusId(parseInt(e.target.value))}
                  className="input-apply"
                  required
                >
                  {invoiceStatuses.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
    
              {/* Empresa */}
              <div className="mb-4">
                <label className="label-apply">Empresa:</label>
                <select
                  id="empresa"
                  value={companyId}
                  onChange={(e) => setCompanyId(parseInt(e.target.value))}
                  className="input-apply"
                  required
                >
                  <option value="">Seleccione una empresa</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
    
              {/* Vista Previa del Archivo */}
              <div className="mb-4">
                <label className="label-apply">Vista Previa del Archivo:</label>
                {pathFile && (
                  <div className="file-preview">
                    {isImage(pathFile) ? (
                      <img src={fullPathFile} alt="Factura" className="max-w-full h-auto" />
                    ) : isPDF(fullPathFile) ? (
                      <iframe src={fullPathFile} width="100%" height="500px" title="Factura PDF"></iframe>
                    ) : (
                      <a href={fullPathFile} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                        Ver archivo
                      </a>
                    )}
                  </div>
                )}
              </div>
    
              {/* Cargar Factura */}
              <div className="mb-4">
                <label className="label-apply">Cargar Nueva Factura:</label>
                <input
                  type="file"
                  id="cargadeFactura"
                  onChange={handleFileChange}
                  accept=".pdf,image/*"
                  className="input-apply"
                />
              </div>
    
              {/* Botón para guardar cambios */}
              <Button type="submit">Guardar Cambios</Button>
            </>
          )}
        </form>
      </div>
    );
    
};

export default UpdateInvoiceComponent;
