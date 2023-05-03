import styled from "styled-components";

export const Card = ({ idx, card, handleCardChoice, isFlipped }) => {
  const handleCardClick = () => {
    if (handleCardChoice !== null) {
      handleCardChoice(card, idx);
    }
  };

  return (
    <>
      <StCardFront id={idx} clasName={card.id} onClick={handleCardClick}>
        💖
      </StCardFront>
      <StCardBack id={idx} clasName={card.id} isFlipped={isFlipped}>
        <img src={card.imgSrc} alt={card.alt} />
      </StCardBack>
    </>
  );
};

export default Card;
const StCard = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  backface-visibility: hidden;
  cursor: pointer;
`;

const StCardFront = styled(StCard)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.greyPurple};
  box-shadow: 0.5rem 0.5rem 0.3rem ${({ theme }) => theme.colors.lightPink};
  font-size: 3rem;
  transform: ${({ isFlipped }) =>
    isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"};
`;

const StCardBack = styled(StCard)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.lightPink};
  box-shadow: 0.5rem 0.5rem 0.3rem ${({ theme }) => theme.colors.greyPurple};
  & > img {
    width: 70%;
    height: 70%;
    border-radius: 1rem;
    border: 0.5rem solid ${({ theme }) => theme.colors.lightYellow};
  }
  transform: ${({ isFlipped }) =>
    isFlipped ? "rotateY(0deg)" : "rotateY(180deg)"};
`;
