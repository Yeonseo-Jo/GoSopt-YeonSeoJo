import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useGetAxios from "../hooks/useGetAxios";
import WeatherInfoCard from "./WeatherInfoCard";
import { styled } from "styled-components";
import ErrorPage from "../pages/ErrorPage";
import Skeleton from "./Skeleton";

const DetailWeekInfo = () => {
  const params = useParams();
  const { weatherArea } = params;

  const [weekData, setWeekData] = useState([]);

  const WEEK_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${weatherArea}&appid=${
    import.meta.env.VITE_APP_WEATHER
  }&units=metric`;
  const { data, isLoading, error } = useGetAxios(WEEK_URL);

  useEffect(() => {
    console.log("렌더링");
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [weatherArea]);

  const getData = () => {
    if (data) {
      const filterdData = data.list.filter((target) =>
        target.dt_txt.includes("12:00:00")
      );
      setWeekData(filterdData);
    }
  };

  let weekArray = [1, 2, 3, 4, 5];
  if (isLoading)
    return (
      <St.SkelCardWrapper>
        {weekArray.map((idx) => {
          return <Skeleton key={idx} />;
        })}
      </St.SkelCardWrapper>
    );

  if (error) return <ErrorPage error={error} />;

  return (
    <St.WeekInfoWrapper>
      {weekData &&
        weekData.map((data, idx) => {
          return (
            <WeatherInfoCard
              key={idx}
              isDay={false}
              isWeek={true}
              data={data}
            />
          );
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
