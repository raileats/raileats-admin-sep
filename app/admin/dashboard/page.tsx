
"use client";
import React from "react";
import AdminSidebar from "@/app/components/admin/AdminSidebar";

function TopBar() {
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("raileats_admin")||"null") : null;
  return (
    <div className="flex items-center justify-between bg-white p-3 border-b">
      <div className="flex items-center gap-3">
        <img src="/logo.png" className="h-10 w-10 rounded-full" alt="logo" />
        <div className="text-lg font-semibold">Admin Dashboard</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-sm">{user?.name || "Admin"}</div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar active="dashboard" />
      <div className="flex-1">
        <TopBar />
        <main className="p-6">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded shadow">Total Orders: <strong>42</strong></div>
            <div className="bg-white p-4 rounded shadow">Active Outlets: <strong>12</strong></div>
            <div className="bg-white p-4 rounded shadow">Today's Revenue: <strong>₹12,340</strong></div>
          </div>
        </main>
      </div>
    </div>
  );
}
