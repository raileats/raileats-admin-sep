"use client";
import React, { useEffect, useState } from "react";
import AdminSidebar from "@/app/components/admin/AdminSidebar";
import OutletList from "@/components/admin/OutletList";
import AddOutletForm from "@/components/admin/AddOutletForm";

export default function OutletsPage(){
  const [outlets,setOutlets] = useState<any[]>([]);
  const [openAdd,setOpenAdd] = useState(false);

  useEffect(()=>{ 
    (async ()=>{
      try {
        const res = await fetch('/api/admin/outlets');
        if (res.ok) {
          const data = await res.json();
          setOutlets(data || []);
        } else {
          console.error("Failed to fetch outlets", res.status);
        }
      } catch (err) {
        console.error("Error fetching outlets", err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1">
        <div className="bg-white p-3 border-b flex items-center justify-between">
          <div className="text-lg font-semibold">Outlet Master</div>
          <button onClick={()=>setOpenAdd(true)} className="bg-blue-500 text-white px-3 py-1 rounded">Add New Outlet</button>
        </div>

        <main className="p-6">
          <OutletList outlets={outlets} />
        </main>
      </div>

      {openAdd && <AddOutletForm onClose={()=>{ setOpenAdd(false); } } />}
    </div>
  );
}
