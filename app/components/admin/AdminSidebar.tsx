"use client";
import Link from "next/link";
import React from "react";

type Props = { active?: string };

export default function AdminSidebar({ active }: Props) {
  return (
    <aside className="sidebar" role="navigation" aria-label="Admin sidebar">
      <div>
        <div className="section-title">Main</div>
        <Link href="/admin/dashboard" className={active === "dashboard" ? "active" : ""}>Dashboard</Link>
      </div>

      <div style={{ marginTop: 12 }}>
        <div className="section-title">Orders</div>
        <Link href="/admin/orders" className={active === "orders" ? "active" : ""}>Orders List</Link>
        <Link href="/admin/orders?status=booked" className={active === "orders-booked" ? "active" : ""}>Booked</Link>
      </div>

      <div style={{ marginTop: 12 }}>
        <div className="section-title">Outlet Master</div>
        <Link href="/admin/outlets" className={active === "outlets" ? "active" : ""}>Outlets List</Link>
      </div>

      <div style={{ marginTop: 16 }}>
        <Link href="/admin/logout" style={{ color: "#ef4444" }}>Logout</Link>
      </div>
    </aside>
  );
}
