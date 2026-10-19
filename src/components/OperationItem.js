import { ActionBadge } from "./ActionBadge";

export function OperationItem({ operation, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-6 py-4 text-left border-b border-zinc-900 transition-colors ${
        isSelected
          ? "bg-zinc-100 border-l-2 border-l-amber-600"
          : "hover:bg-zinc-50 border-l-2 border-l-transparent"
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="font-medium text-zinc-900 truncate">
          {operation.symbol}
        </span>
        <ActionBadge action={operation.action} />
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-zinc-400 truncate">{operation.duration}</span>
        <span
          className={`text-xs font-medium ${
            operation.pnlPct >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {operation.pnlPct >= 0 ? "+" : ""}
          {operation.pnlPct.toFixed(2)}%
        </span>
      </div>
    </button>
  );
}
