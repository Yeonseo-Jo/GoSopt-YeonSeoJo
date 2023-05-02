import styled from "styled-components";
import { useState } from "react";

import Header from "./Header";
import LevelNav from "./LevelNav";

export const Main = () => {
  const [currLevel, setCurrLevel] = useState("EASY");
  console.log(currLevel);

  return (
    <>
      <Header currLevel={currLevel} />
      <StMainContainer>
        <LevelNav currLevel={currLevel} setCurrLevel={setCurrLevel}></LevelNav>
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
