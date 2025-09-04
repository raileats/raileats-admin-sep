
"use client";
import React, { useEffect, useState } from "react";
import AdminSidebar from "@/app/components/admin/AdminSidebar";
import OutletList from "@/app/components/admin/OutletList";
import AddOutletForm from "@/app/components/admin/AddOutletForm";

export default function OutletsPage(){
  const [outlets,setOutlets] = useState<any[]>([]);
  const [openAdd,setOpenAdd] = useState(false);

  useEffect(()=>{ 
    (async ()=>{
      try {
        const res = await fetch('/api/admin/outlets');
        if (res.ok) {
          const j = await res.json();
          setOutlets(j);
          return;
        }
      } catch(e){}
      setOutlets([
        { code: "1001", name:"Annapurna Restro", station:"BPL", owner:"Ramesh Kumar", mobile:"9748587585", fssai:"22267384774757" },
        { code: "10022", name:"Kalyan Kitchen", station:"CNB", owner:"Vineet Singh", mobile:"77457587656", fssai:"56474854858587" },
      ]);
    })();
  },[]);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar active="outlets" />
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
