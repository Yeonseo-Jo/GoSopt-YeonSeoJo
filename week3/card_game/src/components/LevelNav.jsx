import styled from "styled-components";
import { useState } from "react";

// import styled from "styled-components";
export const LevelNav = () => {
  const levelList = ["EASY", "NORMAL", "HARD"];
  const [currLevel, setCurrLevel] = useState("EASY");

  console.log(currLevel);

  return (
    <>
      <StLevelBtnContainer>
        {levelList.map((level) => {
          return (
            <StLevelBtn
              key={level}
              id={level}
              type="button"
              onClick={(e) => {
                console.log(e.target.id);
                setCurrLevel(level);
              }}
            >
              {level}
            </StLevelBtn>
          );
        })}
      </StLevelBtnContainer>
    </>
  );
};

const StLevelBtnContainer = styled.nav`
  display: flex;
  justify-content: center;
  padding: 1.5rem;
`;

const StLevelBtn = styled.button`
  border: 0;
  padding: 1.7rem;
  margin-right: 2rem;
  background-color: ${({ theme }) => theme.colors.lightPink};
  border: none;
  border-radius: 1rem;
  box-shadow: 0.3rem 0.3rem 0.3rem ${({ theme }) => theme.colors.lightPurple};
  font-size: 1.8rem;
`;
export default LevelNav;
