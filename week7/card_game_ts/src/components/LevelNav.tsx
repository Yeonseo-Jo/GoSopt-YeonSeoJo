import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import { gameStateAtom } from "../recoil/atom";

export const LevelNav = () => {
  // 선택할 수 있는 레벨 리스트
  const { currLevel } = useRecoilValue(gameStateAtom);
  const setGameState = useSetRecoilState(gameStateAtom);
  const levelList = ["EASY", "NORMAL", "HARD"];

  // console.log(currLevel);

  const handleClickLevel = (level: string) => {
    setGameState((prev) => ({
      ...prev,
      currLevel: level,
    }));
  };
  return (
    <>
      <StLevelBtnContainer>
        {levelList.map((level) => {
          return (
            <StLevelBtn
              key={level}
              id={level}
              type="button"
              onClick={() => handleClickLevel(level)}
              selected={level === currLevel ? true : false}
            >
              {level}
            </StLevelBtn>
          );
        })}
      </StLevelBtnContainer>
    </>
  );
};

export default LevelNav;

const StLevelBtnContainer = styled.nav`
  display: flex;
  justify-content: center;
  padding: 1.5rem;
`;

const StLevelBtn = styled.button`
  padding: 1.5rem 1.8rem;
  margin-right: 2rem;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.white : theme.colors.lightPink};
  border: none;
  border-radius: 1rem;
  box-shadow: 0.3rem 0.3rem 0.3rem ${({ theme }) => theme.colors.lightPurple};
  font-size: 1.8rem;
  font-weight: 700;
`;
