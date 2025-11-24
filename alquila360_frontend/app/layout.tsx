import type { Metadata } from "next";
import "./global-style.css";

export const metadata: Metadata = {
  title: "ALQUILA360",
  description: "Gestión integral de alquileres",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}