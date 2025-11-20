import Sidebar from "@/components/sidebar/Sidebar";
import HeaderGeneral from "@/components/ui/HeaderGeneral";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function PropietarioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRole="propietario">
      <div className="flex">
        <Sidebar role="propietario" />
        <div className="flex-1 min-h-screen bg-slate-950">
          <HeaderGeneral role="Propietario" />
          <div className="p-6">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
