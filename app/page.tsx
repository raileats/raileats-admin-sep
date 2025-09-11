// app/page.tsx
"use client";

import { useState } from "react";
import StationSearchBox from "@/components/StationSearchBox";
import Link from "next/link";

export default function HomePage() {
  const [searchType, setSearchType] = useState<"pnr" | "train" | "station">("station");
  const [selectedStation, setSelectedStation] = useState<any | null>(null);
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (searchType === "station") {
      // if user selected a station from dropdown, prefer that
      if (selectedStation) {
        // redirect or run search for selectedStation
        // example: redirect to a results page (implement route as needed)
        // router.push(`/search?type=station&id=${selectedStation.StationId}`);
        alert(`Search by Station: ${selectedStation.StationName} (${selectedStation.StationCode})`);
      } else {
        // fallback: use typed query
        alert(`Search stations for: ${query}`);
      }
    } else if (searchType === "train") {
      alert(`Search trains for: ${query}`);
    } else {
      alert(`Check PNR: ${query}`);
    }
  }

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-semibold mb-2">RailEats</h1>
        <p className="mb-6 text-gray-600">Search PNR / Train or Stations and order on the go.</p>

        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input type="radio" name="searchType" checked={searchType === "pnr"} onChange={() => { setSearchType("pnr"); setSelectedStation(null); setQuery(""); }} />
                <span> Pnr </span>
              </label>

              <label className="flex items-center gap-2">
                <input type="radio" name="searchType" checked={searchType === "train"} onChange={() => { setSearchType("train"); setSelectedStation(null); setQuery(""); }} />
                <span> Train </span>
              </label>

              <label className="flex items-center gap-2">
                <input type="radio" name="searchType" checked={searchType === "station"} onChange={() => { setSearchType("station"); setSelectedStation(null); setQuery(""); }} />
                <span> Station </span>
              </label>
            </div>

            <div>
              {searchType === "station" ? (
                <StationSearchBox
                  onSelect={(s) => {
                    setSelectedStation(s);
                    setQuery(s ? `${s.StationName} (${s.StationCode || ""})` : "");
                  }}
                />
              ) : (
                <input
                  type="text"
                  placeholder={searchType === "train" ? "Enter train number or name..." : "Enter PNR number..."}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              )}
            </div>

            <div className="flex justify-end">
              <button type="submit" className="px-4 py-2 bg-black text-white rounded">
                Search
              </button>
            </div>

            {selectedStation && (
              <div className="mt-2 text-sm text-gray-700">
                Selected station: <strong>{selectedStation.StationName} ({selectedStation.StationCode})</strong>
              </div>
            )}
          </form>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-medium mb-3">Explore Railway Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/track" className="p-4 border rounded text-center">Track Live Train</Link>
            <Link href="/pnr" className="p-4 border rounded text-center">Check PNR Status</Link>
            <Link href="/platform" className="p-4 border rounded text-center">Platform Locator</Link>
            <Link href="/timetable" className="p-4 border rounded text-center">Train Time Table</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
