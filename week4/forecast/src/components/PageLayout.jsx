import React from "react";
import { styled } from "styled-components";
import Header from "./Header";
import SearchForm from "./SearchForm";

const PageLayout = (props) => {
  const { children } = props;

  return (
    <St.PageWrapper>
      <Header />
      <SearchForm />
      {children}
    </St.PageWrapper>
  );
};

export default PageLayout;

const St = {
  PageWrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.skyblue};
  `,
};
