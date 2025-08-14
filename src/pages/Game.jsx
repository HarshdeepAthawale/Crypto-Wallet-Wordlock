import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameLogic } from '../hooks/useGameLogic';
import { useTimer } from '../hooks/useTimer';
import { useAudio } from '../hooks/useAudio';

import SeedPhraseDisplay from '../components/SeedPhraseDisplay';
import GameBoard from '../components/GameBoard';
import ScoreBoard from '../components/ScoreBoard';
import Timer from '../components/Timer';

export default function Game() {
  const navigate = useNavigate();
  const game = useGameLogic();
  const [roundResult, setRoundResult] = useState(null);

  // Audio is optional - will be undefined if files don't exist
  const playSuccessSound = useAudio('/sounds/success.mp3');
  const playFailSound = useAudio('/sounds/fail.mp3');

  const handleTimeUp = () => {
    if (playFailSound) playFailSound();
    setRoundResult('incorrect'); // Treat time up as incorrect
    setTimeout(() => {
        setRoundResult(null);
        if (!game.isGameOver) game.startNewRound();
    }, 2000);
  };

  const { timeLeft, startTimer, stopTimer } = useTimer(30, handleTimeUp);

  useEffect(() => {
    if (game.round === 0 && game.gameState === 'home') {
      game.startNewRound();
    }
  }, [game.round, game.gameState, game.startNewRound]);

  useEffect(() => {
    if (game.gameState === 'memorize') {
      stopTimer();
      const transitionTimer = setTimeout(() => {
        game.setGameState('arrange');
      }, 8000);
      return () => clearTimeout(transitionTimer);
    } else if (game.gameState === 'arrange') {
      startTimer();
    }
  }, [game.gameState, game.setGameState, startTimer, stopTimer]);
  
  useEffect(() => {
    if (game.isGameOver) {
      navigate('/results', { state: { finalScore: game.score, roundsCompleted: game.round } });
    }
  }, [game.isGameOver, navigate, game.score, game.round]);

  const handleSubmission = (playerGuess) => {
    stopTimer();
    const isCorrect = game.submitGuess(playerGuess);
    
    if (isCorrect) {
      if (playSuccessSound) playSuccessSound();
      setRoundResult('correct');
    } else {
      if (playFailSound) playFailSound();
      setRoundResult('incorrect');
    }

    setTimeout(() => {
      setRoundResult(null);
      if (!game.isGameOver) {
        game.startNewRound();
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-sans overflow-hidden">
      <div className="w-full max-w-3xl flex justify-between items-center mb-6">
        {game.gameState !== 'home' && !game.isGameOver ? <ScoreBoard round={game.round} score={game.score} /> : <div/>}
        {game.gameState === 'arrange' && <Timer timeLeft={timeLeft} />}
      </div>
      
      {game.gameState === 'memorize' && (
        <div className="animate-pop-in">
          <SeedPhraseDisplay phrase={game.correctPhrase} />
        </div>
      )}

      {game.gameState === 'arrange' && (
        <GameBoard
          key={game.round}
          words={game.scrambledWords}
          onSubmit={handleSubmission}
          result={roundResult}
        />
      )}
    </div>
  );
}
