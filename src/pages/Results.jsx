import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { finalScore, roundsCompleted } = location.state || { finalScore: 0, roundsCompleted: 0 };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-gray-800 p-10 rounded-xl shadow-2xl max-w-lg animate-pop-in">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">Game Over!</h1>
        
        <div className="text-2xl text-gray-200 mb-6">
          <p>You completed <span className="font-bold text-white">{roundsCompleted}</span> rounds.</p>
          <p className="mt-2">Your final score is:</p>
          <p className="text-6xl font-bold text-green-400 mt-2">{finalScore}</p>
        </div>
        
        <button
          onClick={() => navigate('/game')}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-xl transition-transform transform hover:scale-105"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
