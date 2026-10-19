"use client";

import { useState, useEffect } from "react";
import { fetchOperations } from "@/lib/api";
import { mapTradeToOperation } from "@/lib/utils";
import { OperationsList } from "@/components/OperationsList";
import { DetailPanel } from "@/components/DetailPanel";

export default function Home() {
  const [operations, setOperations] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const selectedOperation = operations.find((op) => op.id === selectedId);

  useEffect(() => {
    async function loadOperations() {
      try {
        const trades = await fetchOperations();
        const mapped = trades.map(mapTradeToOperation);
        setOperations(mapped);
        if (mapped.length > 0) {
          setSelectedId(mapped[0].id);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadOperations();
  }, []);

  return (
    <div className="h-screen flex flex-col bg-zinc-50">
      <main className="flex-1 overflow-hidden py-10">
        <div className="content-wrapper h-full">
          <div className="content-inner h-[calc(100vh-80px)] flex gap-0">
            {/* Sidebar */}
            <OperationsList
              operations={operations}
              selectedId={selectedId}
              loading={loading}
              error={error}
              onSelect={setSelectedId}
            />

            {/* Detail */}
            <section className="flex-1 border border-zinc-900 border-l-0 bg-zinc-50 overflow-hidden">
              <DetailPanel key={selectedId} operation={selectedOperation} />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
