import { useState, useCallback } from 'react';
import { wordList } from '../utils/phrases.js';
import { shuffleArray } from '../utils/shuffleArray.js';
import { generateDecoys } from '../utils/generateDecoys.js';

const DIFFICULTY_LEVELS = {
  1: { phraseLength: 6, decoyCount: 3, points: 10 },
  2: { phraseLength: 8, decoyCount: 4, points: 15 },
  3: { phraseLength: 10, decoyCount: 5, points: 20 },
  4: { phraseLength: 12, decoyCount: 6, points: 25 },
};
const MAX_ROUNDS = Object.keys(DIFFICULTY_LEVELS).length;

export const useGameLogic = () => {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('home');
  const [correctPhrase, setCorrectPhrase] = useState([]);
  const [scrambledWords, setScrambledWords] = useState([]);
  
  const startNewRound = useCallback(() => {
    const newRound = round + 1;
    if (newRound > MAX_ROUNDS) {
      setGameState('results');
      return;
    }
    const settings = DIFFICULTY_LEVELS[newRound];
    const newCorrectPhrase = shuffleArray([...wordList]).slice(0, settings.phraseLength);
    const decoys = generateDecoys(newCorrectPhrase, settings.decoyCount);
    const allWordsForBoard = shuffleArray([...newCorrectPhrase, ...decoys]);
    
    setRound(newRound);
    setCorrectPhrase(newCorrectPhrase);
    setScrambledWords(allWordsForBoard);
    setGameState('memorize');
  }, [round]);

  const submitGuess = useCallback((playerGuess) => {
    const isCorrect = JSON.stringify(playerGuess) === JSON.stringify(correctPhrase);
    if (isCorrect) {
      setScore(prevScore => prevScore + DIFFICULTY_LEVELS[round].points);
    }
    if (round >= MAX_ROUNDS) {
      setGameState('results');
    }
    return isCorrect;
  }, [correctPhrase, round]);

  const resetGame = useCallback(() => {
    setScore(0);
    setRound(0);
    setGameState('home');
    setCorrectPhrase([]);
    setScrambledWords([]);
  }, []);

  return {
    round,
    score,
    gameState,
    setGameState,
    correctPhrase,
    scrambledWords,
    startNewRound,
    submitGuess,
    resetGame,
    isGameOver: round >= MAX_ROUNDS || gameState === 'results',
    difficulty: DIFFICULTY_LEVELS[round] || null,
  };
};
