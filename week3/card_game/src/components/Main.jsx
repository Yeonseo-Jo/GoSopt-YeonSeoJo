import styled from "styled-components";
import { useState } from "react";

import Header from "./Header";
import LevelNav from "./LevelNav";
import CardSection from "./CardSection";
import ResetBtn from "./ResetBtn";

import {
  EasyRandomList,
  NormalRandomList,
  HardRandomList,
} from "../utils/shuffleData";

export const Main = () => {
  const [currLevel, setCurrLevel] = useState("EASY");
  const [currScore, setCurrScore] = useState(0);
  const [isReset, setIsReset] = useState(false);

  console.log(currLevel);
  console.log(currScore);
  console.log(isReset);

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
          isReset={isReset}
          setIsReset={setIsReset}
        />
      </StMainContainer>
      <ResetBtn setIsReset={setIsReset} />
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
