import { selector } from "recoil";

import { GameState } from "../types/game";
import { gameStateAtom } from "./atom";

export const currLevelSelector = selector({
  key: "currLevelSelector",
  get: ({ get }) => get(gameStateAtom).currLevel,
  set: ({ set, get }, newValue) => {
    set(gameStateAtom, { ...get(gameStateAtom), currLevel: newValue });
  },
});

export const currScoreSelector = selector({
  key: "currScoreSelector",
  get: ({ get }) => get(gameStateAtom).currScore,
  set: ({ set, get }, newValue) => {
    set(gameStateAtom, { ...get(gameStateAtom), currScore: newValue });
  },
});

export const totalScoreSelector = selector({
  key: "totalScoreSelector",
  get: ({ get }) => get(gameStateAtom).totalScore,
  set: ({ set, get }, newValue) => {
    set(gameStateAtom, { ...get(gameStateAtom), totalScore: newValue });
  },
});
