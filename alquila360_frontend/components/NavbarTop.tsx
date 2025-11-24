// Ejemplo en NavbarTop.tsx
import Image from "next/image";

export default function NavbarTop() {
  return (
    <header className="w-full flex items-center justify-between px-12 py-4 bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <Image
          src="/logo-icon.jpg"
          alt="Alquila360 logo"
          width={40}
          height={40}
        />
        <Image
          src="/logo-text.jpg"
          alt="Alquila360"
          width={180}
          height={40}
        />
      </div>
      {/* resto... */}
    </header>
  );
}
