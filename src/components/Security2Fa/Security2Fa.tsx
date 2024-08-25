"use client";
import { useState } from "react";
import SecurityButton from "../buttonSecurity/ButtonSecurity";

export default function SecuritySettings() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [qrCode, setQrCode] = useState<string | undefined>("");
  const [secret, setSecret] = useState<string | undefined>("");
  const [view, setView] = useState<"qr" | "secret">("qr");

  const handleGenerateQRCode = async () => {
    try {
      const token = getCookie("token");

      if (!token) {
        console.error("Token no encontrado en las cookies");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/enable-mfa`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsInN1YiI6MzEsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsImlhdCI6MTcyNDUzODcxOCwiZXhwIjoxNzI0NjI1MTE4fQ.YNJpZCGIl4dHotRZSMqfVg_5O8G-MkSiY68jj8ERk2o`, // Usar el token obtenido
          },
          body: JSON.stringify({}),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Response Data:", data); 
        setIs2FAEnabled(true);
        setQrCode(data.qrCode || ""); 
        setSecret(data.secret || ""); 
      } else {
        console.error("Error al habilitar 2FA:", response.statusText);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const handleViewChange = (viewType: "qr" | "secret") => {
    setView(viewType);
  };

  return (
    <div className=" max-w-lg p-6 bg-white shadow-lg border border-gray-200 rounded-lg mb-5 mt-6 mx-4">
      <h1 className="text-2xl font-futura mb-4 text-[#2B4168]">
        Configuración de Seguridad
      </h1>
      <div className="mb-6">
        <p className="font-futura text-gray-700 mb-4">
          La autenticación de dos factores (2FA) es una capa adicional de
          seguridad para proteger tu cuenta. Recomendamos habilitarla para
          aumentar la seguridad de tu cuenta. Con 2FA, necesitarás un código de
          autenticación además de tu contraseña.
        </p>
        <p className="font-futura text-gray-700 mb-4">
          En lugar de esperar la llegada de mensajes de texto, obtén códigos de
          verificación desde una app de autenticación. Funciona incluso si el
          teléfono está sin conexión.
        </p>
        <p className="font-futura text-gray-700 mb-4">
          Para configurar 2FA, primero genera un código QR escaneable con una
          aplicación de autenticación y luego, si necesitas el código secreto
          para configuraciones manuales, elige la opción correspondiente.
        </p>
        {is2FAEnabled ? (
          <div className="flex flex-col items-center">
            <div className="flex mb-4">
              <button
                onClick={() => handleViewChange("qr")}
                className={`bg-[#2B4168] font-futura text-white py-2 px-4 rounded-full shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out mr-2 ${
                  view === "qr" ? "bg-gray-400" : ""
                }`}
              >
                Generar Código QR
              </button>
              <button
                onClick={() => handleViewChange("secret")}
                className={`bg-[#2B4168] font-futura text-white py-2 px-4 rounded-full shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out ${
                  view === "secret" ? "bg-gray-400" : ""
                }`}
              >
                Generar Código Secreto
              </button>
            </div>
            {view === "qr" && qrCode && (
              <div className="flex flex-col items-center">
                <p className="text-lg font-futura mb-2">
                  Escanea el siguiente código QR con tu aplicación de
                  autenticación:
                </p>
                <img src={qrCode} alt="Código QR" className="w-32 h-32" />
              </div>
            )}
            {view === "secret" && secret && (
              <p className="font-futura text-gray-700 mt-4">
                Código Secreto: <span className="font-bold">{secret}</span>
              </p>
            )}
          </div>
        ) : (
          <button
            onClick={handleGenerateQRCode}
            className="bg-[#2B4168] font-futura text-white py-2 px-4 rounded-full shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Habilitar Autenticación de Dos Factores
          </button>
        )}
      </div>
      <SecurityButton/>
    </div>
  );
}

function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}