import React from "react";
import DownloadDeliverableProps from "@/interfaces/downLoadProps";

const DownloadDeliverable: React.FC<DownloadDeliverableProps> = ({
  id,
  path,
  type,
}) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/deliverables/${id}/${path}.${type}`,

        {
          method: "GET",
          headers: {
            "Content-Type": "application/octet-stream",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al descargar el archivo");
      }

      const blob = await response.blob();
      const urlObject = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = urlObject;
      link.download = `${path}.${type}`;
      link.click();

      URL.revokeObjectURL(urlObject);
    } catch (error) {
      console.error("Error descargando el archivo:", error);
      alert("No se completo la descarga");
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6 mx-auto hover:text-acent cursor-pointer"
      onClick={handleDownload}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
      />
    </svg>
  );
};

export default DownloadDeliverable;
