
"use client";
import React, { useRef } from "react";

export default function OrderDetailsModal({ order, onClose } : { order:any, onClose: ()=>void }) {
  const printRef = useRef<HTMLDivElement|null>(null);

  if(!order) return null;

  const gstPercent = 5;
  const subtotal = order.items ? order.items.reduce((s:any,it:any)=> s + (it.price * it.qty), 0) : (order.amount || 0);
  const gst = +(subtotal * gstPercent / 100).toFixed(2);
  const total = +(subtotal + gst);

  const handlePrint = () => {
    const printContents = printRef.current?.innerHTML;
    if (!printContents) return;
    const w = window.open('', '_blank', 'width=700,height=800');
    if (!w) return;
    w.document.write(`
      <html><head><title>Order ${order.id}</title>
      <style>body{font-family: Arial, sans-serif; padding:20px;} .inv-head{display:flex;align-items:center;gap:12px;} .inv-head img{height:48px;} table{width:100%;border-collapse:collapse;} td,th{padding:6px;border:1px solid #ddd;text-align:left;} .right{text-align:right;}</style>
      </head><body>${printContents}</body></html>
    `);
    w.document.close();
    w.focus();
    setTimeout(()=>{ w.print(); w.close(); }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded shadow p-4 overflow-auto" role="dialog" aria-modal="true">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="RailEats" className="h-12 w-12 rounded-full" />
            <div>
              <h3 className="text-lg font-bold">Order Summary</h3>
              <div className="text-sm text-gray-600">Order ID: <strong>{order.id}</strong></div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handlePrint} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Print</button>
            <button onClick={onClose} className="text-gray-600 px-3 py-1 rounded border">Close</button>
          </div>
        </div>

        <div ref={printRef} className="mt-4">
          <div className="border rounded p-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <div className="font-semibold">Passenger</div>
                <div>{order.passenger || order.customerName}</div>
                <div className="text-xs text-gray-500">Mobile: {order.mobile}</div>
              </div>
              <div>
                <div className="font-semibold">Booking</div>
                <div>Train: {order.train} | Coach/Seat: {order.coach} / {order.seat}</div>
                <div className="text-xs text-gray-500">PNR: {order.pnr || "—"}</div>
              </div>
            </div>

            <div className="mt-3">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-2 text-left">Item</th>
                    <th className="p-2 text-right">Qty</th>
                    <th className="p-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items && order.items.length ? order.items.map((it:any, idx:number)=>(
                    <tr key={idx}>
                      <td className="p-2">{it.name}</td>
                      <td className="p-2 text-right">{it.qty}</td>
                      <td className="p-2 text-right">₹{(it.price*it.qty).toFixed(2)}</td>
                    </tr>
                  )) : (
                    <tr><td className="p-2" colSpan={3}>No line items. Amount shown below.</td></tr>
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="p-2 font-semibold">Subtotal</td>
                    <td className="p-2"></td>
                    <td className="p-2 text-right">₹{subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="p-2">GST ({gstPercent}%)</td>
                    <td className="p-2"></td>
                    <td className="p-2 text-right">₹{gst.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold">Total</td>
                    <td className="p-2"></td>
                    <td className="p-2 text-right font-bold">₹{total.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="mt-3 text-sm">
              <div><strong>Outlet:</strong> {order.outletName} ({order.outletId}) - {order.station}</div>
              <div><strong>Order Mode:</strong> {order.type || order.mode || 'Prepaid'}</div>
            </div>

            <div className="mt-3 text-xs text-gray-500">
              <div>Booking Date: {order.date}</div>
              <div>Order Status: {order.status}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
