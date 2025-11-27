import { ReactNode } from "react";
import ClienteSidebar from "@/components/sidebar/ClienteSidebar";
import NavbarTop from "@/components/ui/NavbarTop";

type LayoutProps = {
  children: ReactNode;
};

export default function ClienteLayout({ children }: LayoutProps) {
  return (
    <div className="flex bg-white min-h-screen">
      <ClienteSidebar />
      <div className="flex-1 flex flex-col">
        <NavbarTop />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
