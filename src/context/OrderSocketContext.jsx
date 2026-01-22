// src/context/OrderSocketContext.jsx
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "@/features/auth/useAuth";

const OrderSocketContext = createContext(null);

export function OrderSocketProvider({ children }) {
  const { user } = useAuth();
  const socketRef = useRef(null);

  useEffect(() => {
    if (!user?.token) return;

    socketRef.current = io(import.meta.env.VITE_SOCKET_URL, {
      auth: { token: user.token },
    });

    socketRef.current.on("connect", () => {
      console.log("Socket connected:", socketRef.current.id);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [user]);

  const joinOrderRoom = (orderId) => {
    socketRef.current?.emit("join-order", orderId);
  };

  const onOrderUpdate = (callback) => {
    if (!socketRef.current) return;

    socketRef.current.on("order-updated", callback);

    return () => {
      socketRef.current.off("order-updated", callback);
    };
  };

  return (
    <OrderSocketContext.Provider value={{ joinOrderRoom, onOrderUpdate }}>
      {children}
    </OrderSocketContext.Provider>
  );
}

export function useOrderSocket() {
  const ctx = useContext(OrderSocketContext);
  if (!ctx) {
    throw new Error("useOrderSocket must be used inside OrderSocketProvider");
  }
  return ctx;
}
