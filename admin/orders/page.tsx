
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
    const res = await fetch(`/api/admin/orders?status=${status}`);
    const j = await res.json();
    setOrders(j);
  };

  useEffect(()=>{ fetchOrders(); }, [status]);

  const updateStatus = async (id: string, newStatus: string) => {
    const remarks = remarksById[id] || '';
    await fetch('/api/admin/orders', { method: 'POST', body: JSON.stringify({ id, action: newStatus, remarks }) });
    setRemarksById(prev=> ({...prev, [id]: ''}));
    fetchOrders();
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar active="orders" />

      <div className="flex-1 p-6">
        <h1 className="text-xl font-bold mb-4 capitalize">
          {status.replace("-", " ")} Orders
        </h1>

        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2 border">Order Id</th>
                <th className="p-2 border">Delivery Date</th>
                <th className="p-2 border">Delivery Time</th>
                <th className="p-2 border">Train No</th>
                <th className="p-2 border">Seat/Coach</th>
                <th className="p-2 border">Passenger</th>
                <th className="p-2 border">Mobile</th>
                <th className="p-2 border">PNR</th>
                <th className="p-2 border">Outlet Id</th>
                <th className="p-2 border">Outlet Name</th>
                <th className="p-2 border">Station</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">History</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{o.id}</td>
                  <td className="p-2 border">{o.date}</td>
                  <td className="p-2 border">{o.time}</td>
                  <td className="p-2 border">{o.train}</td>
                  <td className="p-2 border">{o.coach} / {o.seat}</td>
                  <td className="p-2 border">{o.passenger}</td>
                  <td className="p-2 border">{o.mobile}</td>
                  <td className="p-2 border">{o.pnr || "—"}</td>
                  <td className="p-2 border">{o.outletId}</td>
                  <td className="p-2 border">{o.outletName}</td>
                  <td className="p-2 border">{o.station}</td>
                  <td className="p-2 border">{o.type || o.mode}</td>
                  <td className="p-2 border">₹{o.amount}</td>
                  <td className="p-2 border">
                    <button onClick={()=> alert(JSON.stringify(o.history || [], null, 2))} className="text-blue-600 hover:underline">History</button>
                  </td>
                  <td className="p-2 border">
                    <button onClick={()=> setSelectedOrder(o)} className="text-sm text-blue-600 mr-2">View</button>
                    <select
                      onChange={(e) => updateStatus(o.id, e.target.value)}
                      defaultValue=""
                      className="border rounded px-2 py-1 text-sm"
                    >
                      <option value="" disabled>Move to...</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="delivered">Delivered</option>
                      <option value="not_delivered">Not Delivered</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Remarks"
                      value={remarksById[o.id] || ""}
                      onChange={(e) => setRemarksById(prev=>({ ...prev, [o.id]: e.target.value }))}
                      className="ml-2 border rounded px-2 py-1 text-sm"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && <OrderDetailsModal order={selectedOrder} onClose={()=> setSelectedOrder(null)} />}
    </div>
  );
}
