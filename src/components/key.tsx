import type { MouseEventHandler } from "react";
import { cva, type RecipeVariant } from "../../styled-system/css";
import { useGameContext } from "../hooks/use-game-context";
import { isButton } from "../utils";

const button = cva({
  base: {
    color: "neutral.900",
    textTransform: "uppercase",
    fontWeight: "semibold",
    w: "10",
    aspectRatio: "1",
    rounded: "md",
  },
  variants: {
    intent: {
      unguessed: {
        bgColor: "amber.400",
        _hover: {
          translateY: "-2px",
          bgColor: "amber.500",
          shadow: "sm",
          shadowColor: "gray.500",
        },
        cursor: "pointer",
        _active: {
          translateY: "0",
        },
      },
      correct: { bgColor: "green.600", cursor: "not-allowed", scale: "0.9" },
      wrong: { bgColor: "red.500", cursor: "not-allowed", scale: "0.9" },
    },
  },
  defaultVariants: {
    intent: "unguessed",
  },
});

/**
 * interface for Key class
 */
export interface KeyProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    RecipeVariant<typeof button> {}

const Key = ({ intent, children }: KeyProps) => {
  const { isPlaying, updateIsPlaying, addGuessedLetter } = useGameContext();

  /**
   * @abstract used to check if the letter is in the word user is trying to guess
   * @param e the event triggered by the users click
   * @returns void
   */
  const handleKeyClick: MouseEventHandler<HTMLButtonElement> = (e): void => {
    if (!isPlaying) {
      updateIsPlaying(true);
    }
    const target = e.target as HTMLElement;
    if (!isButton(target)) {
      return;
    }
    const letter = target.textContent as string;
    // Add guessed letter (triggers ViewTransition)
    addGuessedLetter(letter);
  };
  return (
    <button
      className={button({ intent })}
      onClick={handleKeyClick}
      type="button"
    >
      {children}
    </button>
  );
};

export default Key;
