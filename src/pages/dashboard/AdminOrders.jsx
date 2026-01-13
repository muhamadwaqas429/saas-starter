// src/pages/dashboard/AdminOrders.jsx
import { useEffect, useState } from "react";
import api from "@/api/axios";
import { toast } from "react-hot-toast";
import { useOrderSocket } from "@/context/OrderSocketContext";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ChevronUp, X } from "lucide-react";

const STATUS = [
  "placed",
  "confirmed",
  "preparing",
  "ready",
  "completed",
  "cancelled",
];
const statusStyle = {
  placed: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  preparing: "bg-purple-100 text-purple-700",
  ready: "bg-indigo-100 text-indigo-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState({});
  const { joinOrderRoom, onOrderUpdate } = useOrderSocket();

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/admin/all?page=1&limit=20");
      const data = res.data?.data || [];
      setOrders(data);
      data.forEach((o) => joinOrderRoom(o._id));
    } catch {
      toast.error("Failed to load orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    return onOrderUpdate(({ orderId, status }) => {
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status } : o))
      );
    });
  }, [onOrderUpdate]);

  const updateStatus = async (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
    );
    try {
      await api.put(`/orders/admin/${orderId}/status`, { status: newStatus });
      toast.success("Order updated");
    } catch {
      toast.error("Update failed");
      fetchOrders();
    }
  };

  const cancelOrder = async (orderId) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;
    setOrders((prev) =>
      prev.map((o) => (o._id === orderId ? { ...o, status: "cancelled" } : o))
    );
    try {
      await api.put(`/orders/admin/${orderId}/cancel`);
      toast.success("Order cancelled");
    } catch {
      toast.error("Failed to cancel order");
      fetchOrders();
    }
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Orders Management</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order) => {
            return (
              <>
                <TableRow key={order._id}>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleExpand(order._id)}
                    >
                      {expanded[order._id] ? <ChevronUp /> : <ChevronDown />}
                    </Button>
                  </TableCell>
                  <TableCell>#{order._id.slice(-6)}</TableCell>
                  <TableCell>{order.user?.name || "Guest"}</TableCell>
                  <TableCell>
                    <Badge className={statusStyle[order.status]}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Select
                      value={order.status}
                      onValueChange={(v) => updateStatus(order._id, v)}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {order.status !== "cancelled" && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => cancelOrder(order._id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>

                {expanded[order._id] &&
                  order.items.map((it, idx) => (
                    <TableRow key={`${order._id}-item-${idx}`}>
                      <TableCell></TableCell>
                      <TableCell colSpan={2}>{it.item.name}</TableCell>
                      <TableCell>{it.item.sectionName}</TableCell>
                      <TableCell>${it.price}</TableCell>
                      <TableCell>Qty {it.quantity}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  ))}

                {expanded[order._id] && (
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell colSpan={2}>
                      {order.customerDetails.name}
                    </TableCell>
                    <TableCell>{order.customerDetails.phone}</TableCell>
                    <TableCell colSpan={2}>
                      {order.customerDetails.address}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                )}
              </>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
