// components/StationSearchBox.tsx
"use client";
import { useState, useEffect, useRef } from "react";

type Station = {
  StationId: number;
  StationName: string;
  StationCode?: string;
  State?: string;
};

export default function StationSearchBox({ onSelect }: { onSelect?: (s: Station) => void }) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Station[]>([]);
  const [loading, setLoading] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!q) {
      setResults([]);
      return;
    }
    if (timer.current) window.clearTimeout(timer.current);

    timer.current = window.setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search-stations?q=${encodeURIComponent(q)}`);
        const json = await res.json();
        setResults(json?.data || []);
      } catch (err) {
        console.error("Station search error", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => { if (timer.current) window.clearTimeout(timer.current); };
  }, [q]);

  return (
    <div className="relative w-full">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter station name or code..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {loading && <div className="absolute bg-white border p-2 text-sm">Searching…</div>}

      {results.length > 0 && (
        <div className="absolute z-50 bg-white border rounded w-full mt-1 max-h-60 overflow-auto">
          {results.map((s) => (
            <div
              key={s.StationId}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setQ(`${s.StationName} (${s.StationCode || ""})`);
                setResults([]);
                onSelect?.(s);
              }}
            >
              <div className="text-sm font-medium">{s.StationName} <span className="text-xs text-gray-500">({s.StationCode || ""})</span></div>
              <div className="text-xs text-gray-500">{s.State || ""}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
