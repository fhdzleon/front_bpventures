import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { SocketProvider } from "@/context/WebSocket";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bp Ventures",
  description: "Intranet de Bp Ventures",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
   
      <body className={inter.className}> 
        <SocketProvider>
        <AuthProvider>{children}</AuthProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
