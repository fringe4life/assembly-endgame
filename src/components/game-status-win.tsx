import { css } from "../../styled-system/css";
import GameStatus from "./game-status";

export default function GameStatusWin() {
  return (
    <GameStatus intent="win">
      <p className={css({ fontSize: "xl" })}>You win!</p>
      <p>Well done! 🎉</p>
    </GameStatus>
  );
}
