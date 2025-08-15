import { useState, useEffect, useRef, useCallback } from 'react';

export const useTimer = (duration, onTimeUp) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const onTimeUpRef = useRef(onTimeUp);
  onTimeUpRef.current = onTimeUp;

  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft <= 0) {
      setIsRunning(false);
      onTimeUpRef.current();
      return;
    }
    const intervalId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft]);

  const startTimer = useCallback(() => {
    setTimeLeft(duration);
    setIsRunning(true);
  }, [duration]);

  const stopTimer = useCallback(() => setIsRunning(false), []);

  return { timeLeft, startTimer, stopTimer };
};
