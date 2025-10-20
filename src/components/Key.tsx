import { cva, type VariantProps } from "cva";
import { useGameContext } from "../hooks/useGameContext";
import type { MouseEventHandler } from "react";
import { isButton } from "../utils";

const button = cva({
  base: "text-neutral-900  uppercase font-semibold w-10 h-10 rounded-md",
  variants: {
    intent: {
      unpressed:
        "bg-amber-400 hover:scale-110 cursor-pointer active:translate-y-0 hover:-translate-y-0.5 hover:bg-amber-500 hover:shadow-sm hover:shadow-gray-500 scale-105",
      correct: "bg-green-600 cursor-not-allowed scale-0.9 ",
      wrong: "bg-red-500 cursor-not-allowed scale-0.9",
    },
  },
  defaultVariants: {
    intent: "unpressed",
  },
});

/**
 * interface for Key class
 */
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

const Key = ({ className, intent, children }: ButtonProps) => {
  const { isPlaying, setIsPlaying, setGuessedLetters } = useGameContext();

  /**
   * @abstract used to check if the letter is in the word user is trying to guess
   * @param e the event triggered by the users click
   * @returns void
   */
  const handleKeyClick: MouseEventHandler<HTMLButtonElement> = (e): void => {
    if (!isPlaying) setIsPlaying(true);
    const target = e.target as HTMLElement;
    if (!isButton(target)) {
      return;
    }
    const letter = target.textContent as string;
    // need to check if it is part(s) of word
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  };
  return (
    <button
      type="button"
      onClick={handleKeyClick}
      className={button({ intent, className })}
    >
      {children}
    </button>
  );
};

export default Key;
