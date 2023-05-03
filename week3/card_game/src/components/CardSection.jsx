import styled from "styled-components";
import { useEffect, useState } from "react";

import Card from "./Card";

export const CardSection = ({
  currLevel,
  currCardList,
  currScore,
  setCurrScore,
  isReset,
  setIsReset,
}) => {
  const [clickedList, setClickedList] = useState([]);
  const [matchedList, setmatchedList] = useState([]);

  useEffect(() => {
    if (matchedList.length === 2) {
      if (matchedList[0] === matchedList[1]) {
        matchedList[0].matchedStatus = true;
        setCurrScore((prev) => prev + 1);
        console.log("성공", currScore);
      } else {
        console.log("실패");
      }
      setTimeout(() => {
        setmatchedList([]);
        setClickedList([]);
      }, 700);
    }
  }, [matchedList]);

  useEffect(() => {
    setmatchedList([]);
    setClickedList([]);
    setCurrScore(0);
    currCardList.forEach((card) => {
      card.matchedStatus = false;
    });
    setIsReset(false);
  }, [currLevel, isReset]);

  const handleCardChoice = (card, idx) => {
    setmatchedList([...matchedList, card]);
    setClickedList([...clickedList, idx]);
    console.log("!!!", clickedList);
  };

  return (
    <StCardsContainer>
      {currCardList.map((card, idx) => {
        return (
          <>
            <StCardWrapper
              key={`${card.id}-${idx}`}
              id={idx}
              clasName={card.id}
            >
              <Card
                card={card}
                idx={idx}
                handleCardChoice={
                  clickedList.length < 2 ? handleCardChoice : null
                }
                isFlipped={clickedList.includes(idx) || card.matchedStatus}
              />
            </StCardWrapper>
          </>
        );
      })}
    </StCardsContainer>
  );
};

export default CardSection;

const StCardsContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StCardWrapper = styled.article`
  margin: 1rem;
  width: 20rem;
  height: 25rem;
  perspective: 100rem;
`;
