import { useState, useTransition } from "react";
import { getRandomWord } from "../utils";
import LANGUAGES from "../languages";
import { GameContext } from "./game-context";
/**
 * type for the context
 */
export type GameContextProvider = {
  isPlaying: boolean;
  updateIsPlaying: (value: boolean | ((prev: boolean) => boolean)) => void;
  guessedLetters: string[];
  word: string;
  difficulty: DifficultyType;

  updateDifficulty: (value: DifficultyType) => void;
  updateWord: (value: string) => void;
  addGuessedLetter: (letter: string) => void;
  resetGuessedLetters: () => void;
  gameLost: boolean;
  updateTimerLost: (value: boolean) => void;
  gameWon: boolean;
  gameOver: boolean;
  attemptsLeft: number;
  wrongGuessCount: number;
  lastGuess: string;
  isPending: boolean;
};

/**
 * Type for the context as it needs to render the children passed into it
 */
type ContextProps = {
  children: React.ReactNode;
};

export type DifficultyType = 30 | 45 | 60;

const ContextProvider = ({ children }: ContextProps) => {
  const [isPending, startTransition] = useTransition();

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [word, setWord] = useState<string>(() => getRandomWord());
  const [difficulty, setDifficulty] = useState<DifficultyType>(45);
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
  const lastGuess = guessedLetters[guessedLetters.length - 1];

  // Derived state: isPlaying becomes false when game is over
  const derivedIsPlaying = gameOver ? false : isPlaying;

  /**
   * Transition-wrapped update functions
   */
  const updateIsPlaying = (value: boolean | ((prev: boolean) => boolean)) => {
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
