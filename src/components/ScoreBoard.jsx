import React from 'react';

export default function ScoreBoard({ round, score }) {
  return (
    <div className="flex justify-between w-full max-w-3xl mb-6 text-2xl font-bold text-white px-2">
      <div>Round: <span className="text-yellow-400">{round || 0}</span></div>
      <div>Score: <span className="text-green-400">{score}</span></div>
    </div>
  );
}
