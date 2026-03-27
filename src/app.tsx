import {
  Activity,
  type MouseEventHandler,
  useDeferredValue,
  useEffect,
  useRef,
  ViewTransition,
} from "react";
import { css, cx } from "../styled-system/css";
import Badge from "./components/badge";
import Difficulty from "./components/difficulty";
import FlexWrap from "./components/flex-wrap";
import GameInfo from "./components/game-info";
import GameStatusInformational from "./components/game-status-informational";
import GameStatusLose from "./components/game-status-lose";
import GameStatusWin from "./components/game-status-win";
import GuessLetter, { type GuessLetterProps } from "./components/guess-letter";
import Header from "./components/header";
import Key, { type KeyProps } from "./components/key";
import NewGame from "./components/new-game";
import useCountdown from "./hooks/use-countdown";
import { useGameContext } from "./hooks/use-game-context";
import LANGUAGES from "./languages";
import { getRandomWord, isButton } from "./utils";

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

  useEffect(() => {
    if (newGameRef?.current && isButton(newGameRef?.current) && gameOver) {
      newGameRef.current.focus();
    }
  }, [gameOver]);

  // get ability to set new timer
  const { newTimer } = useCountdown();

  const lastGuessWrong = lastGuess && !word.includes(lastGuess);

  // Defer languageName for ViewTransition
  const currentLanguageName =
    wrongGuessCount > 0 ? LANGUAGES[wrongGuessCount - 1]?.name : "";
  const languageName = useDeferredValue(currentLanguageName);

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

  /**
   * @abstract the current word being guessed
   */
  const currentWordJSX = word.split("").map((letter, index) => {
    let intent: Exclude<GuessLetterProps["intent"], undefined> = "unguessed";

    if (!guessedLetters.includes(letter)) {
      intent = "unguessed";
    } else if (word.includes(letter)) {
      intent = "correct";
    } else {
      intent = "wrong";
    }

    return (
      // biome-ignore lint/suspicious/noArrayIndexKey: index is used as key
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
    let intent: Exclude<KeyProps["intent"], undefined> = "unguessed";
    if (guessedLetters.includes(letter)) {
      if (word.includes(letter)) {
        intent = "correct";
      } else {
        intent = "wrong";
      }
    }
    return (
      <Key intent={intent} key={letter}>
        {letter}
      </Key>
    );
  });

  /**
   * @abstract the list of languages found in languages.ts
   */
  const languagesJSX = LANGUAGES.map(({ name, bgToken, textToken }, index) => {
    const onFire = index < wrongGuessCount ? "font-effect-fire-animation" : "";
    return (
      <Badge
        className={cx(css({ bgColor: bgToken, color: textToken }), onFire)}
        key={name}
      >
        {name}
      </Badge>
    );
  });

  // Determine which game status to show
  const showInformational = lastGuessWrong && !gameOver;

  return (
    <main>
      <Header />

      <ViewTransition enter="fade-in" exit="fade-out" name="difficulty">
        <Activity mode={isPlaying ? "hidden" : "visible"}>
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
      <ViewTransition name="languages" update="cross-fade">
        <FlexWrap>{languagesJSX}</FlexWrap>
      </ViewTransition>

      <ViewTransition
        enter="slide-in-left"
        exit="slide-out-right"
        name="game-info"
      >
        <Activity mode={isPlaying ? "visible" : "hidden"}>
          <FlexWrap
            className={css({ maxW: "280", justifyContent: "space-between" })}
          >
            <GameInfo />
          </FlexWrap>
        </Activity>
      </ViewTransition>

      <ViewTransition name="word-letters" share="slide-down">
        <FlexWrap className={css({ maxW: "280", pb: "9" })}>
          {currentWordJSX}
        </FlexWrap>
      </ViewTransition>

      <ViewTransition name="keyboard" share="morph">
        <FlexWrap
          className={css({
            gap: "2",
            justifyContent: "center",
            mt: "0",
            mx: "0",
            maxW: "full",
          })}
        >
          {keyboardJSX}
        </FlexWrap>
      </ViewTransition>

      <Activity mode={gameOver ? "visible" : "hidden"}>
        <FlexWrap>
          <NewGame onClick={newGame} ref={newGameRef}>
            new game
          </NewGame>
        </FlexWrap>
      </Activity>
    </main>
  );
}

export default App;
