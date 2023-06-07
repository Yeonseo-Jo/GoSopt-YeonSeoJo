import { selector } from "recoil";

import { GameState } from "../types/game";
import { gameStateAtom } from "./atom";

export const currLevelSelector = selector<GameState | string>({
  key: "currLevelSelector",
  get: ({ get }) => get(gameStateAtom).currLevel,
  set: ({ set, get }, newValue) => {
    set(gameStateAtom, { ...get(gameStateAtom), currLevel: newValue });
  },
});
