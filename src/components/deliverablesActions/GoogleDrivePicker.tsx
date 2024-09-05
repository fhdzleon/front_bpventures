import  { useEffect } from 'react';
import useDrivePicker from 'react-google-drive-picker'


function GoogleDrivePicker() {
  const [openPicker, authResponse] = useDrivePicker();  
  // const customViewsArray = [new google.picker.DocsView()]; // custom view
  
  const handleOpenPicker = () => {
    openPicker({
      clientId: `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`,
      developerKey: `${process.env.NEXT_PUBLIC_GOOGLE_DRIVE_TOKEN}`,
      viewId: "DOCS",
      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
      callbackFunction: (data) => {
        if (data.action === 'cancel') {
          console.log('User clicked cancel/close button')
        }
        console.log(data)
      },
    })
  }


  
  return (
    <div>
        <button className='font-sans bg-google p-2 rounded text-white mb-2' onClick={() => handleOpenPicker()}> Importar Desde Google Drive</button>
    </div>
  );
}

export default GoogleDrivePicker;