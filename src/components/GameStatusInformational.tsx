import GameStatus from "./GameStatus";
import { getFarewellText } from "../utils";

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
