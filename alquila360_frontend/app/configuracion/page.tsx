import Shell from "@/components/Shell";
import { navItems } from "../_nav";

export default function ConfiguracionPage() {
  return (
    <Shell navItems={navItems} roleLabel="Propietario">
      <h1 className="text-2xl font-bold">Configuración</h1>
    </Shell>
  );
}
