import Badge from "./components/Badge"
import Header from "./components/Header"
import LANGUAGES from "./languages"
import FlexWrap from "./components/FlexWrap"
import Key from "./components/Key";
import { type  MouseEventHandler, useEffect, useRef,  } from "react";
import {  getRandomWord, isButton } from "./utils";
import GuessLetter from "./components/GuessLetter";
import NewGame from "./components/NewGame";
import  {  useGameContext } from "./store/endgame-context-provider";
import GameStatus from "./components/GameStatus";
import { getFarewellText } from "./utils";
import AudioPlayer from 'react-h5-audio-player';
import evilLaughter from "./assets/evilLaughter.mp3"
import Difficulty from "./components/Difficulty";

import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import GameInfo from "./components/GameInfo";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

/**
 * @abstract the function that brings together the Endgame: Assembly
 * @returns the main app rendered on the client
 */
function App() {
  // get the context from endgame-context-provider
  const {
    isPlaying, 
    setIsPlaying,
    word, 
    guessedLetters, 
    setGuessedLetters, 
    setWord,
    gameLost,
    gameWon,
    wrongGuessCount,
    gameOver,
    setGameLost,
    lastGuess,
    attemptsLeft
  } = useGameContext()

  
  const lastGuessWrong = lastGuess && !word.includes(lastGuess) 
  useEffect(() => {
    setGameLost(prevGameLost => prevGameLost || wrongGuessCount >= attemptsLeft )
    setIsPlaying(prevPlaying => gameOver ? false : prevPlaying);
  }, [setGameLost, setIsPlaying, gameOver, wrongGuessCount, attemptsLeft])

 
  /**
   * @abstract used to focus the newGame button once gameOver
   */
  const newGameRef = useRef<HTMLButtonElement | null>(null);
  
  const newGame: MouseEventHandler<HTMLButtonElement> = () => {
    setGameLost(false)
    setIsPlaying(false)
    setWord(getRandomWord());
    setGuessedLetters([]);
  }
  /**
   * focuses the new game button for better user experience
   */
  if( gameOver ){
    if (newGameRef?.current && isButton(newGameRef?.current)) newGameRef.current.focus();
  }

  /**
   * @abstract the current word being guessed
   */
  const currentWordJSX = word.split("").map((letter, index) => {
    let intent: "correct" | "wrong" | "unguessed" = guessedLetters.includes(letter) ? word.includes(letter) ? "correct" : "wrong" : "unguessed"
    intent = gameLost && !guessedLetters.includes(letter) && word.includes(letter) ? "wrong" : intent
    /* eslint-disable lint/suspicious/noArrayIndexKey */
    return <GuessLetter intent={intent} key={index}>{letter}</GuessLetter>
  })

  /**
   * @abstract the letters of the alphabet as an alphabet of buttons
   * for the user to click
   */
  const keyboardJSX = ALPHABET.split("").map(letter => {
    const intent = guessedLetters.includes(letter) ?
                      word.includes(letter) ?
                        "correct" : "wrong" : "unpressed"
    return (
      <Key intent={intent}  key={letter}>{letter}</Key>
    )
  })

  /**
   * @abstract the list of languages found in languages.ts
   */
  const languagesJSX = LANGUAGES.map(({name, ...rest}, index) => {
    const onFire = index < wrongGuessCount ? "font-effect-fire-animation" : ""
    return <Badge className={onFire} style={{...rest}} key={name}>{name}</Badge>
  })

  /**
   * game status to be displayed on the screen if needed
   */
  let gameStatusJSX = <GameStatus>null</GameStatus>;
  if(lastGuessWrong && !gameOver){
    gameStatusJSX = <GameStatus intent="informational"><p>{getFarewellText(LANGUAGES[wrongGuessCount - 1].name)}</p></GameStatus>
  } else if (gameWon){
    gameStatusJSX = <GameStatus intent="win">
        <p className="text-xl">You win!</p>
        <p>Well done! 🎉</p>
      </GameStatus>
  } else if (gameLost){
    gameStatusJSX = <GameStatus intent="lose">
        <p className="text-xl">Sorry, you lost.</p>
        <p className="">You lose! Better start learning Assembly 😭</p>
        <p className="text-bold  font-effect-fire-animation pl-1.5  self-start animate-top">section .data</p>
          <p className="pl-3 self-start animate-top">sum dd 0; Variable to store the sum</p>

        <p className="text-bold font-effect-fire-animation self-start animate-top pl-1.5">section .text</p>
            <p className="pl-3 self-start animate-left">global _start</p>
        <p className="text-bold  font-effect-fire-animation pl-1.5 self-start animate-left ">_start:</p>
            <p className="pl-3 self-start animate-right">mov ecx, 5; Counter set to 5</p>
            <p className="pl-3 self-start animate-right">xor eax, eax; Initialize sum to 0</p>
        <p className="animate-bottom font-effect-fire-animation">And you thought React was bad enough!! 🤣</p>
    </GameStatus>
  }

  const { width, height } = useWindowSize()

  return (
      <main>
        
        <Header />

        {gameWon && <Confetti
          width={width}
          height={height}
        />}

        {!isPlaying && <Difficulty  />}

        {gameStatusJSX}

        <FlexWrap>{languagesJSX}</FlexWrap>

        {isPlaying && <FlexWrap className="max-w-100 justify-between">
          <GameInfo />
        </FlexWrap>}

        <FlexWrap className="max-w-120 pb-9">{currentWordJSX}</FlexWrap>

        <FlexWrap className="gap-2 max-w-120 ">{keyboardJSX}</FlexWrap>

        {gameOver && <FlexWrap><NewGame ref={newGameRef} onClick={newGame}>new game</NewGame></FlexWrap>}

        {gameLost && <AudioPlayer volume={0.125} src={evilLaughter} autoPlay={true} className="invisible -translate-x-full" />}

      </main>
  )
}

export default App
