import { getFarewellText } from "../utils";
import GameStatus from "./game-status";

interface GameStatusInformationalProps {
  languageName: string;
}

export default function GameStatusInformational({
  languageName,
}: GameStatusInformationalProps) {
  return (
    <GameStatus intent="informational">
      <p>{getFarewellText(languageName)}</p>
    </GameStatus>
  );
}
