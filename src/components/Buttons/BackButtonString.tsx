"use client";
import { useRouter } from 'next/navigation';

const BackButtonString = ({ hrefString }: { hrefString: string }) => {
  const router = useRouter();

  const handleBackClick = () => {
    // Redirige a una URL estática en lugar de usar el historial
    router.push(hrefString);
  };

  return (
    <button
      onClick={handleBackClick}
      className="bg-[#2B4168] text-white py-2 px-4 rounded-full shadow-md hover:bg-[#4a9c80] transition duration-300 flex items-center"
    >
      Volver
    </button>
  );
};

export default BackButtonString;
