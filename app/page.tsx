// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="card">
      <h1 className="page-title">RailEats</h1>
      <p className="lead">Admin Panel & tools</p>

      <p>Welcome to the RailEats admin area. Use the links below to open the admin dashboard or the public site.</p>

      <div className="links-row" style={{ marginTop: 12 }}>
        <Link href="/admin" className="btn btn-primary">Open Admin (/admin)</Link>
        <Link href="/" className="btn btn-ghost">Open Frontend (/)</Link>
        <a href="/api/admin/outlets" className="btn btn-ghost">Test API (/api/admin/outlets)</a>
      </div>

      <p className="footer-note" style={{ marginTop: 12 }}>
        Note: Some routes/pages are placeholder stubs created during cleanup. Replace them with your real pages/APIs as needed.
      </p>
    </div>
  );
}
