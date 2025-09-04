
import { NextResponse } from "next/server";

let ORDERS = [
  { id:"RE20225001", date:"2025-09-25", time:"14:30", passenger:"Rajesh", mobile:"9874656564", train:"12345", coach:"B3", seat:"32", outletId:"1001", outletName:"Annapurna Restro", station:"BPL", amount:420, status:"booked", history:[] },
  { id:"RE20225002", date:"2025-09-25", time:"15:00", passenger:"Suresh", mobile:"9874512345", train:"20977", coach:"S2", seat:"18", outletId:"10022", outletName:"Kalyan Kitchen", station:"CNB", amount:310, status:"kitchen", history:[] },
];

export async function GET(req: Request) {
  const url = new URL(req.url);
  const status = url.searchParams.get("status") || "all";
  const filtered = status === "all" ? ORDERS : ORDERS.filter(o => o.status === status);
  return NextResponse.json(filtered);
}

export async function POST(req: Request) {
  const content = await req.text();
  try {
    const data = JSON.parse(content);
    if (data?.id && data?.action) {
      const idx = ORDERS.findIndex(o => o.id === data.id);
      if (idx === -1) return NextResponse.json({ ok:false, error: "order not found" }, { status: 404 });
      const now = new Date().toISOString();
      ORDERS[idx].history.push({ action: data.action, by: data.by || 'admin', at: now, remarks: data.remarks || '' });
      const map = { cancelled: 'cancelled', delivered: 'delivered', not_delivered: 'not_delivered', kitchen: 'kitchen', outfor: 'outfor', booked: 'booked', partial: 'partial' };
      ORDERS[idx].status = map[data.action] || data.action;
      return NextResponse.json({ ok:true, order: ORDERS[idx] });
    }
    if (data?.create) {
      const newOrder = { ...data.create, history: [] };
      ORDERS.unshift(newOrder);
      return NextResponse.json({ ok:true, created: newOrder });
    }
    return NextResponse.json({ ok:false, error:"invalid payload" }, { status: 400 });
  } catch(e) {
    return NextResponse.json({ ok:false, error: String(e) }, { status: 400 });
  }
}
