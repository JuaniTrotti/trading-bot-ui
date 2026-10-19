export function Summary({ operation }) {
  if (!operation) return null;

  const allQuestions = [
    ...(operation.buyQuestions || []),
    ...(operation.sellQuestions || []),
  ];

  const avgScore = allQuestions.length
    ? Math.round(
        (allQuestions.reduce((acc, q) => acc + q.score, 0) / allQuestions.length) *
          100
      )
    : 0;

  const trueCount = allQuestions.filter((q) => q.answer).length;
  const totalCount = allQuestions.length;

  return (
    <div className="grid grid-cols-3 gap-6">
      <div>
        <p className="text-xs text-zinc-400 mb-1">Avg. Score</p>
        <p className="text-xl font-medium text-zinc-900">{avgScore}%</p>
      </div>
      <div>
        <p className="text-xs text-zinc-400 mb-1">Decisions</p>
        <p className="text-xl font-medium text-zinc-900">
          {trueCount}/{totalCount} TRUE
        </p>
      </div>
      <div>
        <p className="text-xs text-zinc-400 mb-1">Duration</p>
        <p className="text-xl font-medium text-zinc-900">{operation.duration}</p>
      </div>
    </div>
  );
}
