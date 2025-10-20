import { useState } from "react";
import { getRandomWord } from "../utils";
import LANGUAGES from "../languages";
import { GameContext } from "./game-context";
/**
 * type for the context
 */
export type GameContextProvider = {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  guessedLetters: string[];
  word: string;
  difficulty: DifficultyType;

  setDifficulty: React.Dispatch<React.SetStateAction<DifficultyType>>;
  setWord: React.Dispatch<React.SetStateAction<string>>;
  setGuessedLetters: React.Dispatch<React.SetStateAction<string[]>>;
  gameLost: boolean;
  setGameLost: React.Dispatch<React.SetStateAction<boolean>>;
  gameWon: boolean;
  gameOver: boolean;
  attemptsLeft: number;
  wrongGuessCount: number;
  lastGuess: string;
};

/**
 * Type for the context as it needs to render the children passed into it
 */
type ContextProps = {
  children: React.ReactNode;
};

export type DifficultyType = 30 | 45 | 60;

const ContextProvider = ({ children }: ContextProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [word, setWord] = useState<string>(() => getRandomWord());
  const [difficulty, setDifficulty] = useState<DifficultyType>(45);

  const attemptsLeft = LANGUAGES.length - 1;
  const gameWon = word
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const wrongGuessCount = guessedLetters.filter(
    (letter) => !word.includes(letter)
  ).length;

  const [gameLost, setGameLost] = useState<boolean>(false);

  const gameOver = gameLost || gameWon;

  const lastGuess = guessedLetters[guessedLetters.length - 1];

  /**
   * the value for use by the GameContext
   */
  const ctx = {
    guessedLetters,
    word,
    difficulty,
    isPlaying,
    setIsPlaying,
    setDifficulty,
    setWord,
    setGuessedLetters,
    gameLost,
    gameWon,
    gameOver,
    attemptsLeft,
    wrongGuessCount,
    setGameLost,
    lastGuess,
  } satisfies GameContextProvider;
  return <GameContext value={ctx}>{children}</GameContext>;
};

export default ContextProvider;
