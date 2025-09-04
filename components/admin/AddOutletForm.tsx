"use client";
import React, { useState } from "react";

export default function AddOutletForm({ onClose }:{ onClose: ()=>void }) {
  const [form, setForm] = useState<any>({
    code: "",
    name: "",
    station: "",
    owner: "",
    mobile: "",
    fssai: ""
  });
  const [saving, setSaving] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch('/api/admin/outlets', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      onClose();
    } catch (err) {
      console.error("Failed to save outlet", err);
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <form onSubmit={submit} className="relative z-10 w-full max-w-lg bg-white rounded shadow p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Add Outlet</h3>
          <button type="button" onClick={onClose} className="px-2 py-1 rounded hover:bg-gray-100">✕</button>
        </div>

        <div className="grid grid-cols-1 gap-2">
          <input className="border rounded px-3 py-2" placeholder="Outlet Code" value={form.code} onChange={(e)=>setForm({...form, code:e.target.value})} />
          <input className="border rounded px-3 py-2" placeholder="Name" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} />
          <input className="border rounded px-3 py-2" placeholder="Station" value={form.station} onChange={(e)=>setForm({...form, station:e.target.value})} />
          <input className="border rounded px-3 py-2" placeholder="Owner" value={form.owner} onChange={(e)=>setForm({...form, owner:e.target.value})} />
          <input className="border rounded px-3 py-2" placeholder="Mobile" value={form.mobile} onChange={(e)=>setForm({...form, mobile:e.target.value})} />
          <input className="border rounded px-3 py-2" placeholder="FSSAI" value={form.fssai} onChange={(e)=>setForm({...form, fssai:e.target.value})} />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-3 py-1 rounded border">Cancel</button>
          <button disabled={saving} type="submit" className="px-3 py-1 rounded bg-green-600 text-white">
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
