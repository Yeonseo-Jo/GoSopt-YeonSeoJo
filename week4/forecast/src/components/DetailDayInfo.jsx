import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetAxios from "../hooks/useGetAxios";

import WeatherInfoCard from "./weatherCard/WeatherInfoCard";
import ErrorPage from "../pages/ErrorPage";
import Skeleton from "./weatherCard/Skeleton";

const DetailDayInfo = () => {
  const { weatherArea } = useParams();

  // 일간 날씨 데이터 저장하는 state
  const [dayData, setDayData] = useState(null);

  // 일간 날씨 데이터 api url
  const DAY_URL = `https://api.openweathermap.org/data/2.5/weather?q=${weatherArea}&appid=${
    import.meta.env.VITE_APP_WEATHER
  }&units=metric`;
  // axios로 api 호출하는 hook에서 필요한 정보들을 받아온다.
  const { data, isLoading, error } = useGetAxios(DAY_URL);

  // 첫 렌더링 될 때 데이터 받아와서 저장
  useEffect(() => {
    setDayData(data);
  }, []);
  // 다른 지역을 검색할 때 데이터 받아와서 저장
  useEffect(() => {
    setDayData(data);
  }, [weatherArea]);

  // 로딩 중인 경우 skelton ui 보여주기
  if (isLoading) return <Skeleton />;

  // 에러가 있는 경우 에러 페이지로 이동
  if (error) return <ErrorPage error={error} />;

  // 데이터를 받아왔으면 해당 데이터를 담은 날씨 카드 보여주기
  return <>{dayData && <WeatherInfoCard isDay={true} data={dayData} />}</>;
};

export default DetailDayInfo;
