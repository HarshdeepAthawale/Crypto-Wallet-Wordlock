import { wordList } from './phrases.js';

export const generateDecoys = (correctWords, count) => {
  const correctWordsSet = new Set(correctWords);
  const availableDecoys = wordList.filter(word => !correctWordsSet.has(word));
  const shuffledDecoys = [...availableDecoys].sort(() => 0.5 - Math.random());
  return shuffledDecoys.slice(0, count);
};