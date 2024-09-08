import React, { useState, useEffect } from "react";

const PreloaderLoad: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Simula el onload del sitio
  useEffect(() => {
    const handlePageLoad = () => {
      setLoading(false); // Oculta el preloader una vez que la página ha cargado
    };

    // Detecta si la página ya está completamente cargada
    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      window.addEventListener("load", handlePageLoad);
    }

    // Limpia el listener
    return () => window.removeEventListener("load", handlePageLoad);
  }, []);

  if (!loading) return null; // No renderiza el preloader si la página ha cargado

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <img
        src="https://i.postimg.cc/BZ5YWZCk/bpventures-logo.png"
        alt="Cargando..."
        className="animate-pulse"
      />
    </div>
  );
};

export default PreloaderLoad;
