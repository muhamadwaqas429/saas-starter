import React, { useEffect, useState } from "react";
import api from "@/api/axios";
import { useAuth } from "@/features/auth/useAuth";
import { toast } from "react-hot-toast";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    if (!user?.token) return;
    try {
      const res = await api.get("/orders/me", {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const data = res.data?.data || [];
      setOrders(data);
    } catch (err) {
      console.error("Fetch orders error:", err);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  if (loading)
    return (
      <div className="p-4 text-center text-gray-600">Loading orders...</div>
    );

  if (!orders.length)
    return <div className="p-4 text-center text-gray-600">No orders found</div>;

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>

      {orders.map((order) => (
        <Card
          key={order._id}
          className="shadow-lg hover:shadow-2xl transition-shadow"
        >
          <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="space-y-1">
              <CardTitle className="text-sm text-gray-500">
                Order ID: {order._id}
              </CardTitle>
              <CardDescription className="text-sm text-gray-500">
                Placed: {new Date(order.createdAt).toLocaleString()}
              </CardDescription>
              <Badge
                variant={
                  order.status === "cancelled"
                    ? "destructive"
                    : order.status === "placed"
                    ? "warning"
                    : "success"
                }
                className="mt-1"
              >
                {order.status}
              </Badge>
            </div>
            <div className="mt-2 md:mt-0 font-semibold text-lg">
              Total: ${order.totalAmount.toFixed(2)}
            </div>
          </CardHeader>

          <CardContent className="mt-4 space-y-4">
            {order.items.map((orderItem, idx) => {
              const item = orderItem.item;
              if (!item) return null; // safeguard if not populated
              return (
                <Card key={idx} className="bg-gray-50 p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full md:w-40 h-32 object-cover rounded-lg"
                      />
                    )}

                    <div className="flex-1 space-y-1">
                      <p className="text-sm text-gray-500">
                        Section: {item.sectionName || "N/A"}
                      </p>
                      <p className="font-semibold text-lg">
                        {item.name} (${orderItem.price.toFixed(2)}) - Qty:{" "}
                        {orderItem.quantity}
                      </p>
                      {item.description && (
                        <p className="text-gray-600 text-sm">
                          {item.description}
                        </p>
                      )}

                      {orderItem.selectedOptions?.length > 0 && (
                        <div className="mt-2 space-y-1 pl-4 border-l-2 border-gray-300">
                          {orderItem.selectedOptions.map((opt, i) => (
                            <div key={i}>
                              <p className="text-sm font-semibold">
                                {opt.option.name}
                              </p>
                              <p className="text-sm text-gray-600 pl-2">
                                Choice: {opt.choice.name}{" "}
                                {opt.choice.price
                                  ? `($${opt.choice.price.toFixed(2)})`
                                  : "(default $10)"}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </CardContent>

          <CardContent className="mt-4 border-t pt-3 space-y-1 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Customer:</span>{" "}
              {order.customerDetails.name}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {order.customerDetails.phone}
            </p>
            <p>
              <span className="font-semibold">Address:</span>{" "}
              {order.customerDetails.address}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
