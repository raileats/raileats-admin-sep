"use client";
import React, { useMemo, useState } from "react";

export default function OutletList({ outlets }:{ outlets:any[] }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!Array.isArray(outlets)) return [];
    const term = (q || "").trim().toLowerCase();
    if (!term) return outlets;
    return outlets.filter((o: any) => {
      const hay = (
        (o.name || "") +
        (o.code || "") +
        (o.station || "") +
        (o.owner || "") +
        (o.mobile || "")
      ).toLowerCase();
      return hay.includes(term);
    });
  }, [outlets, q]);

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="mb-3 flex items-center gap-2">
        <input
          placeholder="Search by name, code, station, owner, mobile"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
        />
        <div className="text-sm text-gray-500">Total: {outlets?.length || 0}</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">Code</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Station</th>
              <th className="p-2 text-left">Owner</th>
              <th className="p-2 text-left">Mobile</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((o: any) => (
              <tr key={o.id || o.code} className="border-t">
                <td className="p-2">{o.code}</td>
                <td className="p-2">{o.name}</td>
                <td className="p-2">{o.station}</td>
                <td className="p-2">{o.owner}</td>
                <td className="p-2">{o.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
