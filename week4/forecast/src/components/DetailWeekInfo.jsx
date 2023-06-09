import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useGetAxios from "../hooks/useGetAxios";

import { styled } from "styled-components";
import ErrorPage from "../pages/ErrorPage";
import Skeleton from "./weatherCard/Skeleton";
import WeatherInfoCard from "./weatherCard/WeatherInfoCard";

const DetailWeekInfo = () => {
  const { weatherArea } = useParams();

  //주간 날씨 데이터 api url
  const WEEK_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${weatherArea}&appid=${
    import.meta.env.VITE_APP_WEATHER
  }&units=metric`;
  // axios로 api 호출하는 hook에서 필요한 정보들을 받아온다.
  const state = useGetAxios(WEEK_URL);

  // skeleton ui를 다섯개 보여주기 위한 순회용 배열
  let weekArray = [1, 2, 3, 4, 5];

  if (state) {
    // state에서 로딩 정보, 에러 정보, 데이터 구조분해 할당
    const { data, isError, isLoading } = state;

    // 로딩 중인 경우 skelton ui 보여주기 (주간 데이터가 5개이므로 5개 skeleton card 보여주기)
    if (isLoading)
      return (
        <St.SkelCardWrapper>
          {weekArray.map((idx) => {
            return <Skeleton key={idx} />;
          })}
        </St.SkelCardWrapper>
      );

    // 에러가 있는 경우 에러 페이지로 이동
    if (isError) return <ErrorPage />;

    //로딩 중이 아니고 에러가 없으며, 데이터를 받아왔으면 해당 데이터를 담은 날씨 카드 보여주기
    if (data)
      return (
        <St.WeekInfoWrapper>
          {data.list
            .filter((target) => target.dt_txt.includes("12:00:00"))
            .map((data, idx) => {
              return <WeatherInfoCard key={idx} isDay={false} data={data} />;
            })}
        </St.WeekInfoWrapper>
      );
  }
  // state가 없으면 -> 아직 데이터를 받아오고 있다는 뜻이므로 skeleton ui 보여준다
  return (
    <St.SkelCardWrapper>
      {weekArray.map((idx) => {
        return <Skeleton key={idx} />;
      })}
    </St.SkelCardWrapper>
  );
};

export default DetailWeekInfo;

const St = {
  SkelCardWrapper: styled.section`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 2rem;
  `,
  WeekInfoWrapper: styled.section`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 3rem;
    gap: 1rem;
  `,
};
