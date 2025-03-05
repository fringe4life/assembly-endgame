import Badge from "./components/Badge"
import Header from "./components/Header"
import LANGUAGES from "./languages"
import FlexWrap from "./components/FlexWrap"
import Key from "./components/Key";
import {  useRef,  } from "react";
import {  isButton } from "./utils";
import GuessLetter from "./components/GuessLetter";
import NewGame from "./components/NewGame";
import  {  useGameContext } from "./store/endgame-context-provider";
import GameStatus from "./components/GameStatus";
import { getFarewellText } from "./utils";
import AudioPlayer from 'react-h5-audio-player';
import evilLaughter from "./assets/evilLaughter.mp3"

import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

/**
 * @abstract the function that brings together the Endgame: Assembly
 * @returns the main app rendered on the client
 */
function App() {
  // get the context from endgame-context-provider
  const {word, guessedLetters, handleKeyClick, handleNewGame} = useGameContext()

  const newGameRef = useRef<HTMLButtonElement | null>(null);

  // derived state about amount of guesses, whether game is over
  const attemptsLeft = LANGUAGES.length - 1;
  const attemptsRemaining = attemptsLeft - guessedLetters.length;
  const gameWon = word.split("").every(letter => guessedLetters.includes(letter))

  const wrongGuessCount =
        guessedLetters.filter(letter => !word.includes(letter)).length
  
  const gameLost = wrongGuessCount >= attemptsLeft;

  const gameOver = gameLost || gameWon
  const lastGuess = guessedLetters[guessedLetters.length - 1]
  const lastGuessWrong = lastGuess && !word.includes(lastGuess)
  
  // checks for whether derived state works
  console.log(word, " word")
  console.log(lastGuessWrong, " last guess wrong")

  console.log(gameWon, " game won")
  console.log(gameLost, " game lost")
  console.log(attemptsRemaining, " attempts left")
  


  /**
   * focuses the new game button for better user experience
   */
  if(gameOver){
    if (newGameRef?.current && isButton(newGameRef?.current)) newGameRef.current.focus();
  }

  /**
   * @abstract the current word being guessed
   */
  const currentWordJSX = word.split("").map((letter, index) => {
    const intent = guessedLetters.includes(letter) ? word.includes(letter) ? "correct" : "wrong" : "unguessed"
    
    /* eslint-disable lint/suspicious/noArrayIndexKey */
    return <GuessLetter intent={intent} key={index}>{letter}</GuessLetter>
  })


  /**
   * @abstract the letters of the alphabet as an alphabet of buttons
   * for the user to click
   */
  const keyboardJSX = ALPHABET.split("").map(letter => {
    /**
     * used to determine styling by cva
     */
    const intent = guessedLetters.includes(letter) ?
                      word.includes(letter) ?
                        "correct" : "wrong" : "unpressed"
    return (
      <Key intent={intent} onClick={handleKeyClick} key={letter}>{letter}</Key>
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
        <p className="text-xl ">You win!</p>
        <p  className="">Well done! 🎉</p>
      </GameStatus>
  } else if (gameLost){
    gameStatusJSX = <GameStatus intent="lose">
        <p className="text-xl ">Sorry, you lost.</p>
        <p className="">You lose! Better start learning Assembly 😭</p>
        <p className="text-bold  font-effect-fire-animation pl-1.5  self-start animate-top">section .data</p>
          <p className="pl-3 self-start animate-top">sum dd 0; Variable to store the sum</p>

        <p className="text-bold font-effect-fire-animation self-start animate-top pl-1.5">section .text</p>
            <p className="pl-3 self-start animate-right">global _start</p>
        <p className="text-bold  font-effect-fire-animation pl-1.5 self-start animate-right ">_start:</p>
            <p className="pl-3 self-start animate-right">mov ecx, 5; Counter set to 5</p>
            <p className="pl-3 self-start animate-right">xor eax, eax; Initialize sum to 0</p>
        <p className="text-bold pl-1.5  font-effect-fire-animation self-start animate-left ">loop_start:</p>
            <p className="pl-3 self-start animate-left">add eax, ecx; Add counter to sum</p>
            <p className="pl-3 self-start animate-left">dec ecx; Decrement counter</p>
            <p className="pl-3 self-start animate-left">jnz loop_start; Repeat loop until ECX == 0</p>
            <p className="pl-3 self-start animate-left">mov [sum], eax; Store the sum in memory</p>
            <p className="pl-3 self-start animate-bottom">mov eax, 1; Exit system call</p>
            <p className="pl-3 self-start animate-bottom">xor ebx, ebx; Exit code 0</p>
            <p className="pl-3 self-start animate-bottom">int 0x80</p>
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

        {gameStatusJSX}

        <FlexWrap>{languagesJSX}</FlexWrap>

        <FlexWrap className="max-w-120 pb-9">{currentWordJSX}</FlexWrap>

        <FlexWrap className="gap-2 max-w-120">{keyboardJSX}</FlexWrap>

        {gameOver && <FlexWrap><NewGame ref={newGameRef} onClick={handleNewGame}>new game</NewGame></FlexWrap>}

        {gameLost && <AudioPlayer src={evilLaughter} autoPlay={true} className="invisible -translate-x-full" />}

      </main>
  )
}

export default App
