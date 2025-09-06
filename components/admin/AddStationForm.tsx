// components/admin/AddStationForm.tsx
"use client";
import React, { useState } from "react";

type Props = {
  onAdded?: (station: any) => void;
};

export default function AddStationForm({ onAdded }: Props) {
  const [name, setName] = useState("");
  const [stateName, setStateName] = useState("");
  const [category, setCategory] = useState("");
  const [code, setCode] = useState("");
  const [mobile, setMobile] = useState("");
  const [owner, setOwner] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !stateName.trim()) {
      setError("Station name and state are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/stations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), state: stateName.trim(), category, code, mobile, owner }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed");
      setName("");
      setStateName("");
      setCategory("");
      setCode("");
      setMobile("");
      setOwner("");
      if (onAdded) onAdded(json.data);
    } catch (err: any) {
      setError(err?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: 16 }}>
      <div style={{ marginBottom: 8 }}>
        <label style={{ display: "block", fontSize: 13 }}>Station name*</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Station name" style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #d1d5db" }} />
      </div>

      <div style={{ marginBottom: 8 }}>
        <label style={{ display: "block", fontSize: 13 }}>State*</label>
        <input value={stateName} onChange={(e) => setStateName(e.target.value)} placeholder="State name" style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #d1d5db" }} />
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", fontSize: 13 }}>Category</label>
          <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Major / Minor / etc." style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #d1d5db" }} />
        </div>

        <div style={{ width: 160 }}>
          <label style={{ display: "block", fontSize: 13 }}>Code</label>
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code" style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #d1d5db" }} />
        </div>
      </div>

      <div style={{ marginBottom: 8 }}>
        <label style={{ display: "block", fontSize: 13 }}>Owner (optional)</label>
        <input value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="Owner name" style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #d1d5db" }} />
      </div>

      <div style={{ marginBottom: 8 }}>
        <label style={{ display: "block", fontSize: 13 }}>Mobile (optional)</label>
        <input value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Owner mobile" style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #d1d5db" }} />
      </div>

      {error && <div style={{ color: "#b91c1c", marginBottom: 8 }}>{error}</div>}

      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit" disabled={loading} style={{ padding: "8px 12px", borderRadius: 8, background: "#2563eb", color: "#fff", border: "none", cursor: "pointer" }}>
          {loading ? "Adding..." : "Add Station"}
        </button>
      </div>
    </form>
  );
}
