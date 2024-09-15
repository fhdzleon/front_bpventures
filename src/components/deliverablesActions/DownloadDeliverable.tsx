import React from "react";
import DownloadDeliverableProps from "@/interfaces/downLoadProps";
import Cookies from "js-cookie";

const DownloadDeliverable: React.FC<DownloadDeliverableProps> = ({
  deliverableId,
}) => {
  const token = Cookies.get("token");

  const extractFileName = (contentDisposition: string | null): string => {
    if (contentDisposition) {
      const fileNameMatch = contentDisposition.split("filename=")[1];
      return fileNameMatch ? fileNameMatch.replace(/"/g, "") : "file.pdf";
    }

    return "file.pdf";
  };
  console.log(extractFileName);

  const handleDownload = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/deliverables/download/${deliverableId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch deliverable details");
      }

      const contentDisposition = response.headers.get("Content-Disposition");
      const fileName = extractFileName(contentDisposition);

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
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
      <title>Descargar</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
      />
    </svg>
  );
};

export default DownloadDeliverable;
