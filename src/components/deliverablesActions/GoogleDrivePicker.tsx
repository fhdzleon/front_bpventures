import useDrivePicker from 'react-google-drive-picker';
import Cookies from 'js-cookie';

function GoogleDrivePicker() {
  const [openPicker] = useDrivePicker();
  const Token = Cookies.get("token");
  const handleOpenPicker = () => {
    openPicker({
      clientId: `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`,
      developerKey: `${process.env.NEXT_PUBLIC_GOOGLE_DRIVE_TOKEN}`,
      viewId: 'DOCS',
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: false,
      callbackFunction: async (data) => {
        if (data.action === 'picked' && data.docs && data.docs.length > 0) {
          const fileId = data.docs[0].id; // El ID del archivo de Google Drive
          console.log('Archivo seleccionado:', fileId);
          const fileName = data.docs[0].name;
          console.log('Nombre del archivo:', fileName);
          

          
          try {
            // Enviar el ID del archivo al backend para que lo descargue
            const response = await fetch('http://localhost:3000/deliverables/uploadGoogleFile', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${Token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ deliverableId: fileId, fileName:fileName }),
            });
            
            if (!response.ok) {
              throw new Error('Error enviando el ID del archivo al backend.');
            }

            console.log('Archivo enviado al backend para guardar.');
          } catch (error) {
            console.error('Error enviando el archivo al backend:', error);
          }
        }
      },
    });
  };

  return (
    <div>
      <button className="font-sans bg-google p-2 rounded text-white mb-2" onClick={handleOpenPicker}>
        Importar Desde Google Drive
      </button>
    </div>
  );
}

export default GoogleDrivePicker;
