import React from "react";
import { Outlet, useParams } from "react-router-dom";
import PageLayout from "../components/common/PageLayout";
import { styled } from "styled-components";

const DetailDay = () => {
  // 일간 날씨 페이지
  const { weatherArea } = useParams();

  return (
    <PageLayout>
      <St.DayPageTitle> {weatherArea}의 오늘 날씨입니다💙 </St.DayPageTitle>
      <Outlet />
    </PageLayout>
  );
};

export default DetailDay;
const St = {
  DayPageTitle: styled.h2`
    color: ${({ theme }) => theme.colors.darkerBlue};
    font-size: 3rem;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  `,
};
