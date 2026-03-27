import { css, cx } from "../../styled-system/css";
import GameStatus from "./game-status";

export default function GameStatusLose() {
  return (
    <GameStatus intent="lose">
      <p className={css({ fontSize: "xl" })}>Sorry, you lost.</p>
      <p className="">You lose! Better start learning Assembly 😭</p>
      <p
        className={cx(
          css({
            fontWeight: "bold",
            animation: "top",
            alignSelf: "flex-start",
            pl: "1.5",
          }),
          "font-effect-fire-animation"
        )}
      >
        section .data
      </p>
      <p
        className={css({ animation: "top", alignSelf: "flex-start", pl: "3" })}
      >
        sum dd 0; Variable to store the sum
      </p>

      <p
        className={cx(
          css({
            fontWeight: "bold",
            animation: "top",
            alignSelf: "flex-start",
            pl: "1.5",
          }),
          "font-effect-fire-animation"
        )}
      >
        section .text
      </p>
      <p
        className={css({ animation: "left", alignSelf: "flex-start", pl: "3" })}
      >
        global _start
      </p>
      <p
        className={cx(
          css({
            fontWeight: "bold",
            animation: "left",
            alignSelf: "flex-start",
            pl: "1.5",
          }),
          "font-effect-fire-animation"
        )}
      >
        _start:
      </p>
      <p
        className={css({
          animation: "right",
          alignSelf: "flex-start",
          pl: "3",
        })}
      >
        mov ecx, 5; Counter set to 5
      </p>
      <p
        className={css({
          animation: "right",
          alignSelf: "flex-start",
          pl: "3",
        })}
      >
        xor eax, eax; Initialize sum to 0
      </p>
      <p
        className={cx(
          css({
            animation: "bottom",
            alignSelf: "flex-start",
          }),
          "font-effect-fire-animation"
        )}
      >
        And you thought React was bad enough!! 🤣
      </p>
    </GameStatus>
  );
}
