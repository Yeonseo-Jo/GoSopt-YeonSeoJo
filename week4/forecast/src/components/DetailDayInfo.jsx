import { useParams } from "react-router-dom";
import useGetAxios from "../hooks/useGetAxios";

import WeatherInfoCard from "./weatherCard/WeatherInfoCard";
import ErrorPage from "../pages/ErrorPage";
import Skeleton from "./weatherCard/Skeleton";

const DetailDayInfo = () => {
  const { weatherArea } = useParams();
  // 일간 날씨 데이터 저장하는 state

  // 일간 날씨 데이터 api url
  const DAY_URL = `https://api.openweathermap.org/data/2.5/weather?q=${weatherArea}&appid=${
    import.meta.env.VITE_APP_WEATHER
  }&units=metric`;
  // axios로 api 호출하는 hook에서 필요한 정보들을 받아온다.
  const state = useGetAxios(DAY_URL);

  // 다른 지역을 검색할 때 데이터 받아와서 저장

  if (state) {
    const { isLoading, data } = state;
    if (isLoading) return <Skeleton />;
    return <>{data && <WeatherInfoCard isDay={true} data={data} />}</>;
  }
  return <ErrorPage error={"not fond"} />;
};

export default DetailDayInfo;
