"use client";
import Link from "next/link";
import React from "react";

type Props = {
  active?: string;
};

export default function AdminSidebar({ active }: Props) {
  const itemClass = (name?: string) =>
    `block px-3 py-2 rounded ${
      name && active === name ? "bg-yellow-50 font-semibold" : "hover:bg-gray-50"
    }`;

  return (
    <aside className="w-60 bg-white border-r hidden md:block">
      <div className="p-4 border-b">
        <div className="text-yellow-600 font-bold">RailEats Admin</div>
      </div>

      <nav className="p-3">
        <ul className="space-y-1 text-sm">
          <li>
            <Link href="/admin/dashboard" className={itemClass("dashboard")}>
              Dashboard
            </Link>
          </li>

          <li className="mt-3">
            <div className="text-xs text-gray-400 px-3">Orders</div>
            <ul className="pl-3">
              <li>
                <Link href="/admin/orders" className={itemClass("orders")}>
                  Orders List
                </Link>
              </li>
              <li>
                <Link href="/admin/orders?status=booked" className={itemClass("orders-booked")}>
                  Booked
                </Link>
              </li>
            </ul>
          </li>

          <li className="mt-4">
            <div className="text-xs text-gray-400 px-3">Outlet Master</div>
            <ul className="pl-3">
              <li>
                <Link href="/admin/outlets" className={itemClass("outlets")}>
                  Outlets List
                </Link>
              </li>
            </ul>
          </li>

          <li className="mt-6">
            <Link href="/admin/logout" className="block px-3 py-2 rounded hover:bg-gray-50 text-red-600">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
