import { useState } from "react";
import styled from "styled-components";

export const Card = ({ idx, card, handleCardChoice, isFlipped }) => {
  //카드 중복 클릭 시 같은 쌍이 뒤집히는 에러 핸들링 용 state 추가
  const [isClicked, setIsClicked] = useState(false);

  const handleCardClick = () => {
    if (handleCardChoice !== null && isClicked === false) {
      handleCardChoice(card, idx);
      setIsClicked(true);
      // 이미 클릭 된 카드가 또 클릭되지 않도록 setTimeOut 함수로 0.5초 동안 클릭 이벤트 방지
      setTimeout(() => {
        setIsClicked(false);
      }, 500);
    }
  };

  return (
    <StCardFace>
      <StCardFront id={idx} clasName={card.id} onClick={handleCardClick}>
        💖
      </StCardFront>
      <StCardBack id={idx} clasName={card.id} isFlipped={isFlipped}>
        <img src={card.imgSrc} alt={card.alt} />
      </StCardBack>
    </StCardFace>
  );
};

export default Card;

const StCardFace = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  /* transition: 0.5s; */
  /* transform-style: preserve-3d; */
`;
const StCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  backface-visibility: hidden;
  transition: 0.7s;
  transform-style: preserve-3d;
  cursor: pointer;
`;

const StCardFront = styled(StCard)`
  background-color: ${({ theme }) => theme.colors.greyPurple};
  box-shadow: 0.5rem 0.5rem 0.3rem ${({ theme }) => theme.colors.lightPink};
  font-size: 3rem;
  transform: ${({ isFlipped }) =>
    isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"};
`;

const StCardBack = styled(StCard)`
  background-color: ${({ theme }) => theme.colors.lightPink};
  box-shadow: 0.5rem 0.5rem 0.3rem ${({ theme }) => theme.colors.greyPurple};
  & > img {
    width: 70%;
    height: 70%;
    border-radius: 1rem;
    border: 0.5rem solid ${({ theme }) => theme.colors.lightYellow};
  }
  transform: ${({ isFlipped }) =>
    isFlipped ? "rotateY(360deg)" : "rotateY(180deg)"};
`;
