import React from "react";

export default function MultiplayerResult({ results }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white">
      <h1 className="text-3xl font-bold mb-8">Game Results</h1>
      <table className="w-full max-w-2xl border-collapse border border-neutral-700">
        <thead>
          <tr className="bg-neutral-800">
            <th className="p-3 border border-neutral-700">Player</th>
            <th className="p-3 border border-neutral-700">Score</th>
            <th className="p-3 border border-neutral-700">Penalty</th>
            <th className="p-3 border border-neutral-700">Efficiency (%)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(results).map(([username, stats], index) => (
            <tr key={index} className="bg-neutral-900">
              <td className="p-3 border border-neutral-700">{username}</td>
              <td className="p-3 border border-neutral-700">{stats.score}</td>
              <td className="p-3 border border-neutral-700">{stats.penalty}</td>
              <td className="p-3 border border-neutral-700">{stats.targetEfficiency.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}