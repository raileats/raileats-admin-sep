"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AdminSidebar from "@/app/components/admin/AdminSidebar";
import OrderDetailsModal from "@/app/components/admin/OrderDetailsModal";

export default function OrdersPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "booked";

  const [orders, setOrders] = useState<any[]>([]);
  const [remarksById, setRemarksById] = useState<Record<string,string>>({});
  const [selectedOrder, setSelectedOrder] = useState<any|null>(null);

  const fetchOrders = async ()=>{
    try {
      const res = await fetch(`/api/admin/orders?status=${status}`);
      if (!res.ok) {
        console.error("Failed to fetch orders", res.status);
        return;
      }
      const data = await res.json();
      setOrders(data || []);
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  useEffect(()=>{
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const updateRemark = (orderId: string, remark: string) => {
    setRemarksById(prev => ({ ...prev, [orderId]: remark }));
  };

  const saveRemark = async (orderId: string) => {
    try {
      const remark = remarksById[orderId] || "";
      const res = await fetch(`/api/admin/orders/${orderId}/remark`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ remark }),
      });
      if (!res.ok) {
        console.error("Failed to save remark", await res.text());
      } else {
        // optimistic - refetch or update UI as needed
        fetchOrders();
      }
    } catch (err) {
      console.error("Error saving remark", err);
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Orders - {status}</h1>
          <div>
            <button
              onClick={() => fetchOrders()}
              className="px-3 py-1 rounded bg-blue-600 text-white"
            >
              Refresh
            </button>
          </div>
        </div>

        <div className="bg-white rounded shadow overflow-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Items</th>
                <th className="p-3">Total</th>
                <th className="p-3">Actions</th>
                <th className="p-3">Remark</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o: any) => (
                <tr key={o.id} className="border-t">
                  <td className="p-3">{o.id}</td>
                  <td className="p-3">
                    <div className="font-medium">{o.customer?.name}</div>
                    <div className="text-sm text-gray-500">{o.customer?.phone}</div>
                  </td>
                  <td className="p-3">
                    <div className="text-sm text-gray-700">{(o.items || []).length} items</div>
                  </td>
                  <td className="p-3">₹{o.total}</td>
                  <td className="p-3">
                    <button
                      onClick={() => setSelectedOrder(o)}
                      className="px-3 py-1 rounded border hover:bg-gray-100"
                    >
                      View
                    </button>
                  </td>
                  <td className="p-3">
                    <input
                      value={remarksById[o.id] || ""}
                      onChange={(e) => updateRemark(o.id, e.target.value)}
                      className="ml-2 border rounded px-2 py-1 text-sm"
                    />
                    <button
                      onClick={() => saveRemark(o.id)}
                      className="ml-2 px-2 py-1 rounded bg-green-600 text-white text-sm"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== IMPORTANT FIX: pass `open` prop to modal ===== */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          open={!!selectedOrder}                 // <-- ADDED: satisfies required prop
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
