"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function ScoreItem({ question, index }) {
  const trueBarRef = useRef(null);
  const falseBarRef = useRef(null);
  const containerRef = useRef(null);
  const animatedRef = useRef(false);

  const truePercentage = question.score * 100;
  const falsePercentage = (question.oppositeScore || 0) * 100;

  useEffect(() => {
    console.log("ScoreItem effect", index);

    const trueBar = trueBarRef.current;
    const falseBar = falseBarRef.current;
    const container = containerRef.current;
    if (!container) return;

    if (animatedRef.current) return;
    animatedRef.current = true;

    const delay = index * 0.15;
    console.log("ScoreItem: animating", { index, delay });

    gsap.set(container, { opacity: 0, y: 20 });
    gsap.set(trueBar, { width: 0 });
    gsap.set(falseBar, { width: 0 });

    gsap.to(container, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      delay,
      ease: "power2.out",
    });

    gsap.to(trueBar, {
      width: `${truePercentage}%`,
      duration: 0.6,
      delay: delay + 0.2,
      ease: "power2.out",
    });

    gsap.to(falseBar, {
      width: `${falsePercentage}%`,
      duration: 0.6,
      delay: delay + 0.25,
      ease: "power2.out",
    });
  }, [truePercentage, falsePercentage, index]);

  const isTrue = question.answer === true;

  return (
    <div ref={containerRef} className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-zinc-700">{question.question}</span>
      </div>

      {/* Barra TRUE */}
      <div className="flex items-center gap-3">
        <span className="w-12 text-xs font-medium text-green-600">TRUE</span>
        <div className="flex-1 h-3 bg-zinc-200 rounded-sm overflow-hidden">
          <div ref={trueBarRef} className="h-full bg-green-500 rounded-sm" />
        </div>
        <span className="w-16 text-xs text-right text-green-600">
          {truePercentage.toFixed(2)}%
        </span>
      </div>

      {/* Barra FALSE */}
      <div className="flex items-center gap-3">
        <span className="w-12 text-xs font-medium text-red-600">FALSE</span>
        <div className="flex-1 h-3 bg-zinc-200 rounded-sm overflow-hidden">
          <div ref={falseBarRef} className="h-full bg-red-500 rounded-sm" />
        </div>
        <span className="w-16 text-xs text-right text-red-600">
          {falsePercentage.toFixed(2)}%
        </span>
      </div>

      <div className="flex items-center gap-2 mt-1">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
            isTrue ? "bg-green-500/15 text-green-700" : "bg-red-500/15 text-red-700"
          }`}
        >
          Selected: {isTrue ? "TRUE" : "FALSE"}
        </span>
        <span className="text-xs text-zinc-400">
          Confidence: {(question.confidence * 100).toFixed(1)}%
        </span>
      </div>
      {question.instructions && (
        <p className="text-xs text-zinc-400 mt-1 italic line-clamp-2">
          {question.instructions}
        </p>
      )}
    </div>
  );
}
