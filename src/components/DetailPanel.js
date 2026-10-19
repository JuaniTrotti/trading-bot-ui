"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ActionBadge } from "./ActionBadge";
import { ScoreItem } from "./ScoreItem";
import { Summary } from "./Summary";

export function DetailPanel({ operation }) {
  const headerRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header || !operation) return;

    const items = header.querySelectorAll(".animate-item");
    if (items.length > 0) {
      gsap.set(items, { opacity: 0, y: 15 });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.35,
        stagger: 0.1,
        ease: "power2.out",
      });
    }
  }, [operation]);

  if (!operation) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-zinc-400 text-sm">
          Select an operation to view details
        </p>
      </div>
    );
  }

  const formattedDate = new Date(operation.timestamp).toLocaleString(
    "en-US",
    {
      hour12: false,
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div ref={headerRef} className="content-wrapper py-6 border-b border-zinc-900 shrink-0">
        <div className="content-inner px-0 lg:px-0">
          <div className="animate-item flex items-center gap-4 mb-2">
            <span className="text-xs font-mono text-zinc-400">
              {operation.id.slice(-8)}
            </span>
            <ActionBadge action={operation.action} />
          </div>
          <div className="animate-item flex items-baseline gap-3">
            <span className="text-2xl font-medium text-zinc-900">
              {operation.symbol}
            </span>
          </div>
          <div className="animate-item flex items-center gap-4 mt-2 text-xs text-zinc-400">
            <span>Entry: ${operation.entryPrice?.toFixed(4)}</span>
            <span>Exit: ${operation.exitPrice?.toFixed(4)}</span>
            <span
              className={
                operation.pnlPct >= 0 ? "text-green-600" : "text-red-600"
              }
            >
              PnL: {operation.pnlPct >= 0 ? "+" : ""}
              {operation.pnlPct.toFixed(2)}%
            </span>
            <span className="text-zinc-500">
              Duration: {operation.duration}
            </span>
          </div>
          <p className="animate-item text-xs text-zinc-400 mt-2">
            {formattedDate}
          </p>
        </div>
      </div>

      {/* Questions */}
      <div className="flex-1 overflow-auto bg-white">
        <div className="content-wrapper py-6">
          <div className="content-inner px-0 lg:px-0 space-y-10">
            {/* Buy Decisions */}
            {operation.buyQuestions?.length > 0 && (
              <section>
                <h3 className="text-xs font-medium text-green-600 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  Buy Decision
                </h3>
                <div className="space-y-6">
                  {operation.buyQuestions.map((q, i) => (
                    <ScoreItem key={q.id} question={q} index={i} />
                  ))}
                </div>
              </section>
            )}

            {/* Sell Decisions */}
            {operation.sellQuestions?.length > 0 && (
              <section>
                <h3 className="text-xs font-medium text-red-600 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  Sell Decision
                </h3>
                <div className="space-y-6">
                  {operation.sellQuestions.map((q, i) => (
                    <ScoreItem
                      key={q.id}
                      question={q}
                      index={(operation.buyQuestions?.length || 0) + i}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="content-wrapper py-6 border-t border-zinc-200">
        <div className="content-inner px-0 lg:px-0">
          <Summary operation={operation} />
        </div>
      </div>
    </div>
  );
}
