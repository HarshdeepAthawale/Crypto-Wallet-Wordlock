import { useState, useCallback } from 'react';

export const useAudio = (url) => {
  const [audio] = useState(() => {
    try {
      return new Audio(url);
    } catch (error) {
      console.warn(`Audio file not found: ${url}`);
      return null;
    }
  });
  
  const play = useCallback(() => {
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(e => console.error("Error playing audio:", e));
    }
  }, [audio]);
  
  return audio ? play : null;
};
