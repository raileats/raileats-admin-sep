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
    <div style={{ position: "fixed", inset:0, display:"flex", alignItems:"flex-start", justifyContent:"center", padding:20, zIndex:999 }}>
      <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.45)" }} onClick={onClose}></div>

      <form onSubmit={submit} className="card" style={{ maxWidth:600, zIndex:10 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
          <h3 style={{ margin:0 }}>Add Outlet</h3>
          <button type="button" onClick={onClose} className="btn btn-ghost">✕</button>
        </div>

        <div className="form">
          <div className="field"><input className="input" placeholder="Outlet Code" value={form.code} onChange={(e)=>setForm({...form, code:e.target.value})} /></div>
          <div className="field"><input className="input" placeholder="Name" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} /></div>
          <div className="field"><input className="input" placeholder="Station" value={form.station} onChange={(e)=>setForm({...form, station:e.target.value})} /></div>
          <div className="field"><input className="input" placeholder="Owner" value={form.owner} onChange={(e)=>setForm({...form, owner:e.target.value})} /></div>
          <div className="field"><input className="input" placeholder="Mobile" value={form.mobile} onChange={(e)=>setForm({...form, mobile:e.target.value})} /></div>
          <div className="field"><input className="input" placeholder="FSSAI" value={form.fssai} onChange={(e)=>setForm({...form, fssai:e.target.value})} /></div>
        </div>

        <div className="btn-row" style={{ marginTop: 12 }}>
          <button type="button" onClick={onClose} className="btn btn-ghost">Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
        </div>
      </form>
    </div>
  );
}
