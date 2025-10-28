import GameStatus from "./GameStatus";

export default function GameStatusWin() {
  return (
    <GameStatus intent="win">
      <p className="text-xl">You win!</p>
      <p>Well done! 🎉</p>
    </GameStatus>
  );
}
