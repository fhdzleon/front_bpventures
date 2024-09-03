// import { useEffect, useState } from "react";

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
import React, { useState, useEffect } from 'react';


interface PreviewViewDeliverableProps {
  fileId: string;
}
const PreviewViewDeliverable: React.FC<PreviewViewDeliverableProps> = ({ fileId }) => {
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const response = await fetch(`https://api.1rodemayo.com/deliverables/files/preview/${fileId}`);
        const data = await response.json(); // Asume que la respuesta es JSON
        setPreviewUrl(data.url); // Cambia 'data.url' según la estructura de la respuesta
      } catch (error) {
        console.error('Error fetching file preview:', error);
      }
    };

    fetchPreview();
  }, [fileId]);

  return (
    <div>
      {previewUrl ? (
         <iframe src={'https://docs.google.com/spreadsheets/d/1tn7ecE62TUf3PmmOWhEj_hS2HnzpvtYbwi1Deoxi5yw/edit?usp=drivesdk'} width="600" height="400" title="File Preview"></iframe>
      ) : (
        <p>Loading preview...</p>
      )}
    </div>
  );
};

export default PreviewViewDeliverable;

  // components/GoogleDriveFileList.tsx


// const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
// const API_KEY = 'YOUR_GOOGLE_API_KEY';
// const SCOPE = 'https://www.googleapis.com/auth/drive.readonly';
// const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];

// const PreviewViewDeliverable : React.FC = () => {
//   const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
//   const [files, setFiles] = useState<Array<{ id: string; name: string }>>([]);

//   useEffect(() => {
//     const initClient = () => {
//       window.gapi.client.init({
//         apiKey: API_KEY,
//         clientId: CLIENT_ID,
//         discoveryDocs: DISCOVERY_DOCS,
//         scope: SCOPE,
//       }).then(() => {
//         const authInstance = window.gapi.auth2.getAuthInstance();
//         setIsSignedIn(authInstance.isSignedIn.get());
//         authInstance.isSignedIn.listen(setIsSignedIn);
//       });
//     };

//     window.gapi.load('client:auth2', initClient);
//   }, []);

//   const handleSignIn = () => {
//     window.gapi.auth2.getAuthInstance().signIn();
//   };

//   const handleSignOut = () => {
//     window.gapi.auth2.getAuthInstance().signOut();
//   };

//   const listFiles = () => {
//     window.gapi.client.drive.files.list({
//       pageSize: 10,
//       fields: 'files(id, name)',
//     }).then((response: any) => {
//       setFiles(response.result.files);
//     });
//   };

//   useEffect(() => {
//     if (isSignedIn) {
//       listFiles();
//     }
//   }, [isSignedIn]);

//   return (
//     <div>
//       <h2>Google Drive Files</h2>
//       {!isSignedIn ? (
//         <button onClick={handleSignIn}>Sign In</button>
//       ) : (
//         <button onClick={handleSignOut}>Sign Out</button>
//       )}
//       <ul>
//         {files.map(file => (
//           <li key={file.id}>{file.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default PreviewViewDeliverable;
