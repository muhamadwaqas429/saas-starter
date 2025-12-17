import React, { useState } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import InputField from "@/components/forms/InputField";
import Button from "@/components/buttons/Button";
import { useAuth } from "@/features/auth/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { doLogin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate login
    const dummyUser = { name: "Admin User", email, role: "admin" };
    doLogin(dummyUser);

    navigate("/dashboard"); // redirect to dashboard
  };

  return (
    <AuthLayout>
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-semibold mb-6">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <InputField
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
        </form>
      </div>
    </AuthLayout>
  );
}
