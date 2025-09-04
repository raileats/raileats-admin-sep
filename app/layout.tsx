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
      <body className="min-h-screen bg-gray-50 text-gray-800">
        <header className="bg-white border-b">
          <div className="container flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">
                RE
              </div>
              <div>
                <div className="font-bold text-lg text-yellow-600">RailEats</div>
                <div className="text-xs text-gray-500">Admin Portal</div>
              </div>
            </div>

            <nav className="flex items-center gap-4 text-sm">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/admin" className="hover:underline">Admin</Link>
              <a href="/api/admin/outlets" className="text-xs px-2 py-1 border rounded">Test API</a>
            </nav>
          </div>
        </header>

        <main className="container py-8">
          {children}
        </main>

        <footer className="border-t">
          <div className="container py-4 text-xs text-gray-500">
            RailEats Admin — placeholder pages exist. Replace stubs with real pages/APIs as needed.
          </div>
        </footer>
      </body>
    </html>
  );
}
