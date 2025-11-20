import Sidebar from "@/components/sidebar/Sidebar";
import HeaderGeneral from "@/components/ui/HeaderGeneral";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function TecnicoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRole="tecnico">
      <div className="flex">
        <Sidebar role="tecnico" />
        <div className="flex-1 min-h-screen bg-slate-950">
          <HeaderGeneral role="Técnico" />
          <div className="p-6">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
