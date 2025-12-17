import React, { useState } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import InputField from "@/components/forms/InputField";
import Button from "@/components/buttons/Button";
import { useAuth } from "@/features/auth/useAuth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { doLogin } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = { name, email, role: "user" };
    doLogin(newUser);
    navigate("/dashboard");
  };

  return (
    <AuthLayout>
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-semibold mb-6">Register</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <InputField label="Full Name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          <InputField label="Email" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputField label="Password" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit">Register</Button>
        </form>
      </div>
    </AuthLayout>
  );
}
