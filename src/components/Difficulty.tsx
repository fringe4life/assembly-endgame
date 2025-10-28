import { useGameContext } from "../hooks/useGameContext";
import { type DifficultyType } from "../store/endgame-context-provider";
import Button from "./Button";
import clsx from "clsx";

export default function Difficulty() {
  const { difficulty, updateDifficulty, isPlaying } = useGameContext();
  /**
   * @abstract handles change in difficulty
   */
  function handleDifficulty(difficulty: DifficultyType) {
    updateDifficulty(difficulty);
  }
  return (
    <section className="mx-auto mt-4 max-w-80">
      <h2 className="invisible translate-x-full text-center opacity-0">
        Difficulty
      </h2>
      <div className="xs:flex-row group flex flex-col flex-wrap items-center">
        <Button
          disabled={isPlaying}
          onClick={() => handleDifficulty(60)}
          className={clsx({
            "xs:flex-2 bg-green-200 text-center text-sm group-hover:scale-90 hover:scale-110 disabled:cursor-not-allowed disabled:bg-gray-300": true,
            "border bg-green-600 font-semibold text-white disabled:bg-green-300":
              difficulty === 60,
          })}
        >
          Easy: 60s
        </Button>
        <Button
          disabled={isPlaying}
          onClick={() => handleDifficulty(45)}
          className={clsx({
            "xs:flex-3 bg-orange-200 text-center text-sm group-hover:scale-90 hover:scale-110 disabled:cursor-not-allowed disabled:bg-gray-300": true,
            "border bg-orange-600 font-semibold text-white disabled:bg-orange-300":
              difficulty === 45,
          })}
        >
          Medium: 45s
        </Button>
        <Button
          disabled={isPlaying}
          onClick={() => handleDifficulty(30)}
          className={clsx({
            "xs:flex-2 bg-red-200 text-center text-sm group-hover:scale-90 hover:scale-110 disabled:cursor-not-allowed disabled:bg-gray-300": true,
            "border bg-red-600 font-semibold text-white disabled:bg-red-300":
              difficulty === 30,
          })}
        >
          Hard: 30s
        </Button>
      </div>
    </section>
  );
}
