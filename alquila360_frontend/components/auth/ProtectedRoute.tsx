"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/auth";

export default function ProtectedRoute({
  allowedRole,
  children,
}: {
  allowedRole: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const user = getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    if (user.rol !== allowedRole) {
      router.push("/login");
    }
  }, []);

  return <>{children}</>;
}
