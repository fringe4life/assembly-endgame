import { css, cx } from "../../styled-system/css";
import { useGameContext } from "../hooks/use-game-context";
import Button from "./button";

const HARDEST_DIFFICULTY = 30;
export const MEDIUM_DIFFICULTY = 45;
const EASIEST_DIFFICULTY = 60;

export const Difficulties = [
  HARDEST_DIFFICULTY,
  MEDIUM_DIFFICULTY,
  EASIEST_DIFFICULTY,
] as const;
export type DifficultyType = (typeof Difficulties)[number];

export default function Difficulty() {
  const { difficulty, updateDifficulty, isPlaying } = useGameContext();
  /**
   * @abstract handles change in difficulty
   */

  return (
    <section
      className={css({ mx: "auto", marginBlockStart: "4", paddingInline: "4" })}
    >
      <h2
        className={css({
          visibility: "hidden",
          translateX: "full",
          textAlign: "center",
          opacity: "0",
          transition: "transform",
          transitionTimingFunction: "fast",
        })}
      >
        Difficulty
      </h2>
      <div
        className={css({
          display: "flex",
          flexDir: "column",
          xs: { flexDir: "row" },
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        })}
      >
        <Button
          className={cx(
            css({
              xs: { flex: "2" },
              bgColor: "green.200",
              textAlign: "center",
              fontSize: "sm",
              _hover: { transform: "scale(1.1)" },
              _disabled: { cursor: "not-allowed", bgColor: "gray.300" },
              _groupHover: { transform: "scale(0.9)" },
            }),
            difficulty === EASIEST_DIFFICULTY &&
              css({
                borderWidth: "1px",
                borderStyle: "solid",
                bgColor: "green.600",
                fontWeight: "semibold",
                color: "white",
                _disabled: { bgColor: "green.300" },
              })
          )}
          disabled={isPlaying}
          onClick={() => updateDifficulty(EASIEST_DIFFICULTY)}
        >
          Easy: 60s
        </Button>
        <Button
          className={cx(
            css({
              xs: { flex: "3" },
              bgColor: "orange.200",
              textAlign: "center",
              fontSize: "sm",
              _hover: { transform: "scale(1.1)" },
              _disabled: { cursor: "not-allowed", bgColor: "gray.300" },
              _groupHover: { transform: "scale(0.9)" },
            }),
            difficulty === MEDIUM_DIFFICULTY &&
              css({
                borderWidth: "1px",
                borderStyle: "solid",
                bgColor: "orange.600",
                fontWeight: "semibold",
                color: "white",
                _disabled: { bgColor: "orange.300" },
              })
          )}
          disabled={isPlaying}
          onClick={() => updateDifficulty(MEDIUM_DIFFICULTY)}
        >
          Medium: 45s
        </Button>
        <Button
          className={cx(
            css({
              xs: { flex: "2" },
              bgColor: "red.200",
              textAlign: "center",
              fontSize: "sm",
              _hover: { transform: "scale(1.1)" },
              _disabled: { cursor: "not-allowed", bgColor: "gray.300" },
              _groupHover: { transform: "scale(0.9)" },
            }),
            difficulty === HARDEST_DIFFICULTY &&
              css({
                borderWidth: "1px",
                borderStyle: "solid",
                bgColor: "red.600",
                fontWeight: "semibold",
                color: "white",
                _disabled: { bgColor: "red.300" },
              })
          )}
          disabled={isPlaying}
          onClick={() => updateDifficulty(HARDEST_DIFFICULTY)}
        >
          Hard: 30s
        </Button>
      </div>
    </section>
  );
}
