import styled from "styled-components";
import { useState } from "react";

import Header from "./Header";
import LevelNav from "./LevelNav";
import CardSection from "./CardSection";

import {
  EasyRandomList,
  NormalRandomList,
  HardRandomList,
} from "../utils/shuffleData";

export const Main = () => {
  const [currLevel, setCurrLevel] = useState("EASY");
  const [currScore, setCurrScore] = useState(0);

  console.log(currLevel);
  console.log(currScore);

  let currCardList;
  switch (currLevel) {
    case "EASY":
      currCardList = EasyRandomList;
      break;
    case "NORMAL":
      currCardList = NormalRandomList;
      break;
    case "HARD":
      currCardList = HardRandomList;
      break;
  }

  console.log(currCardList);

  return (
    <>
      <Header currScore={currScore} currLevel={currLevel} />
      <StMainContainer>
        <LevelNav currLevel={currLevel} setCurrLevel={setCurrLevel}></LevelNav>
        <CardSection
          currLevel={currLevel}
          currCardList={currCardList}
          currScore={currScore}
          setCurrScore={setCurrScore}
        />
      </StMainContainer>
    </>
  );
};

export default Main;

const StMainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.lightYellow};
`;
