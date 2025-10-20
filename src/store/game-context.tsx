import { createContext } from "react";
import type { GameContextProvider } from "./endgame-context-provider";

export const GameContext = createContext<GameContextProvider | null>(null);
