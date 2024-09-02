import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/components/dashboard/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 overflow-x-auto">           
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
