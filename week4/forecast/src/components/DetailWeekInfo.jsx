import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useGetAxios from "../hooks/useGetAxios";
import WeatherInfoCard from "./WeatherInfoCard";
import { styled } from "styled-components";
import ErrorPage from "../pages/ErrorPage";
import Skeleton from "./Skeleton";

const DetailWeekInfo = () => {
  const { weatherArea } = useParams();

  // 주간 날씨 데이터를 저장하는 state
  const [weekData, setWeekData] = useState([]);

  //주간 날씨 데이터 api url
  const WEEK_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${weatherArea}&appid=${
    import.meta.env.VITE_APP_WEATHER
  }&units=metric`;
  // axios로 api 호출하는 hook에서 필요한 정보들을 받아온다.
  const { data, isLoading, error } = useGetAxios(WEEK_URL);

  // 첫 렌더링 될 때 데이터 받아와서 저장
  useEffect(() => {
    console.log("렌더링");
    getData();
  }, []);
  // 다른 지역을 검색할 때 데이터 받아와서 저장
  useEffect(() => {
    getData();
  }, [weatherArea]);

  // 데이터를 받아서 12시에 해당하는 데이터 5개만 필터링 해 저장하는 함수, useEffect에서 불러온다
  const getData = () => {
    if (data) {
      const filterdData = data.list.filter((target) =>
        target.dt_txt.includes("12:00:00")
      );
      setWeekData(filterdData);
    }
  };

  // skeleton ui를 다섯개 보여주기 위한 순회용 배열
  let weekArray = [1, 2, 3, 4, 5];
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
  if (error) return <ErrorPage error={error} />;

  // 데이터를 받아왔으면 해당 데이터를 담은 날씨 카드 보여주기
  return (
    <St.WeekInfoWrapper>
      {weekData &&
        weekData.map((data, idx) => {
          return <WeatherInfoCard key={idx} isDay={false} data={data} />;
        })}
    </St.WeekInfoWrapper>
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
