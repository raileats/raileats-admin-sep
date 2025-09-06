// app/admin/layout.tsx
import React from "react";
import Link from "next/link";
import "./admin.css"; // optional, अगर आप अलग css रखना चाहते हो (या globals.css use करो)

export const metadata = {
  title: "RailEats — Admin",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div style={{ minHeight: "100vh", background: "#f3f4f6" }}>
          <header style={{ background: "#fff", borderBottom: "1px solid #e6e7eb" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 44, height: 44, borderRadius: 8, background: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>RE</div>
                <div>
                  <div style={{ fontWeight: 700, color: "#b45309" }}>RailEats</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>Admin Portal</div>
                </div>
              </div>

              <nav>
                <Link href="/">Home</Link> {"  "}
                <Link href="/admin" style={{ marginLeft: 12 }}>Admin</Link> {"  "}
                <Link href="/api/admin/outlets" style={{ marginLeft: 12 }}>Test API</Link>
              </nav>
            </div>
          </header>

          <main style={{ maxWidth: 1100, margin: "28px auto", padding: "0 14px" }}>
            <div style={{ display: "flex", gap: 18 }}>
              <aside style={{ width: 220, background: "#fff", padding: 12, borderRadius: 8, border: "1px solid #e6e7eb" }}>
                <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>Admin</div>
                <Link href="/admin" style={{ display: "block", padding: 8 }}>Overview</Link>
                <Link href="/admin/dashboard" style={{ display: "block", padding: 8 }}>Dashboard</Link>
                <Link href="/admin/outlets" style={{ display: "block", padding: 8 }}>Outlets</Link>
                <Link href="/admin/orders" style={{ display: "block", padding: 8 }}>Orders</Link>
              </aside>

              <section style={{ flex: 1 }}>
                {children}
              </section>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
