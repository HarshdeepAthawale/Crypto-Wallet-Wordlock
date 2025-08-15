import React from 'react';

export default function Timer({ timeLeft }) {
  return (
    <div className="flex items-center gap-2 text-2xl font-bold text-red-500">
       <span>Time: {timeLeft}s</span>
    </div>
  );
}
