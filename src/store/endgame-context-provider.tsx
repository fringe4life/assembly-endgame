import { createContext, useContext, useState, type MouseEventHandler } from "react";
import { getRandomWord, isButton } from "../utils";


/**
 * type for the context
 */
type GameContextProvider = {
    guessedLetters: string[];
    word: string;
    handleKeyClick: MouseEventHandler<HTMLButtonElement>;
    handleNewGame: MouseEventHandler<HTMLButtonElement>;
}

const GameContext = createContext<GameContextProvider | null>(null)

/**
 * Type for the context as it needs to render the children passed into it
 */
type ContextProps = {
    children: React.ReactNode;
}

const ContextProvider: React.FC<ContextProps> = ({children}) => {

    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [word, setWord] = useState<string>(() => getRandomWord());


    /**
       * @abstract used to get a new word and reset guessedLetters
       * @param e event triggered by user click
       */
    const handleNewGame: MouseEventHandler<HTMLButtonElement> = () => {
        setWord(getRandomWord());
        setGuessedLetters([]);
    }
    
    /**
     * @abstract used to check if the letter is in the word user is trying to guess
     * @param e the event triggered by the users click
     * @returns void
     */
    const handleKeyClick: MouseEventHandler<HTMLButtonElement> = (e): void => {
        const target = e.target as HTMLElement
        if(!isButton(target)){
            return
        }
        const letter = target.textContent as string;
        // need to check if it is part(s) of word
        setGuessedLetters((prevLetters) => 
                prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
        )
    }
    /**
     * the value for use by the GameContext
     */
    const ctx = {
        guessedLetters,
        word,
        handleKeyClick,
        handleNewGame,
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
    const game = useContext(GameContext)
    if(game === null) throw new Error("please refresh the page!")
    return game
}

export default ContextProvider