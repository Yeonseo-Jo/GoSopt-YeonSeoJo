import { atom } from "recoil";

export const gameStateAtom = atom({
  key: "gameStateAtom",
  default: {
    currLevel: "EASY",
  },
});
