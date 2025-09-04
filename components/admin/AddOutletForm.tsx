
"use client";
import React, { useState } from "react";

export default function AddOutletForm({ onClose }:{ onClose: ()=>void }) {
  const [form,setForm] = useState<any>({ code:"", name:"", station:"", owner:"", mobile:"", fssai:"" });

  const submit = async (e:React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/admin/outlets', { method: 'POST', body: JSON.stringify(form) });
    } catch(e){ /* ignore */ }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-2xl bg-white p-4 rounded shadow mt-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Add New Outlet</h3>
          <button type="button" onClick={onClose} className="text-gray-600">✕</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input placeholder="Outlet Code" value={form.code} onChange={e=>setForm({...form,code:e.target.value})} className="border p-2 rounded"/>
          <input placeholder="Outlet Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="border p-2 rounded"/>
          <input placeholder="Station Code" value={form.station} onChange={e=>setForm({...form,station:e.target.value})} className="border p-2 rounded"/>
          <input placeholder="Owner Name" value={form.owner} onChange={e=>setForm({...form,owner:e.target.value})} className="border p-2 rounded"/>
          <input placeholder="Owner Mobile" value={form.mobile} onChange={e=>setForm({...form,mobile:e.target.value})} className="border p-2 rounded"/>
          <input placeholder="Outlet FSSAI" value={form.fssai} onChange={e=>setForm({...form,fssai:e.target.value})} className="border p-2 rounded"/>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
          <button type="submit" className="px-3 py-1 bg-yellow-600 text-white rounded">Add Outlet</button>
        </div>
      </form>
    </div>
  );
}
