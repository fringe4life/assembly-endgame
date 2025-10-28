import { useGameContext } from "../hooks/useGameContext";
import TimerDisplay from "./TimerDisplay";

export default function GameInfo() {
  const { attemptsLeft, wrongGuessCount } = useGameContext();

  return (
    <>
      <p className="text-center text-xl text-white">
        {attemptsLeft - wrongGuessCount} tries left
      </p>
      <TimerDisplay />
    </>
  );
}
