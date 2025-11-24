import { ReactNode } from "react";
import ProveedorSidebar from "@/components/sidebar/ProveedorSidebar";
import NavbarTop from "@/components/ui/NavbarTop";

type LayoutProps = {
  children: ReactNode;
};

export default function ProveedorLayout({ children }: LayoutProps) {
  return (
    <div className="flex bg-white min-h-screen">
      <ProveedorSidebar />
      <div className="flex-1 flex flex-col">
        <NavbarTop />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
