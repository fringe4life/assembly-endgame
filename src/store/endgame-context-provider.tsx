import { createContext, useContext, useState } from "react";
import { getRandomWord } from "../utils";
import LANGUAGES from "../languages";
/**
 * type for the context
 */
type GameContextProvider = {
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
}

const GameContext = createContext<GameContextProvider | null>(null)

/**
 * Type for the context as it needs to render the children passed into it
 */
type ContextProps = {
    children: React.ReactNode;
}

export type DifficultyType = 30 | 45 | 60

const ContextProvider: React.FC<ContextProps> = ({children}) => {

    

    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [word, setWord] = useState<string>(() => getRandomWord());
    const [difficulty, setDifficulty] = useState<DifficultyType>(45);

    const attemptsLeft = LANGUAGES.length - 1;
    const gameWon = word.split("").every(letter => guessedLetters.includes(letter));
    
    const wrongGuessCount = guessedLetters.filter(letter => !word.includes(letter)).length;

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
        lastGuess
    } satisfies GameContextProvider
    return <GameContext.Provider value={ctx}>
        {children}
    </GameContext.Provider>
}
/**
 * @abstract checks to ensure the context is not null and throws an error if it is.
 * otherwise returns the context
 * @returns the context provided by the GameContext
 */
export function useGameContext(): GameContextProvider {
    const game = useContext(GameContext);
    if(game === null) throw new Error("please refresh the page!");
    return game;
}

export default ContextProvider;