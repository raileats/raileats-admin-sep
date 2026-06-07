"use client";

import Link from "next/link";
import React, { useState } from "react";

type Props = { active?: string };

export default function AdminSidebar({ active }: Props) {
  const [open, setOpen] = useState(false);

  const closeMobile = () => setOpen(false);

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="fixed left-3 top-3 z-50 rounded-lg bg-white px-3 py-2 shadow md:hidden"
      >
        ☰
      </button>

      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={closeMobile}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-64 bg-white shadow transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:sticky md:top-0 md:translate-x-0 md:w-20 md:hover:w-64
          overflow-hidden
        `}
        role="navigation"
        aria-label="Admin sidebar"
      >
        <div className="p-4">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/raileats-logo.png" className="h-9 w-9" alt="RailEats" />
              <div className="whitespace-nowrap md:hidden md:group-hover:block">
                <b>RailEats Admin</b>
                <p className="text-xs text-gray-500">Operations</p>
              </div>
            </div>

            <button onClick={closeMobile} className="md:hidden">
              ✕
            </button>
          </div>

          <nav className="space-y-2">
            <MenuLink href="/admin/dashboard" label="Dashboard" icon="⌂" active={active === "dashboard"} onClick={closeMobile} />
            <MenuLink href="/admin/orders" label="Orders List" icon="☷" active={active === "orders"} onClick={closeMobile} />
            <MenuLink href="/admin/orders?status=booked" label="Booked" icon="✓" active={active === "orders-booked"} onClick={closeMobile} />
            <MenuLink href="/admin/outlets" label="Outlets List" icon="🍴" active={active === "outlets"} onClick={closeMobile} />
            <MenuLink href="/admin/bulk" label="Bulk Orders" icon="▦" active={active === "bulk"} onClick={closeMobile} />
            <MenuLink href="/admin/customers" label="Customers" icon="👥" active={active === "customers"} onClick={closeMobile} />
            <MenuLink href="/admin/feedback" label="Feedback" icon="✉" active={active === "feedback"} onClick={closeMobile} />

            <Link
              href="/admin/logout"
              onClick={closeMobile}
              className="mt-4 flex items-center gap-3 rounded-lg px-3 py-2 text-red-500 hover:bg-red-50"
            >
              <span className="w-6 text-center">⎋</span>
              <span className="whitespace-nowrap md:hidden md:group-hover:inline">
                Logout
              </span>
            </Link>
          </nav>
        </div>
      </aside>
    </>
  );
}

function MenuLink({
  href,
  label,
  icon,
  active,
  onClick,
}: {
  href: string;
  label: string;
  icon: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
        active ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <span className="w-6 text-center">{icon}</span>
      <span className="whitespace-nowrap md:hidden md:group-hover:inline">
        {label}
      </span>
    </Link>
  );
}
