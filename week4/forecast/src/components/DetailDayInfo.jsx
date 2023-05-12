import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetAxios from "../hooks/useGetAxios";
import WeatherInfoCard from "./WeatherInfoCard";
import ErrorPage from "../pages/ErrorPage";

const DetailDayInfo = () => {
  const params = useParams();
  const { weatherArea } = params;

  const [dayData, setDayData] = useState(null);

  const DAY_URL = `https://api.openweathermap.org/data/2.5/weather?q=${weatherArea}&appid=${
    import.meta.env.VITE_APP_WEATHER
  }&units=metric`;

  const { data, isLoading, error } = useGetAxios(DAY_URL);

  useEffect(() => {
    setDayData(data);
  }, []);

  useEffect(() => {
    setDayData(data);
  }, [weatherArea]);

  console.log(data);

  if (error) return <ErrorPage error={error} />;

  return (
    <>
      {dayData && (
        <WeatherInfoCard isDay={true} isWeek={false} data={dayData} />
      )}
    </>
  );
};

export default DetailDayInfo;
