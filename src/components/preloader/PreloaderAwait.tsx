import React from "react";

const PreloaderAwait: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <img
        src="https://i.postimg.cc/BZ5YWZCk/bpventures-logo.png"
        alt="Cargando..."
        className="animate-pulse"  // Ajusta el tamaño según sea necesario
      />
    </div>
  );
};

export default PreloaderAwait;
