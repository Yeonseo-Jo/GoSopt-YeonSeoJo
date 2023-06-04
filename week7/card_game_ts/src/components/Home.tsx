import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { gameState, gameStateAtom } from "../recoil/atom";
// 랜덤 처리한 카드 이미지 데이터 호출
import { randomCardList, shuffle } from "../utils/shuffleData";
// 필요한 컴포넌트 호출
import CardSection from "./Card/CardSection";
import Header from "./Header";
import LevelNav from "./LevelNav";
import ResetBtn from "./ResetBtn";
import SuccessModal from "./SuccessModal";

export const Home = () => {
  // 레벨에 따른 카드 리스트 상수 정의 (util 파일이 아닌 여기서 호출해야 useEffect 처리 가능)
  const EASY_RANDOM_LIST = shuffle([
    ...randomCardList.slice(0, 5),
    ...randomCardList.slice(0, 5),
  ]);

  const NORMAL_RANDOM_LIST = shuffle([
    ...randomCardList.slice(0, 7),
    ...randomCardList.slice(0, 7),
  ]);

  const HARD_RANDOM_LIST = shuffle([
    ...randomCardList.slice(0, 9),
    ...randomCardList.slice(0, 9),
  ]);
  // 레벨에 따른 total score 상수 정의
  const EASY_SCORE = 5;
  const NORMAL_SCORE = 7;
  const HARD_SCORE = 9;

  // 선택 된 레벨을 저장하는 state, default 값은 EASY 레벨로 지정
  // const [currLevel, setCurrLevel] = useState("EASY");
  const { currLevel } = useRecoilValue(gameStateAtom);
  // 현재 점수를 저장하는 state
  const [currScore, setCurrScore] = useState(0);
  // 리셋 버튼을 눌렀는지 여부를 저장하는 state
  const [isReset, setIsReset] = useState(false);
  // 게임이 끝나 성공 축하 모달이 열렸는지 여부를 저장하는 state
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 선택된 레벨에 따라 카드 리스트(개수 다르게)를 shuffleData에서 불러오고, totalScore도 다르게 지정
  const [currCardList, setCurrCardList] = useState(EASY_RANDOM_LIST);
  const [totalScore, setTotalScore] = useState(EASY_SCORE);

  const shuffleCardList = () => {
    switch (currLevel) {
      case "EASY":
        setCurrCardList(EASY_RANDOM_LIST);
        setTotalScore(EASY_SCORE);
        break;
      case "NORMAL":
        setCurrCardList(NORMAL_RANDOM_LIST);
        setTotalScore(NORMAL_SCORE);
        break;
      case "HARD":
        setCurrCardList(HARD_RANDOM_LIST);
        setTotalScore(HARD_SCORE);
        break;
    }
  };

  useEffect(() => {
    shuffleCardList();
  }, [currLevel, isReset]);

  // 점수가 만점이 되면 모달을 불러오기 위한 useEffect
  useEffect(() => {
    if (currScore === totalScore) {
      setIsModalOpen(true);
    }
  }, [currScore, totalScore]);

  // 모달에서 돌아가기 버튼 클릭시 모달을 닫아주기 위한 함수, successModal 컴포넌트로 전달한다
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header currScore={currScore} totalScore={totalScore} />
      <StMainContainer>
        <LevelNav />
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
      {isModalOpen && <SuccessModal handleModalClose={handleModalClose} />}
    </>
  );
};

export default Home;

// main 영역 (레벨 선택 + 카드 섹션) css
const StMainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.lightYellow};
`;
