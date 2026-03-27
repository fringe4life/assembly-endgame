import { useState, useTransition } from "react";
import type { DifficultyType } from "../components/difficulty";
import { MEDIUM_DIFFICULTY } from "../components/difficulty";
import LANGUAGES from "../languages";
import { getRandomWord } from "../utils";
import { GameContext } from "./game-context";
/**
 * type for the context
 */
export interface GameContextProvider {
  addGuessedLetter: (letter: string) => void;
  attemptsLeft: number;
  difficulty: DifficultyType;
  gameLost: boolean;
  gameOver: boolean;
  gameWon: boolean;
  guessedLetters: string[];
  isPending: boolean;
  isPlaying: boolean;
  lastGuess: string | undefined;
  resetGuessedLetters: () => void;

  updateDifficulty: (value: DifficultyType) => void;
  updateIsPlaying: (value: boolean) => void;
  updateTimerLost: (value: boolean) => void;
  updateWord: (value: string) => void;
  word: string;
  wrongGuessCount: number;
}

/**
 * Type for the context as it needs to render the children passed into it
 */
interface ContextProps {
  children: React.ReactNode;
}

const ContextProvider = ({ children }: ContextProps) => {
  const [isPending, startTransition] = useTransition();

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [word, setWord] = useState<string>(() => getRandomWord());
  const [difficulty, setDifficulty] = useState<DifficultyType>(
    () => MEDIUM_DIFFICULTY
  );
  const [timerLost, setTimerLost] = useState<boolean>(false);

  const attemptsLeft = LANGUAGES.length - 1;
  const gameWon = word
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const wrongGuessCount = guessedLetters.filter(
    (letter) => !word.includes(letter)
  ).length;

  // Derived state: gameLost is true when wrong guesses >= attempts OR timer runs out
  const gameLost = wrongGuessCount >= attemptsLeft || timerLost;
  const gameOver = gameLost || gameWon;
  const lastGuess = guessedLetters.at(-1);

  // Derived state: isPlaying becomes false when game is over
  const derivedIsPlaying = gameOver ? false : isPlaying;

  /**
   * Transition-wrapped update functions
   */
  const updateIsPlaying = (value: boolean) => {
    startTransition(() => {
      setIsPlaying(value);
    });
  };

  const updateDifficulty = (value: DifficultyType) => {
    startTransition(() => {
      setDifficulty(value);
    });
  };

  const updateWord = (value: string) => {
    startTransition(() => {
      setWord(value);
    });
  };

  const addGuessedLetter = (letter: string) => {
    startTransition(() => {
      setGuessedLetters((prev) =>
        prev.includes(letter) ? prev : [...prev, letter]
      );
    });
  };

  const resetGuessedLetters = () => {
    startTransition(() => {
      setGuessedLetters([]);
    });
  };

  const updateTimerLost = (value: boolean) => {
    startTransition(() => {
      setTimerLost(value);
    });
  };

  /**
   * the value for use by the GameContext
   */
  const ctx = {
    guessedLetters,
    word,
    difficulty,
    isPlaying: derivedIsPlaying,
    updateIsPlaying,
    updateDifficulty,
    updateWord,
    addGuessedLetter,
    resetGuessedLetters,
    gameLost,
    updateTimerLost,
    gameWon,
    gameOver,
    attemptsLeft,
    wrongGuessCount,
    lastGuess,
    isPending,
  } satisfies GameContextProvider;
  return <GameContext value={ctx}>{children}</GameContext>;
};

export default ContextProvider;
