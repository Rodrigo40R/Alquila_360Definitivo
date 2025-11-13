import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alquila360",
  description: "Gestión integral de alquileres",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-alquila360 text-gray-900">
         {children}
         </body>
    </html>
  );
}
