import useCountdown from "../hooks/useCountdown";
import { useGameContext } from "../hooks/useGameContext";

export default function GameInfo() {
  const { attemptsLeft, wrongGuessCount } = useGameContext();

  const { timer } = useCountdown();
  return (
    <>
      <p className="text-center text-xl text-white">
        {attemptsLeft - wrongGuessCount} tries left
      </p>
      <p className="animate-top text-center text-xl font-bold text-white">
        Seconds left: {timer}
      </p>
    </>
  );
}
