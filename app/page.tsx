// app/page.tsx
import Link from "next/link";

export const metadata = {
  title: "RailEats Admin",
  description: "RailEats - Admin portal",
};

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-3xl w-full p-8 bg-white rounded-lg shadow">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-yellow-600">RailEats</h1>
          <p className="text-sm text-gray-600 mt-1">Admin Panel & tools</p>
        </header>

        <section className="mb-6">
          <p className="text-gray-700">
            Welcome to the RailEats admin area. Use the links below to open the admin dashboard or the public site.
          </p>
        </section>

        <div className="flex gap-3">
          <Link href="/admin" className="inline-block px-4 py-2 rounded bg-blue-600 text-white">
            Open Admin (/admin)
          </Link>

          <a
            href="/"
            className="inline-block px-4 py-2 rounded border"
            title="Open frontend root"
          >
            Open Frontend (/)
          </a>

          <a
            href="/api/admin/outlets"
            className="inline-block px-4 py-2 rounded border"
            title="Test outlets API"
          >
            Test API (/api/admin/outlets)
          </a>
        </div>

        <footer className="mt-6 text-xs text-gray-400">
          Note: Some routes/pages are placeholder stubs created during cleanup. Replace them with your real pages/APIs as needed.
        </footer>
      </div>
    </main>
  );
}
