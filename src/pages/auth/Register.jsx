import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/features/auth/useAuth";

export default function Register() {
  const { register, error, loading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(name, email, password);
    if (success) navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-slate-900 p-8 rounded-lg shadow-lg space-y-4"
      >
        <h1 className="text-2xl font-bold text-white text-center">
          Create Account
        </h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-md bg-slate-800 border border-slate-700 text-white"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-md bg-slate-800 border border-slate-700 text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-md bg-slate-800 border border-slate-700 text-white"
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-md font-semibold"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <p className="text-center text-slate-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
