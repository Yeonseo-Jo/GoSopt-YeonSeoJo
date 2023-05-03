import styled from "styled-components";
import { useEffect, useState } from "react";

import Card from "./Card";

export const CardSection = ({ currLevel, currCardList }) => {
  const [clickedList, setClickedList] = useState([]);
  const [matchedList, setmatchedList] = useState([]);

  useEffect(() => {
    if (matchedList.length === 2) {
      if (matchedList[0] === matchedList[1]) {
        matchedList[0].matchedStatus = true;
        matchedList[1].matchedStatus = true;
        console.log("성공");
      } else {
        console.log("실패");
      }
      setTimeout(() => {
        setmatchedList([]);
        setClickedList([]);
      }, 1000);
    }
  }, [matchedList]);

  useEffect(() => {
    setmatchedList([]);
    setClickedList([]);
    currCardList.forEach((card) => {
      card.matchedStatus = false;
    });
  }, [currLevel]);

  const handleCardChoice = (card, idx) => {
    setmatchedList([...matchedList, card]);
    setClickedList([...clickedList, idx]);
    console.log(clickedList);
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
  position: relative;
  margin: 1rem;
  width: 20rem;
  height: 25rem;
  transition: 0.5s;
  transform-style: preserve-3d;
`;
