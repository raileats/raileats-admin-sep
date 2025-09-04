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
    const w = window.open("", "_blank", "width=800,height=600");
    if (!w) return;
    w.document.open();
    w.document.write(`<html><head><title>Order ${order.id}</title></head><body>${printContents}</body></html>`);
    w.document.close();
    w.print();
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
            <button onClick={onClose} className="px-2 py-1 rounded hover:bg-gray-100">Close</button>
          </div>
        </div>

        <div ref={printRef} className="mt-4">
          <div className="mb-3">
            <div className="text-sm text-gray-500">Customer</div>
            <div className="font-medium">{order.customer?.name || "-"}</div>
            <div className="text-sm">{order.customer?.phone}</div>
            <div className="text-sm">{order.customer?.email}</div>
          </div>

          <div className="mb-3">
            <div className="text-sm text-gray-500">Items</div>
            <div className="mt-2 divide-y">
              {order.items?.map((it:any) => (
                <div key={it.id} className="py-2 flex justify-between items-center">
                  <div>
                    <div className="font-medium">{it.name}</div>
                    <div className="text-sm text-gray-500">Qty: {it.qty}</div>
                  </div>
                  <div className="font-medium">₹{(it.price * it.qty).toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-3">
            <div className="flex justify-between text-sm"><div>Subtotal</div><div>₹{subtotal.toFixed(2)}</div></div>
            <div className="flex justify-between text-sm"><div>GST ({gstPercent}%)</div><div>₹{gst.toFixed(2)}</div></div>
            <div className="flex justify-between font-semibold"><div>Total</div><div>₹{total.toFixed(2)}</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
