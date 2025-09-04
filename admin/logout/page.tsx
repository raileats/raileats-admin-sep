
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogout() {
  const router = useRouter();
  useEffect(()=>{
    localStorage.removeItem('raileats_admin');
    setTimeout(()=> router.push('/admin/login'), 300);
  }, [router]);
  return <div className="min-h-screen flex items-center justify-center">Logging out...</div>;
}
