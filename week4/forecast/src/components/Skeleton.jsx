import React from "react";
import { styled } from "styled-components";

const Skeleton = () => {
  return (
    <St.skelCardContainer>
      <St.skelCardTitle></St.skelCardTitle>
      <St.skelCardImg></St.skelCardImg>
      <St.skelCardItems></St.skelCardItems>
    </St.skelCardContainer>
  );
};

export default Skeleton;

const St = {
  skelCardContainer: styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem;
    width: 20rem;
    height: 35rem;
    gap: 1.5rem;
    background-color: ${({ theme }) => theme.colors.grey};
    border-radius: 1rem;
    box-shadow: 0.3rem 0.3rem 0.3rem silver;

    & > * {
      position: relative;
      overflow: hidden;
      background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    }

    & > *::before {
      @keyframes loading {
        0% {
          transform: translateX(0);
        }
        50%,
        100% {
          transform: translateX(460px);
        }
      }
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 2rem;
      height: 100%;
      background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
      animation: loading 2.5s infinite linear;
    }
  `,

  skelCardTitle: styled.div`
    width: 13rem;
    height: 3rem;
  `,

  skelCardImg: styled.span`
    width: 12rem;
    height: 11rem;
    border-radius: 2rem;
  `,

  skelCardItems: styled.span`
    width: 14rem;
    height: 15rem;
    border-radius: 2rem;
  `,
};
