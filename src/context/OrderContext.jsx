import { createContext, useContext, useState, useEffect } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [pendingOrder, setPendingOrder] = useState(
    JSON.parse(localStorage.getItem("pendingOrder")) || null
  );

  useEffect(() => {
    localStorage.setItem("pendingOrder", JSON.stringify(pendingOrder));
  }, [pendingOrder]);

  const addOrder = (order) => {
    setOrders((prev) => [...prev, order]);
  };

  const savePendingOrder = (order) => {
    setPendingOrder(order);
  };

  const clearPendingOrder = () => setPendingOrder(null);

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        pendingOrder,
        savePendingOrder,
        clearPendingOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => useContext(OrderContext);
