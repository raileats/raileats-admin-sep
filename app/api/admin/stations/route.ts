// app/api/admin/stations/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type Station = {
  id: string;
  code?: string;
  name: string;
  state: string;
  category?: string;
  owner?: string;
  mobile?: string;
};

let STATIONS: Station[] = [
  {
    id: "st-1",
    code: "ST001",
    name: "Central Station",
    state: "Maharashtra",
    category: "Major",
    owner: "RailEats",
    mobile: "9999999999",
  },
  {
    id: "st-2",
    code: "ST002",
    name: "North Junction",
    state: "Karnataka",
    category: "Minor",
    owner: "Vendor A",
    mobile: "",
  },
];

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// helper json
function jsonResponse(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id") || undefined;
  const code = url.searchParams.get("code") || undefined;
  const category = url.searchParams.get("category") || undefined;
  const q = url.searchParams.get("q") || undefined;

  try {
    if (supabase) {
      let query = supabase
        .from("stations")
        .select("*")
        .order("StationId", { ascending: true })
        .range(0, 9999);

      if (id) query = query.eq("StationId", Number(id));
      if (code) query = query.ilike("StationCode", code);

      if (category) {
        query = query.ilike("Category", category);
      }

      if (q) {
        query = query.or(
          `StationName.ilike.%${q}%,StationCode.ilike.%${q}%,State.ilike.%${q}%,District.ilike.%${q}%`
        );
      }

      const { data, error } = await query;

      if (!error) {
        return jsonResponse({ data: data || [] });
      }
    }
  } catch (err) {
    // fallback old local data below
  }

  let out = STATIONS.slice();

  if (id) out = out.filter((s) => s.id === id);
  if (code)
    out = out.filter(
      (s) => (s.code || "").toLowerCase() === code.toLowerCase()
    );
  if (category)
    out = out.filter(
      (s) => (s.category || "").toLowerCase() === category.toLowerCase()
    );
  if (q) {
    const ql = q.toLowerCase();
    out = out.filter((s) =>
      (
        (s.name || "") +
        " " +
        (s.code || "") +
        " " +
        (s.state || "") +
        " " +
        (s.category || "")
      )
        .toLowerCase()
        .includes(ql)
    );
  }

  const sort = url.searchParams.get("sort");
  if (sort === "name") out = out.sort((a, b) => a.name.localeCompare(b.name));

  return jsonResponse({ data: out });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Bulk upload
    if (body?.bulk && Array.isArray(body.bulk)) {
      const created: Station[] = [];
      for (const item of body.bulk) {
        // require name & state
        const name = (item.name || "").toString().trim();
        const state = (item.state || "").toString().trim();
        if (!name || !state) continue;
        const id =
          (item.id && item.id.toString().trim()) ||
          "st-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
        const newStation: Station = {
          id,
          name,
          state,
          code: (item.code || "").toString(),
          category: (item.category || "").toString(),
          owner: (item.owner || "").toString(),
          mobile: (item.mobile || "").toString(),
        };
        STATIONS.unshift(newStation);
        created.push(newStation);
      }
      return jsonResponse({ data: created }, 201);
    }

    // Single object
    const { name, state, category, code, owner, mobile, id: providedId } = body;
    if (!name || !state) {
      return jsonResponse({ error: "name and state are required" }, 400);
    }
    const id = providedId || "st-" + Date.now();
    const newStation: Station = {
      id,
      name,
      state,
      category: category || "",
      code: code || "",
      owner: owner || "",
      mobile: mobile || "",
    };
    STATIONS.unshift(newStation);
    return jsonResponse({ data: newStation }, 201);
  } catch (err: any) {
    return jsonResponse({ error: err?.message || "invalid request" }, 400);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) return jsonResponse({ error: "id required" }, 400);

    const idx = STATIONS.findIndex((s) => s.id === id);
    if (idx === -1) return jsonResponse({ error: "not found" }, 404);

    const removed = STATIONS.splice(idx, 1)[0];
    return jsonResponse({ data: removed });
  } catch (err: any) {
    return jsonResponse({ error: err?.message || "failed" }, 500);
  }
}
