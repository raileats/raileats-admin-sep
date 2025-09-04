"use client";
import React, { useRef } from "react";

export default function OrderDetailsModal({ order, onClose } : { order:any, onClose: ()=>void }) {
  const printRef = useRef<HTMLDivElement|null>(null);
  if (!order) return null;

  const subtotal = order.items ? order.items.reduce((s:any,it:any)=> s + (it.price * it.qty), 0) : (order.amount || 0);
  const gstPercent = 5;
  const gst = +(subtotal * gstPercent / 100).toFixed(2);
  const total = +(subtotal + gst);

  const handlePrint = () => {
    const contents = printRef.current?.innerHTML;
    if (!contents) return;
    const w = window.open("", "_blank", "width=800,height=600");
    if (!w) return;
    w.document.write(`<html><head><title>Order ${order.id}</title></head><body>${contents}</body></html>`);
    w.document.close();
    w.print();
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ margin: 0 }}>Order Summary</h3>
            <div style={{ fontSize: 13, color: "#6b7280" }}>Order ID: <strong>{order.id}</strong></div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button className="print-btn" onClick={handlePrint}>Print</button>
            <button className="btn btn-ghost" onClick={onClose}>Close</button>
          </div>
        </div>

        <div ref={printRef} style={{ marginTop: 12 }}>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: "#6b7280" }}>Customer</div>
            <div style={{ fontWeight: 600 }}>{order.customer?.name || "-"}</div>
            <div style={{ fontSize: 13 }}>{order.customer?.phone}</div>
            <div style={{ fontSize: 13 }}>{order.customer?.email}</div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: "#6b7280" }}>Items</div>
            <div style={{ marginTop: 8 }}>
              {order.items?.map((it:any) => (
                <div key={it.id || it.name} className="order-item">
                  <div>
                    <div style={{ fontWeight: 600 }}>{it.name}</div>
                    <div style={{ fontSize: 13, color: "#6b7280" }}>Qty: {it.qty}</div>
                  </div>
                  <div style={{ fontWeight: 600 }}>₹{(it.price * it.qty).toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid #eef2f7", paddingTop: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}><div>Subtotal</div><div>₹{subtotal.toFixed(2)}</div></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}><div>GST ({gstPercent}%)</div><div>₹{gst.toFixed(2)}</div></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, marginTop: 6 }}><div>Total</div><div>₹{total.toFixed(2)}</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
