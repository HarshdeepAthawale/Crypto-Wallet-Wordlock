import React from 'react';

export default function SeedPhraseDisplay({ phrase }) {
  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
      <h2 className="text-xl text-gray-400 mb-4 font-semibold">Memorize the phrase:</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {phrase.map((word, index) => (
          <span key={index} className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md text-2xl shadow-md">
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
