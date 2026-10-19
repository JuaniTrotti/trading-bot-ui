export function ActionBadge({ action }) {
  const isBuy = action === "BUY";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
        isBuy ? "bg-green-500/15 text-green-700" : "bg-red-500/15 text-red-700"
      }`}
    >
      {action}
    </span>
  );
}
