// components/admin/StationList.tsx
"use client";
import React, { useEffect, useState } from "react";

type Station = {
  id: string;
  code?: string;
  name: string;
  state: string;
  category?: string;
  owner?: string;
  mobile?: string;
};

export default function StationList({ initial = [] as Station[] }: { initial?: Station[] }) {
  const [stations, setStations] = useState<Station[]>(initial);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Search state
  const [q, setQ] = useState("");
  const [code, setCode] = useState("");
  const [category, setCategory] = useState("");
  const [idFilter, setIdFilter] = useState("");

  useEffect(() => {
    setStations(initial);
  }, [initial]);

  const fetchStations = async (opts?: { q?: string; code?: string; category?: string; id?: string }) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (opts?.q) params.set("q", opts.q);
      if (opts?.code) params.set("code", opts.code);
      if (opts?.category) params.set("category", opts.category);
      if (opts?.id) params.set("id", opts.id);
      // default sort by name
      params.set("sort", "name");
      const res = await fetch(`/api/admin/stations?${params.toString()}`);
      const json = await res.json();
      if (res.ok) setStations(json.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    await fetchStations({ q: q || undefined, code: code || undefined, category: category || undefined, id: idFilter || undefined });
  };

  const handleReload = async () => {
    setQ("");
    setCode("");
    setCategory("");
    setIdFilter("");
    await fetchStations();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this station?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/stations?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      setStations((s) => s.filter((st) => st.id !== id));
    } catch (err) {
      alert("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  // CSV parsing utility (very simple)
  const parseCSV = (csvText: string) => {
    const lines = csvText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) return [];
    const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
    const rows = lines.slice(1);
    const out: any[] = [];
    for (const r of rows) {
      const cols = r.split(",").map((c) => c.trim());
      const obj: any = {};
      for (let i = 0; i < header.length; i++) {
        const key = header[i];
        obj[key] = cols[i] ?? "";
      }
      out.push(obj);
    }
    return out;
  };

  const handleCSVUpload = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const text = String(ev.target?.result || "");
        const parsed = parseCSV(text); // array of objects keyed by header
        if (parsed.length === 0) {
          alert("CSV empty or invalid");
          return;
        }
        // map header keys to station fields (id,code,name,state,category,owner,mobile)
        const mapped = parsed.map((row: any) => {
          // header names may vary; try to map common names:
          const mapVal = (keys: string[]) => {
            for (const k of keys) {
              if (row[k] !== undefined) return row[k];
            }
            return "";
          };
          return {
            id: mapVal(["id", "station_id", "stationid", "stn_id"]),
            code: mapVal(["code", "stn_code", "station_code"]),
            name: mapVal(["name", "station", "station_name", "stn_name"]),
            state: mapVal(["state", "state_name"]),
            category: mapVal(["category", "cat"]),
            owner: mapVal(["owner", "vendor", "vendor_name"]),
            mobile: mapVal(["mobile", "phone", "contact"]),
          };
        });

        // POST bulk
        setLoading(true);
        const res = await fetch("/api/admin/stations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bulk: mapped }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Bulk upload failed");
        // add returned created stations to local state (they are added to server memory top)
        // optionally reload from server
        await fetchStations();
        alert(`Uploaded ${json.data?.length || mapped.length} stations`);
      } catch (err: any) {
        alert(err?.message || "CSV upload failed");
      } finally {
        setLoading(false);
      }
    };
    reader.onerror = () => {
      alert("Failed to read file");
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <form onSubmit={handleSearch} style={{ display: "flex", gap: 8, marginBottom: 12, alignItems: "center" }}>
        <input placeholder="Search (name/code/state)" value={q} onChange={(e) => setQ(e.target.value)} style={{ padding: 8, borderRadius: 6, border: "1px solid #d1d5db", flex: 1 }} />
        <input placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} style={{ padding: 8, borderRadius: 6, border: "1px solid #d1d5db", width: 120 }} />
        <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: 8, borderRadius: 6, border: "1px solid #d1d5db", width: 140 }} />
        <input placeholder="ID" value={idFilter} onChange={(e) => setIdFilter(e.target.value)} style={{ padding: 8, borderRadius: 6, border: "1px solid #d1d5db", width: 160 }} />
        <button type="submit" style={{ padding: "8px 12px", borderRadius: 6, background: "#2563eb", color: "#fff", border: "none" }}>
          Search
        </button>
        <button type="button" onClick={handleReload} style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid #d1d5db", background: "#fff" }}>
          Reset
        </button>
      </form>

      <div style={{ marginBottom: 12, display: "flex", gap: 8, alignItems: "center" }}>
        <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span>CSV Upload:</span>
          <input
            type="file"
            accept=".csv,text/csv"
            onChange={(e) => {
              const f = e.target.files?.[0] ?? null;
              handleCSVUpload(f);
              // reset input
              e.currentTarget.value = "";
            }}
          />
        </label>

        <button
          onClick={() => {
            // provide example csv header + sample
            const sample = "id,code,name,state,category,owner,mobile\nst-10,ST010,Example Station,Delhi,Major,Vendor X,9810000000";
            const blob = new Blob([sample], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "stations-sample.csv";
            a.click();
            URL.revokeObjectURL(url);
          }}
          style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid #d1d5db", background: "#fff" }}
        >
          Download CSV Sample
        </button>

        <div style={{ marginLeft: "auto", color: "#6b7280" }}>{loading ? "Loading..." : `Total: ${stations.length}`}</div>
      </div>

      <div style={{ overflowX: "auto", border: "1px solid #e6e7eb", borderRadius: 8, background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>
              <th style={{ padding: 12 }}>ID</th>
              <th style={{ padding: 12 }}>Code</th>
              <th style={{ padding: 12 }}>Name</th>
              <th style={{ padding: 12 }}>State</th>
              <th style={{ padding: 12 }}>Category</th>
              <th style={{ padding: 12 }}>Owner / Mobile</th>
              <th style={{ padding: 12 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stations.length === 0 && (
              <tr>
                <td colSpan={7} style={{ padding: 12 }}>
                  No stations yet.
                </td>
              </tr>
            )}
            {stations.map((s) => (
              <tr key={s.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: 10 }}>{s.id}</td>
                <td style={{ padding: 10 }}>{s.code || "—"}</td>
                <td style={{ padding: 10 }}>{s.name}</td>
                <td style={{ padding: 10 }}>{s.state}</td>
                <td style={{ padding: 10 }}>{s.category || "—"}</td>
                <td style={{ padding: 10 }}>{s.owner || ""} {s.mobile ? ` / ${s.mobile}` : ""}</td>
                <td style={{ padding: 10 }}>
                  <button onClick={() => handleDelete(s.id)} disabled={deletingId === s.id} style={{ padding: "6px 8px", borderRadius: 6, border: "1px solid #ef4444", background: "#fff", color: "#ef4444", cursor: "pointer" }}>
                    {deletingId === s.id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
