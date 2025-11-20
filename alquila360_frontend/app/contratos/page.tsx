import Shell from "@/components/Shell";
import { navItems } from "../_nav";

export default function ContratosPage() {
  return (
    <Shell navItems={navItems} roleLabel="Propietario">
      <h1 className="text-2xl font-bold">Contratos</h1>
    </Shell>
  );
}
