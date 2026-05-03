"use client";

import React from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ✅ SIDEBAR */}
      <AdminSidebar />

      {/* ✅ ORIGINAL LAYOUT (UNCHANGED) */}
      <div className="flex-1">
        {children}
      </div>

    </div>
  );
}
