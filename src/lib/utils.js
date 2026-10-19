export function formatDuration(ms) {
  if (!ms || ms < 0) return "-";

  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d ${hours % 24}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}

export function mapTradeToOperation(trade) {
  const symbolFormatted = trade.symbol.replace(/USDT$/, "/USDT");
  const timestamp = trade.closedAt || trade.openedAt;

  const buyQuestions = [];
  const sellQuestions = [];

  // Buy trace questions
  if (trade.buyTrace?.trace?.questions && trade.buyTrace?.trace?.answers) {
    trade.buyTrace.trace.questions.forEach((q, idx) => {
      const answer = trade.buyTrace.trace.answers[idx];
      const score = answer?.answer_value?.noul || 0;
      buyQuestions.push({
        id: `buy-${idx}`,
        question: q.key || `Buy Decision ${idx + 1}`,
        instructions: q.instructions || "",
        answer: answer?.answer_value?.action?.act_probability > 0.5,
        score: score,
        oppositeScore: 1 - score,
        confidence: answer?.answer_value?.confidence || 0,
      });
    });
  }

  // Sell trace questions
  if (trade.sellTrace?.trace?.questions && trade.sellTrace?.trace?.answers) {
    trade.sellTrace.trace.questions.forEach((q, idx) => {
      const answer = trade.sellTrace.trace.answers[idx];
      const score = answer?.answer_value?.noul || 0;
      sellQuestions.push({
        id: `sell-${idx}`,
        question: q.key || `Sell Decision ${idx + 1}`,
        instructions: q.instructions || "",
        answer: answer?.answer_value?.action?.act_probability > 0.5,
        score: score,
        oppositeScore: 1 - score,
        confidence: answer?.answer_value?.confidence || 0,
      });
    });
  }

  // Calcular duración
  const openedAt = new Date(trade.openedAt);
  const closedAt = new Date(trade.closedAt);
  const durationMs = closedAt - openedAt;
  const durationFormatted = formatDuration(durationMs);

  return {
    id: trade._id,
    symbol: symbolFormatted,
    action: trade.side?.toUpperCase() || "UNKNOWN",
    entryPrice: trade.entryPrice,
    exitPrice: trade.exitPrice,
    pnlPct: trade.pnlPct,
    openedAt: trade.openedAt,
    closedAt: trade.closedAt,
    timestamp: timestamp,
    duration: durationFormatted,
    durationMs: durationMs,
    buyQuestions: buyQuestions,
    sellQuestions: sellQuestions,
  };
}
