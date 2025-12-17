import React from "react";
import Button from "@/components/buttons/Button";
import StatCard from "@/components/cards/StatCard";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="text-center py-20 bg-white shadow">
        <h1 className="text-4xl font-bold mb-4">Welcome to SaaS Starter</h1>
        <p className="text-lg mb-6">
          Build your dashboard and apps faster with our starter template.
        </p>
        <Button onClick={() => (window.location.href = "/auth/register")}>
          Get Started
        </Button>
      </section>

      {/* Features Section */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard label="Easy Setup" value="Setup in minutes" />
          <StatCard label="Responsive UI" value="Works on all devices" />
          <StatCard label="State Management" value="Redux Toolkit ready" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-20 bg-white shadow mt-10">
        <h2 className="text-3xl font-semibold mb-4">Start building today</h2>
        <Button onClick={() => (window.location.href = "/auth/register")}>
          Register Now
        </Button>
      </section>
    </div>
  );
}
