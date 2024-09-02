export const filesData = [
    { id: 1, name: "documento1.pdf", type: "PDF", creationDate: "2024-08-01", autor: "dgb" },
    { id: 2, name: "imagen1.jpg", type: "Imagen", creationDate: "2024-08-02", autor: "df" },
    { id: 3, name: "presentacion.pptx", type: "Presentación", creationDate: "2024-08-03", autor: "dgb" },
  ];
  
  export const usersData = [
    { id: 1, name: "Juan Pérez" },
    { id: 2, name: "Ana Gómez" },
    { id: 2, name: "Carlos Rodríguez" },
  ];
  
  export const permissionsData = [
    { userId: 101, fileId: 1, permissionTypes: ["view", "edit"] },
    { userId: 102, fileId: 1, permissionTypes: ["view", "edit", "delete"] }
  ];
  
