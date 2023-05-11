import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useGetAxios from "../hooks/useGetAxios";
import WeatherInfoCard from "./WeatherInfoCard";
import { styled } from "styled-components";

const DetailWeekInfo = () => {
  const params = useParams();
  const { weatherArea } = params;

  const [weekData, setWeekData] = useState([]);

  const WEEK_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${weatherArea}&appid=${
    import.meta.env.VITE_APP_WEATHER
  }&units=metric`;
  const { data, isLoading, error } = useGetAxios(WEEK_URL);
  // console.log(data, isLoading, error);

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

  return (
    <St.WeekInfoWrapper>
      {weekData &&
        weekData.map((data, idx) => {
          return <WeatherInfoCard key={idx} data={data} />;
        })}
    </St.WeekInfoWrapper>
  );
};

export default DetailWeekInfo;

const St = {
  WeekInfoWrapper: styled.section`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 3rem;
    gap: 1rem;
  `,
};
