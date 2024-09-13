"use client";
const BackButton = () => {
  const handleBackClick = () => {
    // Regresa a la página anterior en el historial
    window.history.back();
  };

  return (
    <button onClick={handleBackClick}
     className="bg-[#2B4168] text-white py-2 px-4 rounded-full shadow-md hover:bg-[#4a9c80] transition duration-300 flex items-center">
      Volver
    </button>
  );
};

export default BackButton;
