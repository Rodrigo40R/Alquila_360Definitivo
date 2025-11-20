// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

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
      <body className="min-h-screen bg-slate-900 text-slate-50 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}