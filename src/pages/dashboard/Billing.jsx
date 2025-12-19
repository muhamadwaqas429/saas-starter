import { CheckCircle } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$0",
    description: "For small teams getting started",
    features: ["1 Project", "Basic Analytics", "Email Support"],
    current: false,
  },
  {
    name: "Pro",
    price: "$29",
    description: "Best for growing teams",
    features: [
      "Unlimited Projects",
      "Advanced Analytics",
      "Team Management",
      "Priority Support",
    ],
    current: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Custom Integrations",
      "Dedicated Manager",
      "SLA Support",
      "Security Compliance",
    ],
    current: false,
  },
];

export default function Billing() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Billing</h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage your subscription and payment details
        </p>
      </div>

      {/* Current Plan */}
      <section className="rounded-lg border border-slate-800 bg-slate-950 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-lg font-medium">Current Plan</h2>
            <p className="text-slate-400 text-sm">
              You are currently on the <strong>Pro</strong> plan
            </p>
          </div>
          <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm hover:bg-indigo-500">
            Manage Subscription
          </button>
        </div>
      </section>

      {/* Plans */}
      <section>
        <h2 className="text-lg font-medium mb-4">Plans</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg border p-6 ${
                plan.current
                  ? "border-indigo-600 bg-indigo-600/5"
                  : "border-slate-800 bg-slate-950"
              }`}
            >
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="text-3xl font-bold mt-2">
                {plan.price}
                {plan.price !== "Custom" && (
                  <span className="text-sm font-normal text-slate-400">
                    /month
                  </span>
                )}
              </p>

              <p className="text-sm text-slate-400 mt-2">{plan.description}</p>

              <ul className="mt-4 space-y-2 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                disabled={plan.current}
                className={`mt-6 w-full rounded-md px-4 py-2 text-sm font-medium ${
                  plan.current
                    ? "bg-slate-800 text-slate-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-500"
                }`}
              >
                {plan.current ? "Current Plan" : "Choose Plan"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Payment Method */}
      <section className="rounded-lg border border-slate-800 bg-slate-950 p-6">
        <h2 className="text-lg font-medium mb-4">Payment Method</h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">Visa ending in 4242</p>
            <p className="text-xs text-slate-500">Expires 04/27</p>
          </div>

          <button className="rounded-md border border-slate-700 px-4 py-2 text-sm hover:bg-slate-900">
            Update Payment Method
          </button>
        </div>
      </section>

      {/* Invoices */}
      <section>
        <h2 className="text-lg font-medium mb-4">Invoices</h2>

        <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-900 text-slate-400">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {["Aug 2025", "Jul 2025", "Jun 2025"].map((month) => (
                <tr key={month}>
                  <td className="px-4 py-3">{month}</td>
                  <td className="px-4 py-3">$29.00</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-green-500/10 px-2 py-1 text-xs text-green-400">
                      Paid
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-indigo-400 hover:underline">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
