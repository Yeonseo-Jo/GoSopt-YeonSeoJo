import { useState } from "react";
import styled from "styled-components";

export const Header = ({ currScore, currLevel }) => {
  let totalNum = 0;
  switch (currLevel) {
    case "EASY":
      totalNum = 5;
      break;
    case "NORMAL":
      totalNum = 7;
      break;
    case "HARD":
      totalNum = 9;
      break;
  }

  return (
    <>
      <StHeaderContainer>
        <StTitle>💖 앙꼬를 맞춰주세요 💖</StTitle>
        <StScore>
          {currScore}/{totalNum}
        </StScore>
      </StHeaderContainer>
    </>
  );
};

export default Header;

const StHeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  width: 100%;
  height: 25vh;
  background-color: ${({ theme }) => theme.colors.lightPurple};
`;

const StTitle = styled.h1`
  margin-bottom: 1.5rem;
  font-size: 6rem;
  color: ${({ theme }) => theme.colors.purple};
`;

const StScore = styled.h3`
  font-size: 5rem;
  color: ${({ theme }) => theme.colors.greyPurple};
`;
