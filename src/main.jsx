import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "@/features/auth/useAuth";
import "./index.css";
import { UsersProvider } from "./context/UsersContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UsersProvider>
          <App />
        </UsersProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
