"use client";

export default function Page() {
  return (
    <main style={{minHeight: "80vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
      <div style={{maxWidth:720, padding:24, borderRadius:8, background:"#fff", boxShadow:"0 6px 18px rgba(0,0,0,0.06)"}}>
        <h1 style={{margin:0}}>RailEats Admin</h1>
        <p style={{color:"#374151"}}>Admin project is deployed. Use /admin/login to access admin login (or open the admin routes you already created).</p>
        <p style={{color:"#6b7280",fontSize:13}}>If you want to load your admin UI, ensure other app files (app/admin/..., app/components/...) are present in repo root.</p>
      </div>
    </main>
  );
}
