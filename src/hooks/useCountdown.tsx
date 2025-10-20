import { useEffect, useRef, useState, useEffectEvent } from "react";
import { useGameContext } from "./useGameContext";

const useCountdown = () => {
  const { isPlaying, gameOver, difficulty, setGameLost } = useGameContext();
  const [timer, setTimer] = useState<number>(difficulty);

  const timerRef = useRef<number | null>(null);

  const onTimerEnd = useEffectEvent(() => {
    setGameLost(true);
  });

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (timer > 0 && !gameOver && isPlaying) {
        setTimer((prevTime) => prevTime - 1);
      } else {
        onTimerEnd();
        clearTimeout(timerRef?.current ?? undefined);
      }
    }, 1000);
    return () => {
      clearTimeout(timerRef?.current ?? undefined);
    };
  }, [gameOver, timer, isPlaying]);

  function newTimer(time: number) {
    if (timerRef.current) clearTimeout(timerRef.current);
    setTimer(time);
  }

  return { timer, newTimer };
};

export default useCountdown;
