"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Role = "candidate" | "recruiter";

export default function useAuthGuard(
  allowedRoles: Role[]
) {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (!role || !allowedRoles.includes(role as Role)) {
      router.replace("/dashboard");
    }
  }, []);
}
