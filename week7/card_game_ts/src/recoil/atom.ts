import { atom } from "recoil";

import { gameState } from "../../types/game";

export const gameStateAtom = atom<gameState>({
  key: "gameStateAtom",
  default: {
    currLevel: "EASY",
    currScore: 0,
    totalScore: 5,
  },
});

export const resetStatusAtom = atom<boolean>({
  key: "resetStatusAtom",
  default: false,
});

export const modalStatusAtom = atom<boolean>({
  key: "modalStatusAtom",
  default: false,
});
