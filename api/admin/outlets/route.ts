
import { NextResponse } from "next/server";

let OUTLETS = [
  { code: "1001", name:"Annapurna Restro", station:"BPL", owner:"Ramesh Kumar", mobile:"9748587585", fssai:"22267384774757" },
  { code: "10022", name:"Kalyan Kitchen", station:"CNB", owner:"Vineet Singh", mobile:"77457587656", fssai:"56474854858587" },
];

export async function GET() {
  return NextResponse.json(OUTLETS);
}

export async function POST(req: Request) {
  const body = await req.text();
  try {
    const data = JSON.parse(body);
    OUTLETS = [ ...OUTLETS, data ];
    return NextResponse.json({ ok:true, created: data });
  } catch(e) {
    return NextResponse.json({ ok:false, error: "invalid" }, { status: 400 });
  }
}
