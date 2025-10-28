import Badge from "./components/Badge";
import Header from "./components/Header";
import LANGUAGES from "./languages";
import FlexWrap from "./components/FlexWrap";
import Key from "./components/Key";
import {
  Activity,
  type MouseEventHandler,
  useEffect,
  useRef,
  ViewTransition,
  useDeferredValue,
} from "react";
import { getRandomWord, isButton } from "./utils";
import GuessLetter, { type SpanProps } from "./components/GuessLetter";
import NewGame from "./components/NewGame";
import { useGameContext } from "./hooks/useGameContext";
import GameStatusInformational from "./components/GameStatusInformational";
import GameStatusWin from "./components/GameStatusWin";
import GameStatusLose from "./components/GameStatusLose";
import AudioPlayer from "react-h5-audio-player";
import evilLaughter from "./assets/evilLaughter.mp3";
import Difficulty from "./components/Difficulty";

import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import GameInfo from "./components/GameInfo";
import useCountdown from "./hooks/useCountdown";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

/**
 * @abstract the function that brings together the Endgame: Assembly
 * @returns the main app rendered on the client
 */
function App() {
  // get the context from endgame-context-provider
  const {
    isPlaying,
    updateIsPlaying,
    word,
    guessedLetters,
    resetGuessedLetters,
    updateWord,
    gameLost,
    gameWon,
    wrongGuessCount,
    gameOver,
    lastGuess,
    difficulty,
    updateTimerLost,
  } = useGameContext();

  const { newTimer } = useCountdown();

  const lastGuessWrong = lastGuess && !word.includes(lastGuess);

  // Defer languageName for ViewTransition
  const currentLanguageName =
    wrongGuessCount > 0 ? LANGUAGES[wrongGuessCount - 1]?.name : "";
  const languageName = useDeferredValue(currentLanguageName);

  // No longer needed - gameLost and isPlaying are now derived state

  /**
   * @abstract used to focus the newGame button once gameOver
   */
  const newGameRef = useRef<HTMLButtonElement | null>(null);

  const newGame: MouseEventHandler<HTMLButtonElement> = () => {
    updateIsPlaying(false);
    updateWord(getRandomWord());
    resetGuessedLetters();
    updateTimerLost(false);
    newTimer(difficulty);
  };

  useEffect(() => {
    if (newGameRef?.current && isButton(newGameRef?.current))
      newGameRef.current.focus();
  }, [gameOver]);

  /**
   * @abstract the current word being guessed
   */
  const currentWordJSX = word.split("").map((letter, index) => {
    let intent: Exclude<SpanProps["intent"], undefined> =
      guessedLetters.includes(letter)
        ? word.includes(letter)
          ? "correct"
          : "wrong"
        : "unguessed";
    intent =
      gameLost && !guessedLetters.includes(letter) && word.includes(letter)
        ? "wrong"
        : intent;

    return (
      <GuessLetter intent={intent} key={index}>
        {letter}
      </GuessLetter>
    );
  });

  /**
   * @abstract the letters of the alphabet as an alphabet of buttons
   * for the user to click
   */
  const keyboardJSX = ALPHABET.split("").map((letter) => {
    const intent = guessedLetters.includes(letter)
      ? word.includes(letter)
        ? "correct"
        : "wrong"
      : "unpressed";
    return (
      <Key intent={intent} key={letter}>
        {letter}
      </Key>
    );
  });

  /**
   * @abstract the list of languages found in languages.ts
   */
  const languagesJSX = LANGUAGES.map(({ name, ...rest }, index) => {
    const onFire = index < wrongGuessCount ? "font-effect-fire-animation" : "";
    return (
      <Badge className={onFire} style={{ ...rest }} key={name}>
        {name}
      </Badge>
    );
  });

  // Determine which game status to show
  const showInformational = lastGuessWrong && !gameOver;

  const { width, height } = useWindowSize();

  return (
    <main>
      <Header />

      <Activity mode={gameWon ? "visible" : "hidden"}>
        <Confetti width={width} height={height} />
      </Activity>

      <ViewTransition enter="fade-in" exit="fade-out" name="difficulty">
        <Activity mode={!isPlaying ? "visible" : "hidden"}>
          <Difficulty />
        </Activity>
      </ViewTransition>

      <ViewTransition enter="slide-in-left" exit="slide-out-right">
        <Activity mode={showInformational ? "visible" : "hidden"}>
          <GameStatusInformational languageName={languageName} />
        </Activity>
      </ViewTransition>
      <ViewTransition enter="slide-in-left" exit="slide-out-right">
        <Activity mode={gameWon ? "visible" : "hidden"}>
          <GameStatusWin />
        </Activity>
      </ViewTransition>
      <ViewTransition enter="slide-in-left" exit="slide-out-right">
        <Activity mode={gameLost ? "visible" : "hidden"}>
          <GameStatusLose />
        </Activity>
      </ViewTransition>
      <ViewTransition update="cross-fade" name="languages">
        <FlexWrap>{languagesJSX}</FlexWrap>
      </ViewTransition>

      <ViewTransition
        enter="slide-in-left"
        exit="slide-out-right"
        update="morph"
        name="game-info"
      >
        <Activity mode={isPlaying ? "visible" : "hidden"}>
          <FlexWrap className="max-w-100 justify-around">
            <GameInfo />
          </FlexWrap>
        </Activity>
      </ViewTransition>

      <ViewTransition share="slide-down" name="word-letters">
        <FlexWrap className="max-w-120 pb-9">{currentWordJSX}</FlexWrap>
      </ViewTransition>

      <ViewTransition share="morph" name="keyboard">
        <FlexWrap className="max-w-120 gap-2">{keyboardJSX}</FlexWrap>
      </ViewTransition>

      <Activity mode={gameOver ? "visible" : "hidden"}>
        <FlexWrap>
          <NewGame ref={newGameRef} onClick={newGame}>
            new game
          </NewGame>
        </FlexWrap>
      </Activity>

      {gameLost && (
        <AudioPlayer
          volume={0.00000000000000001}
          src={evilLaughter}
          autoPlay={true}
          className="invisible -translate-x-full"
        />
      )}
    </main>
  );
}

export default App;
