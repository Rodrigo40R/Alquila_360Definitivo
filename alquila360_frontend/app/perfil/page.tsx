import Shell from "@/components/Shell";
import { navItems } from "../_nav";

export default function PerfilPage() {
  return (
    <Shell navItems={navItems} roleLabel="Propietario">
      <h1 className="text-2xl font-bold">Perfil</h1>
    </Shell>
  );
}
