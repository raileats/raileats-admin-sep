// app/admin/stations/page.tsx
import React from "react";
import AddStationForm from "@/components/admin/AddStationForm";
import StationList from "@/components/admin/StationList";

async function getStations() {
  try {
    // fetch relative path from server; cache disabled to get latest
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/admin/stations`, { cache: "no-store" });
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    return [];
  }
}

export default async function StationsPage() {
  const stations = await getStations();

  return (
    <div style={{ padding: 0 }}>
      <h1 style={{ marginTop: 0 }}>Station Master</h1>
      <p style={{ color: "#6b7280" }}>Add single station, search, or upload CSV in bulk.</p>

      <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 20, marginTop: 18 }}>
        <div style={{ background: "#fff", padding: 16, borderRadius: 10, border: "1px solid #e6e7eb" }}>
          <h3 style={{ marginTop: 0 }}>Add New Station</h3>
          {/* @ts-expect-error */}
          <AddStationForm onAdded={() => { /* optional: user can click Reload in list */ }} />
        </div>

        <div style={{ background: "#fff", padding: 16, borderRadius: 10, border: "1px solid #e6e7eb" }}>
          <h3 style={{ marginTop: 0 }}>Stations List</h3>
          {/* @ts-expect-error */}
          <StationList initial={stations} />
        </div>
      </div>
    </div>
  );
}
