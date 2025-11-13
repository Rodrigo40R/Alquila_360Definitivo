import Image from "next/image";
import LoginCard from "@/components/LoginCard";
import SiteFooter from "@/components/SiteFooter";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center">
          <Image src="/logo.svg" alt="ALQUILA360" width={180} height={40} />
        </div>
      </header>
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12">
          <div>
            <div className="hidden md:block">
              <Image src="/hero-login.svg" alt="Ilustración" width={720} height={480} className="rounded-xl" />
            </div>
            <div className="mt-6">
              <p className="text-3xl font-medium">Tu gestión de alquileres</p>
              <p className="text-5xl font-extrabold tracking-tight">Más simple y segura</p>
            </div>
          </div>
          <div className="flex justify-center md:justify-end"><LoginCard /></div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
