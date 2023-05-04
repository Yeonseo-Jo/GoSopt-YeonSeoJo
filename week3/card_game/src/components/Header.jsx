import { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

export const Header = ({ currScore, totalScore }) => {
  const scoreRef = useRef();

  useEffect(() => {
    if (currScore !== 0) {
      scoreRef.current.classList.add("IsCorrect");
      setTimeout(() => {
        scoreRef.current.classList.remove("IsCorrect");
      }, 1000);
    }
  }, [currScore]);

  return (
    <>
      <StHeaderContainer>
        <StTitle>💖 앙꼬를 맞춰주세요 💖</StTitle>
        <StScore ref={scoreRef}>
          {currScore}/{totalScore}
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
  background-color: ${({ theme }) => theme.colors.lightPurple};
`;

const StTitle = styled.h1`
  margin-bottom: 1.5rem;
  font-size: 6rem;
  color: ${({ theme }) => theme.colors.purple};
`;

const neon = keyframes`
  0%,
  100% {
    text-shadow: 0 0 1vw #FA1C16, 0 0 3vw #FA1C16, 0 0 10vw #FA1C16, 0 0 10vw #FA1C16, 0 0 .4vw #FED128, .5vw .5vw .1vw #806914;
    color: #FED128;
  }
  50% {
    text-shadow: 0 0 .5vw #800E0B, 0 0 1.5vw #800E0B, 0 0 5vw #800E0B, 0 0 5vw #800E0B, 0 0 .2vw #800E0B, .5vw .5vw .1vw #40340A;
    color: #806914;
  }
`;
const StScore = styled.h3`
  font-size: 5rem;
  color: ${({ theme }) => theme.colors.greyPurple};
  &.IsCorrect {
    animation: ${neon} 1s ease infinite;
    -moz-animation: ${neon} 1s ease infinite;
    -webkit-animation: ${neon} 1s ease infinite;
  }
`;
