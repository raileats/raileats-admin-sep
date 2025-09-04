
"use client";
import React, { useState } from "react";

export default function OutletList({ outlets }:{ outlets:any[] }) {
  const [q,setQ] = useState("");
  const filtered = outlets.filter(o=> !q || (o.name+o.code+o.station+o.owner+o.mobile).toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="mb-3 flex items-center gap-2">
        <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search by code, name, station, owner mobile" className="flex-1 border rounded px-3 py-2"/>
        <div className="text-sm text-gray-500">Total: {outlets?.length||0}</div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2">Outlet Code</th>
              <th className="p-2">Name</th>
              <th className="p-2">Station</th>
              <th className="p-2">Owner</th>
              <th className="p-2">Mobile</th>
              <th className="p-2">FSSAI</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(o=>(
              <tr key={o.code} className="border-t">
                <td className="p-2">{o.code}</td>
                <td className="p-2">{o.name}</td>
                <td className="p-2">{o.station}</td>
                <td className="p-2">{o.owner}</td>
                <td className="p-2">{o.mobile}</td>
                <td className="p-2">{o.fssai}</td>
                <td className="p-2">
                  <button className="text-blue-600 mr-2">Edit</button>
                  <button className="text-red-600">History</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
