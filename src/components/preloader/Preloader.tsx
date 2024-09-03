import React from "react";

const Preloader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"
        role="status"
      >
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );
};

export default Preloader;



// components/Preloader.tsx
// import React from "react";

// const Preloader: React.FC = () => {
//   return (
//     <div className="flex items-center justify-center h-full">

//       <div className="flex items-center justify-center w-16 h-16">
//         {/* Reemplaza el SVG con el ícono de tu empresa */}
//         <svg
//           className="w-12 h-12 text-blue-600 animate-spin"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12zm8-6v12m-6-6h12" />
//         </svg>
//         {/* Alternativamente, usa una imagen */}
//         {/* <img src="/path/to/your-logo.svg" alt="Loading" className="w-12 h-12 animate-spin" /> */}
//           <div className=" hidden md:flex">
//         <Image
//           src={"https://i.postimg.cc/htcz7S3y/bp-ventures-color.png"}
//           alt="logo"
//           width={220}
//           height={10}
//         />
//       </div>
//       </div>
//     </div>
//   );
// };

// export default Preloader;


// import Preloader from "../Preloader"; // Importa el preloader
// const [loading, setLoading] = useState<boolean>(true); // Estado de carga

// finally {
//     setLoading(false); // Termina la carga
//   }

//   <div className="col-span-1">
//           {loading ? ( // Mostrar el preloader si está cargando
//             <Preloader />
//           ) : (