
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminIndex() {
  const router = useRouter();
  useEffect(() => {
    const s = localStorage.getItem("raileats_admin");
    if (!s) router.push("/admin/login");
    else router.push("/admin/dashboard");
  }, [router]);
  return null;
}
