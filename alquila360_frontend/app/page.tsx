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
        {/* ... tu layout de login aquí ... */}
        <LoginCard />
      </main>

      <SiteFooter />
    </div>
  );
}
