import React from "react";
import { styled } from "styled-components";

const Header = () => {
  return (
    <St.HeaderWrapper>
      <h1> ☀️ 연또의 날씨 예보 ☀️ </h1>
    </St.HeaderWrapper>
  );
};

export default Header;

const St = {
  HeaderWrapper: styled.header`
    display: flex;
    width: 100%;
    padding: 2rem;
    background-color: ${({ theme }) => theme.colors.blue};

    & > h1 {
      font-style: normal;
      font-weight: 700;
      font-size: 5rem;
      color: ${({ theme }) => theme.colors.white};
    }
  `,
};
