import React, { useEffect, useState } from "react";
import PageLayout from "../components/common/PageLayout";
import { Outlet, useParams } from "react-router-dom";
import { styled } from "styled-components";

const DetailWeek = () => {
  // 주간 날씨 페이지
  const { weatherArea } = useParams();

  return (
    <PageLayout>
      <St.WeekPageTitle> {weatherArea}의 주간 날씨입니다💙 </St.WeekPageTitle>
      <Outlet />
    </PageLayout>
  );
};

export default DetailWeek;

const St = {
  WeekPageTitle: styled.h2`
    color: ${({ theme }) => theme.colors.darkerBlue};
    font-size: 3rem;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  `,
};
