import styled from "styled-components";

export const Card = ({ idx, card, handleCardChoice, isFlipped }) => {
  const handleCardClick = () => {
    console.log(card);
    if (handleCardChoice !== null) {
      handleCardChoice(card, idx);
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
