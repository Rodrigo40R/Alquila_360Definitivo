import Shell from "@/components/Shell";
import { navItems } from "../_nav";

export default function ReportesPage() {
  return (
    <Shell navItems={navItems} roleLabel="Propietario">
      <h1 className="text-2xl font-bold">Reportes</h1>
    </Shell>
  );
}
