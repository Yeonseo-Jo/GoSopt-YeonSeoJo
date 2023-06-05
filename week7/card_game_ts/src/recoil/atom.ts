import { atom } from "recoil";

export const gameStateAtom = atom({
  key: "gameStateAtom",
  default: {
    currLevel: "EASY",
    currScore: 0,
    totalScore: 5,
  },
});

export const resetStatusAtom = atom({
  key: "resetStatusAtom",
  default: false,
});
