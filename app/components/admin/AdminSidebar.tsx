"use client";
import Link from "next/link";
import React from "react";

/**
 * Simple Admin Sidebar — export default
 * Ensure this file path EXACTLY matches imports (case-sensitive).
 */

export default function AdminSidebar({ active }: { active?: string }) {
  return (
    <aside className="w-60 bg-white border-r hidden md:block">
      <div className="p-4 border-b">
        <div className="text-yellow-600 font-bold">RailEats Admin</div>
      </div>

      <nav className="p-3">
        <ul className="space-y-1 text-sm">
          <li><Link href="/admin/dashboard" className={`block px-3 py-2 rounded ${active==="dashboard" ? "bg-yellow-50" : "hover:bg-gray-50"}`}>Dashboard</Link></li>
          <li>
            <div className="text-xs text-gray-400 px-3 mt-3">Orders</div>
            <ul className="pl-3">
              <li><Link href="/admin/orders?status=booked" className="block px-3 py-2 rounded hover:bg-gray-50">Booked Orders</Link></li>
              <li><Link href="/admin/orders?status=kitchen" className="block px-3 py-2 rounded hover:bg-gray-50">In Kitchen</Link></li>
              <li><Link href="/admin/orders?status=outfor" className="block px-3 py-2 rounded hover:bg-gray-50">Out for Delivery</Link></li>
              <li><Link href="/admin/orders?status=marked" className="block px-3 py-2 rounded hover:bg-gray-50">Mark Delivery</Link></li>
              <li><Link href="/admin/orders?status=cancelled" className="block px-3 py-2 rounded hover:bg-gray-50">Cancelled</Link></li>
              <li><Link href="/admin/orders?status=partial" className="block px-3 py-2 rounded hover:bg-gray-50">Partial Delivery</Link></li>
            </ul>
          </li>
          <li className="mt-4">
            <div className="text-xs text-gray-400 px-3">Outlet Master</div>
            <ul className="pl-3">
              <li><Link href="/admin/outlets" className="block px-3 py-2 rounded hover:bg-gray-50">Outlets List</Link></li>
            </ul>
          </li>
          <li className="mt-4">
            <Link href="/admin/logout" className="block px-3 py-2 rounded hover:bg-gray-50 text-red-600">Logout</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
