import { css } from "../../styled-system/css";
import { useGameContext } from "../hooks/use-game-context";
import TimerDisplay from "./timer-display";

export default function GameInfo() {
  const { attemptsLeft, wrongGuessCount } = useGameContext();

  return (
    <>
      <p
        className={css({
          textAlign: "center",
          fontSize: "xl",
          lineHeight: "xl",
          color: "white",
        })}
      >
        {attemptsLeft - wrongGuessCount} tries left
      </p>
      <TimerDisplay />
    </>
  );
}
