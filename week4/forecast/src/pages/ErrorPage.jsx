import React from "react";
import { styled } from "styled-components";

const ErrorPage = (error) => {
  // 에러 페이지
  return (
    <St.ErrorWrapper>
      <St.ErrorTitle> 지역을 찾을 수 없어요🥹 다시 입력해 주세요 </St.ErrorTitle>
      <St.ErrorContent>상세 내용 : {error.error} </St.ErrorContent>
    </St.ErrorWrapper>
  );
};

export default ErrorPage;

const St = {
  ErrorWrapper: styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    gap: 2rem;
  `,

  ErrorTitle: styled.h2`
    color: ${({ theme }) => theme.colors.darkestBlue};
    font-size: 3rem;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  `,

  ErrorContent: styled.p`
    color: ${({ theme }) => theme.colors.darkestBlue};
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  `,
};
