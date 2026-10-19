import { OperationItem } from "./OperationItem";

export function OperationsList({
  operations,
  selectedId,
  loading,
  error,
  onSelect,
}) {
  return (
    <aside className="w-[30%] min-w-[280px] max-w-[400px] border border-zinc-900 bg-zinc-50 overflow-y-auto">
      <div className="py-2">
        {loading && (
          <div className="px-6 py-4 text-sm text-zinc-400">
            Loading operations...
          </div>
        )}
        {error && (
          <div className="px-6 py-4 text-sm text-red-500">Error: {error}</div>
        )}
        {!loading && !error && operations.length === 0 && (
          <div className="px-6 py-4 text-sm text-zinc-400">
            No operations found
          </div>
        )}
        {!loading &&
          !error &&
          operations.map((op) => (
            <OperationItem
              key={op.id}
              operation={op}
              isSelected={selectedId === op.id}
              onClick={() => onSelect(op.id)}
            />
          ))}
      </div>
    </aside>
  );
}
