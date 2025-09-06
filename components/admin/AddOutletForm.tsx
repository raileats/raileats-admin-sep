// components/admin/AddOutletForm.tsx
"use client";

import React, { useState } from "react";

interface Props {
  onClose?: () => void;
  onAdded?: (newOutlet: { id?: string; name: string; location?: string }) => void;
}

export default function AddOutletForm({ onClose, onAdded }: Props) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const resetForm = () => {
    setName("");
    setLocation("");
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name.trim()) {
      setError("Outlet name is required.");
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace this with real API call
      // Example:
      // const res = await fetch('/api/admin/outlets', { method: 'POST', body: JSON.stringify({ name, location }) });
      // const data = await res.json();

      // Simulate API delay
      await new Promise((r) => setTimeout(r, 800));

      const fakeCreated = { id: String(Date.now()), name: name.trim(), location: location.trim() };

      setSuccess("Outlet added successfully.");
      resetForm();

      // callback to parent if provided
      if (onAdded) onAdded(fakeCreated);

      // auto-close modal if onClose provided
      if (onClose) {
        // small delay so user can see success
        setTimeout(() => {
          onClose();
        }, 500);
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Something went wrong while creating outlet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0 }}>Add Outlet</h3>
        {onClose && (
          <button
            onClick={() => onClose()}
            aria-label="Close"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: 16,
              padding: 6,
            }}
          >
            ✕
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="form" style={{ marginTop: 8 }}>
        <div className="field" style={{ marginBottom: 10 }}>
          <label style={{ display: "block", marginBottom: 6, fontSize: 14 }}>Outlet name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Central Station Canteen"
            className="input"
            style={{
              width: "100%",
              padding: "8px 10px",
              borderRadius: 6,
              border: "1px solid #d1d5db",
            }}
            disabled={loading}
          />
        </div>

        <div className="field" style={{ marginBottom: 10 }}>
          <label style={{ display: "block", marginBottom: 6, fontSize: 14 }}>Location (optional)</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Platform / city / station"
            className="input"
            style={{
              width: "100%",
              padding: "8px 10px",
              borderRadius: 6,
              border: "1px solid #d1d5db",
            }}
            disabled={loading}
          />
        </div>

        {error && (
          <div style={{ color: "#b91c1c", marginBottom: 10, fontSize: 14 }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ color: "#065f46", marginBottom: 10, fontSize: 14 }}>
            {success}
          </div>
        )}

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 8 }}>
          <button
            type="button"
            onClick={() => {
              if (onClose) onClose();
            }}
            className="btn btn-ghost"
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #d1d5db",
              background: "#fff",
              cursor: "pointer",
            }}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "none",
              background: "#2563eb",
              color: "#fff",
              cursor: "pointer",
            }}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Outlet"}
          </button>
        </div>
      </form>
    </div>
  );
}
