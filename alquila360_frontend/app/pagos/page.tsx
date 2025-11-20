import Shell from "@/components/Shell";
import { navItems } from "../_nav";

export default function PagosPage() {
  return (
    <Shell navItems={navItems} roleLabel="Propietario">
      <h1 className="text-2xl font-bold">Pagos</h1>
    </Shell>
  );
}
