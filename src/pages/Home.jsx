import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md">
        <div className="w-32 h-32 mx-auto mb-6 bg-yellow-400 rounded-full flex items-center justify-center">
          <span className="text-4xl">🔐</span>
        </div>
        
        <h1 className="text-5xl font-extrabold text-yellow-400">
          Crypto Wallet Wordlock
        </h1>
        
        <p className="mt-4 text-lg text-gray-300">
          Test your memory and speed. Memorize the seed phrase and arrange the words correctly before time runs out.
        </p>
        
        <button
          onClick={() => navigate('/game')}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-2xl transition-transform transform hover:scale-105"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
