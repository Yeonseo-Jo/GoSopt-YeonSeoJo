import styled from "styled-components";
import { useState } from "react";

import Header from "./Header";
import LevelNav from "./LevelNav";
import CardSection from "./CardSection";

import ANKO_DATA from "../assets/datas/ANKO_DATA";

export const Main = () => {
  const [currLevel, setCurrLevel] = useState("EASY");

  console.log(currLevel);
  // 데이터 랜덤 정렬 함수
  const shuffle = (array) => {
    let shuffleArray = array.sort(() => Math.random() - 0.5);
    return shuffleArray;
  };

  // swith 문으로 선택 된 레벨에 맞게 랜덤으로 카드를 뽑아준다.
  let randomCardList;
  switch (currLevel) {
    case "EASY":
      randomCardList = shuffle([...ANKO_DATA]).splice(0, 5);
      break;
    case "NORMAL":
      randomCardList = shuffle([...ANKO_DATA]).splice(0, 7);
      break;
    case "HARD":
      randomCardList = shuffle([...ANKO_DATA]).splice(0, 9);
      break;
  }
  // 뽑아준 카드를 2쌍씩 만들어주고, 다시 랜덤 정렬한다.
  const currCardList = shuffle([...randomCardList, ...randomCardList]);

  return (
    <>
      <Header currLevel={currLevel} />
      <StMainContainer>
        <LevelNav currLevel={currLevel} setCurrLevel={setCurrLevel}></LevelNav>
        <CardSection currLevel={currLevel} currCardList={currCardList} />
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
