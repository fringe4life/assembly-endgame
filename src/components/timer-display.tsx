import { ViewTransition } from "react";
import { css } from "../../styled-system/css";
import useCountdown from "../hooks/use-countdown";

export default function TimerDisplay() {
  const { timer } = useCountdown();

  return (
    <ViewTransition enter="digit-enter" exit="digit-exit" name="timer-display">
      <p
        className={css({
          textAlign: "center",
          fontSize: "xl",
          fontWeight: "bold",
          color: "white",
        })}
      >
        Seconds left: {timer}
      </p>
    </ViewTransition>
  );
}
