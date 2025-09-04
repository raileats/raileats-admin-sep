
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogin() {
  const router = useRouter();
  const [user,setUser] = useState("");
  const [pass,setPass] = useState("");

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if ((user === "admin" && pass === "admin123") || (user && pass)) {
      localStorage.setItem("raileats_admin", JSON.stringify({ name: user, role: "superadmin" }));
      router.push("/admin/dashboard");
    } else {
      alert("Invalid credentials. For demo use: admin / admin123");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={login} className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">RailEats Admin Login</h2>
        <label className="block mb-2">
          <div className="text-sm text-gray-600">Username / Mobile</div>
          <input value={user} onChange={(e)=>setUser(e.target.value)} className="w-full border rounded px-3 py-2" />
        </label>
        <label className="block mb-4">
          <div className="text-sm text-gray-600">Password</div>
          <input type="password" value={pass} onChange={(e)=>setPass(e.target.value)} className="w-full border rounded px-3 py-2" />
        </label>
        <div className="flex items-center justify-between">
          <button className="bg-yellow-600 text-white px-4 py-2 rounded">Login</button>
          <button type="button" onClick={()=>alert("Demo: admin/admin123")} className="text-sm text-gray-500">Need help?</button>
        </div>
      </form>
    </div>
  );
}
