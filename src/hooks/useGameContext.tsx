import { use } from "react";
import { type GameContextProvider } from "../store/endgame-context-provider";
import { GameContext } from "../store/game-context";
/**
 * @abstract checks to ensure the context is not null and throws an error if it is.
 * otherwise returns the context
 * @returns the context provided by the GameContext
 */
export function useGameContext(): GameContextProvider {
  const game = use(GameContext);
  if (game === null) throw new Error("please refresh the page!");
  return game;
}
