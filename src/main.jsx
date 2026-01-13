// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// ✅ Import the AuthProvider (context component)
import { AuthProvider } from "@/features/auth/useAuth";

import "./index.css";
import { UsersProvider } from "@/context/UsersContext";
import { OrderProvider } from "@/context/OrderContext";
import { OrderSocketProvider } from "@/context/OrderSocketContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UsersProvider>
          <OrderProvider>
            <OrderSocketProvider>
              <App />
            </OrderSocketProvider>
          </OrderProvider>
        </UsersProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
