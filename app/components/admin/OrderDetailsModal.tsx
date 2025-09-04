"use client";

import React, { useEffect, useState } from "react";

type OrderItem = {
  id: string;
  name: string;
  qty: number;
  price: number;
};

type Customer = {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
};

export type Order = {
  id: string;
  status: string;
  total: number;
  createdAt?: string;
  items: OrderItem[];
  customer?: Customer;
  notes?: string;
};

type Props = {
  orderId: string | null;
  open: boolean;
  onClose: () => void;
};

export default function OrderDetailsModal({ orderId, open, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !orderId) return;
    let cancelled = false;

    async function fetchOrder() {
      setLoading(true);
      setError(null);
      try {
        // adjust endpoint as per your API
        const res = await fetch(`/api/admin/orders/${orderId}`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Failed to fetch order: ${res.status} ${text}`);
        }
        const data: Order = await res.json();
        if (!cancelled) setOrder(data);
      } catch (err: any) {
        if (!cancelled) setError(err.message || "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchOrder();
    return () => {
      cancelled = true;
    };
  }, [open, orderId]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* modal */}
      <div className="relative z-10 max-w-3xl w-full mx-4 bg-white rounded-lg shadow-lg overflow-auto max-h-[80vh]">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">
            Order Details {order?.id ? `#${order.id}` : ""}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="px-3 py-1 rounded hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <div className="p-4">
          {loading && (
            <div className="py-8 text-center">
              <div className="inline-block animate-spin w-8 h-8 border-2 border-gray-300 border-t-gray-700 rounded-full" />
              <div className="mt-2 text-sm">Loading order...</div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded">
              Error: {error}
            </div>
          )}

          {!loading && !error && order && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="font-medium">{order.customer?.name || "-"}</p>
                  <p className="text-sm">{order.customer?.phone}</p>
                  <p className="text-sm">{order.customer?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Order Info</p>
                  <p className="font-medium">Status: {order.status}</p>
                  <p className="text-sm">Total: ₹{order.total}</p>
                  <p className="text-sm">
                    Date: {order.createdAt ? new Date(order.createdAt).toLocaleString() : "-"}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500">Items</p>
                <div className="mt-2 divide-y">
                  {order.items.map((it) => (
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

              {order.notes && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Notes</p>
                  <div className="mt-1 p-2 bg-gray-50 rounded text-sm">{order.notes}</div>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded border hover:bg-gray-50"
                >
                  Close
                </button>
                {/* Example: Admin action */}
                <button
                  onClick={() => {
                    // example action: mark as delivered - implement API call as needed
                    alert("Implement admin action here");
                  }}
                  className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                >
                  Mark Delivered
                </button>
              </div>
            </>
          )}

          {!loading && !error && !order && (
            <div className="text-center py-8 text-sm text-gray-500">No data</div>
          )}
        </div>
      </div>
    </div>
  );
}
