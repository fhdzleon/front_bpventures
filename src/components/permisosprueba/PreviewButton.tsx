import { useState } from "react";

// export const PreviewViewDeliverable = () => {
//   const [openPanel, setOpenPanel] = useState<number | null>(null);
//   const [previewData, setPreviewData] = useState(null);

//   const togglePanelpreview = (fileId: number | null) => {
//     setOpenPanel(openPanel === fileId ? null : fileId);
//   };

//   const fetchPreview = async (fileId: number) => {
//     try {
//       const response = await fetch(`https://api.1rodemayo.com/deliverables/preview/${fileId}`);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       if (data === null) {
//         console.warn('Received null data');
//       }
//       setPreviewData(data);
//       togglePanelpreview(fileId);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
  
//   console.log(previewData, "preview");

//   return (
//     <div>  
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke-width="1.5"
//         stroke="currentColor"
//         className="w-6 h-6 mx-auto hover:text-acent"
//         onClick={() => fetchPreview(1)}  //ejemplo nomas
//       >
//         <path
//           stroke-linecap="round"
//           stroke-linejoin="round"
//           d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
//         />
//       </svg>
      
//       {openPanel !== null && previewData && (
//         <div className="preview-panel">
//           <h3>Vista previa del archivo {openPanel}</h3>
//           <pre>{JSON.stringify(previewData, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };
// import React, { useState, useEffect } from 'react';


const PreviewViewDeliverable = ({ fileId }) => {
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const response = await fetch('https://api.1rodemayo.com/deliverables/files/preview/${fileId}');
        setPreviewUrl(response.data);
      } catch (error) {
        console.error('Error fetching file preview:', error);
      }
    };

    fetchPreview();
  }, [fileId]);

  return (
    <div>
      {previewUrl ? (
        <iframe src={previewUrl} width="600" height="400" title="File Preview"></iframe>
      ) : (
        <p>Loading preview...</p>
      )}
    </div>
  );
};

export default FilePreview;

  