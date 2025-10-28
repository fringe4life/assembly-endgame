import GameStatus from "./GameStatus";

export default function GameStatusLose() {
  return (
    <GameStatus intent="lose">
      <p className="text-xl">Sorry, you lost.</p>
      <p className="">You lose! Better start learning Assembly 😭</p>
      <p className="text-bold font-effect-fire-animation animate-top self-start pl-1.5">
        section .data
      </p>
      <p className="animate-top self-start pl-3">
        sum dd 0; Variable to store the sum
      </p>

      <p className="text-bold font-effect-fire-animation animate-top self-start pl-1.5">
        section .text
      </p>
      <p className="animate-left self-start pl-3">global _start</p>
      <p className="text-bold font-effect-fire-animation animate-left self-start pl-1.5">
        _start:
      </p>
      <p className="animate-right self-start pl-3">
        mov ecx, 5; Counter set to 5
      </p>
      <p className="animate-right self-start pl-3">
        xor eax, eax; Initialize sum to 0
      </p>
      <p className="animate-bottom font-effect-fire-animation">
        And you thought React was bad enough!! 🤣
      </p>
    </GameStatus>
  );
}
