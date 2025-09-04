"use client";
import React, { useMemo, useState } from "react";

export default function OutletList({ outlets }:{ outlets:any[] }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    if (!Array.isArray(outlets)) return [];
    const term = (q || "").trim().toLowerCase();
    if (!term) return outlets;
    return outlets.filter((o: any) => {
      const hay = ((o.name||"") + (o.code||"") + (o.station||"") + (o.owner||"") + (o.mobile||"")).toLowerCase();
      return hay.includes(term);
    });
  }, [outlets, q]);

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <input placeholder="Search outlets..." value={q} onChange={(e)=>setQ(e.target.value)} className="input" />
        <div style={{ marginLeft: 12, alignSelf: "center" }}>Total: {outlets?.length || 0}</div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="table" style={{ minWidth: 700 }}>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Station</th>
              <th>Owner</th>
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o:any) => (
              <tr key={o.id || o.code} className="outlet-row">
                <td>{o.code}</td>
                <td>{o.name}</td>
                <td>{o.station}</td>
                <td>{o.owner}</td>
                <td>{o.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
