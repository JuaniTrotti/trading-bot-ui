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
      <main className="flex-1 overflow-hidden py-4 md:py-6 lg:py-10">
        <div className="content-wrapper h-full">
          <div className="content-inner h-full md:h-[calc(100vh-80px)] flex flex-col md:flex-row gap-0">
            {/* Sidebar - Operations List */}
            <div className="h-[35vh] md:h-full lg:h-full md:w-[30%] md:min-w-[280px] md:max-w-[400px] md:shrink-0 overflow-y-auto md:overflow-hidden border-b border-zinc-900 md:border-0">
              <OperationsList
                operations={operations}
                selectedId={selectedId}
                loading={loading}
                error={error}
                onSelect={setSelectedId}
              />
            </div>

            {/* Detail Panel */}
            <section className="flex-1 border-0 md:border border-zinc-900 bg-zinc-50 overflow-hidden">
              <DetailPanel key={selectedId} operation={selectedOperation} />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
