import React from "react";
import { styled } from "styled-components";
import Header from "./Header";
import SearchForm from "./SearchForm";

const PageLayout = (props) => {
  const { children } = props;

  return (
    // 헤더와 검색 폼을 담은 공통 페이지 레이아웃
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
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.skyblue};
  `,
};
