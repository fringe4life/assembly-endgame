import { ViewTransition } from "react";
import useCountdown from "../hooks/useCountdown";

export default function TimerDisplay() {
  const { timer } = useCountdown();

  return (
    <ViewTransition enter="digit-enter" exit="digit-exit" name="timer-display">
      <p className="text-center text-xl font-bold text-white">
        Seconds left: {timer}
      </p>
    </ViewTransition>
  );
}
