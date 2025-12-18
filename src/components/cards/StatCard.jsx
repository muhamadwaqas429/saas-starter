export default function StatCard({
  title,
  value,
  delta,
  description,
}) {
  const isNegative = delta?.startsWith("-");

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            {title}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">
            {value}
          </h3>
        </div>

        {delta && (
          <span
            className={`text-xs font-medium ${
              isNegative ? "text-rose-600" : "text-emerald-600"
            }`}
          >
            {delta}
          </span>
        )}
      </div>

      {description && (
        <p className="mt-3 text-sm text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}
