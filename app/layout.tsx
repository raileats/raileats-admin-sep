// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import Link from "next/link";

export const metadata = {
  title: "RailEats Admin",
  description: "RailEats admin portal",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="header-inner container">
            <div className="brand">
              <div className="logo-badge">RE</div>
              <div className="brand-title">
                <div className="title">RailEats</div>
                <div className="sub">Admin Portal</div>
              </div>
            </div>

            <nav className="nav-links">
              <Link href="/">Home</Link>
              <Link href="/admin">Admin</Link>
              <a href="/api/admin/outlets">Test API</a>
            </nav>
          </div>
        </header>

        <main className="container" style={{ paddingTop: 18, paddingBottom: 40 }}>
          {children}
        </main>

        <footer className="container" style={{ paddingTop: 10, paddingBottom: 30 }}>
          <div className="footer-note">RailEats Admin — placeholder pages may exist. Replace stubs with real pages/APIs as needed.</div>
        </footer>
      </body>
    </html>
  );
}
