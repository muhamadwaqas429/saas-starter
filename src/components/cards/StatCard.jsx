
//display 1 KPI CARD 
// TITEL VALUE trend

// Used in dashboards

// Reusable for analytics, reports, finance
export default function StatCard({ title, value, trend }) {
  
  const isPositive = trend?.startsWith("+");

  return (
    <div className="group rounded-xl border border-slate-800 bg-slate-950 p-5 transition hover:border-slate-700 hover:bg-slate-900">
      {/* Title */}
      <p className="text-sm text-slate-400">
        {title}
      </p>

      {/* Value */}
      <div className="mt-2 flex items-end justify-between">
        <h2 className="text-2xl font-semibold text-white tracking-tight">
          {value}
        </h2>

        {trend && (
          <span
            className={`text-xs font-medium ${
              isPositive ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {trend}
          </span>
        )}
      </div>

      {/* Divider */}
      <div className="mt-4 h-px w-full bg-slate-800" />

      {/* Footer */}
      <p className="mt-3 text-xs text-slate-500">
        Compared to last period
      </p>
    </div>
  );
}
