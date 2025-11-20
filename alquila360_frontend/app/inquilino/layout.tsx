import Sidebar from "@/components/sidebar/Sidebar";
import HeaderGeneral from "@/components/ui/HeaderGeneral";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function InquilinoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRole="inquilino">
      <div className="flex">
        <Sidebar role="inquilino" />
        <div className="flex-1 min-h-screen bg-slate-950">
          <HeaderGeneral role="Inquilino" />
          <div className="p-6">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
