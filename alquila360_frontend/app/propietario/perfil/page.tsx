"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

// 🚩 Interfaz actualizada para reflejar los datos disponibles
interface UserProfile {
  nombre: string;
  correo: string;
  tipo_usuario: string;
  verificado: boolean;      // Nuevo campo
  estado_cuenta: string;    // Nuevo campo
  // telefono y ci eliminados
}

export default function PerfilPropietario() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = getCurrentUser();
      
      // 🚩 CORRECCIÓN 1: Usar "propietario" en minúsculas y verificar user.id
      if (!user || user.rol !== "propietario" || !user.id) {
        router.push("/login");
        return;
      }
      
      const userId = user.id;

      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

        const res = await fetch(`${baseUrl}/users/${userId}`, {
          headers: {
            "Authorization": `Bearer ${user.token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        } else {
          console.error("Error al cargar perfil:", res.status);
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  // Lógica para iniciales (Ej: Juan Perez -> JP)
  const getInitials = (name?: string) => {
    if (!name) return "MP"; // Valor por defecto actualizado
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase(); 
  };

  if (loading) {
    return <div className="p-6 text-slate-500">Cargando perfil...</div>;
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mi perfil</h1>
        <p className="text-sm text-slate-600">
          Información básica del propietario.
        </p>
      </div>

      <div className="max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center gap-4">
          
          {/* Avatar con iniciales dinámicas */}
          <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center text-2xl font-semibold text-slate-500">
            {getInitials(userData?.nombre)}
          </div>

          <div className="space-y-1 text-center">
            <p className="text-base font-semibold text-slate-900">
              {userData?.nombre || "Usuario"}
            </p>
            <p className="text-sm text-slate-600 capitalize">
              {userData?.tipo_usuario?.toLowerCase() || "Propietario"}
            </p>
          </div>

          <div className="w-full mt-4 space-y-2 text-sm">
            <div className="flex justify-between border-b border-slate-50 py-2">
              <span className="text-slate-500">Correo:</span>
              <span className="text-slate-800">{userData?.correo}</span>
            </div>
            
            {/* 🚩 NUEVA FILA: Verificación */}
            <div className="flex justify-between border-b border-slate-50 py-2">
              <span className="text-slate-500">Verificación:</span>
              <span className={`font-medium ${userData?.verificado ? 'text-emerald-600' : 'text-red-500'}`}>
                {userData?.verificado ? "Verificado" : "Pendiente"}
              </span>
            </div>

            {/* 🚩 NUEVA FILA: Estado de Cuenta */}
            <div className="flex justify-between py-2">
              <span className="text-slate-500">Estado de cuenta:</span>
              <span className="text-slate-800">
                {userData?.estado_cuenta || "Desconocido"}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}