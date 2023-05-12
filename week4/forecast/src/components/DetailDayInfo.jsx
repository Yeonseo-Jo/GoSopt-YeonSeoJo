import { useParams } from "react-router-dom";
import useGetAxios from "../hooks/useGetAxios";

import WeatherInfoCard from "./weatherCard/WeatherInfoCard";
import ErrorPage from "../pages/ErrorPage";
import Skeleton from "./weatherCard/Skeleton";

const DetailDayInfo = () => {
  const { weatherArea } = useParams();

  // 일간 날씨 데이터 api url
  const DAY_URL = `https://api.openweathermap.org/data/2.5/weather?q=${weatherArea}&appid=${
    import.meta.env.VITE_APP_WEATHER
  }&units=metric`;
  // axios로 api 호출하는 hook에서 필요한 정보들을 받아온다.
  const state = useGetAxios(DAY_URL);

  if (state) {
    // state에서 로딩 정보, 에러 정보, 데이터 구조분해 할당
    const { isLoading, isError, data } = state;
    // 로딩 중이면 skeleton ui 보여준다
    if (isLoading) return <Skeleton />;
    // 에러가 있으면 에러 페이지로 이동
    if (isError) return <ErrorPage />;
    // 로딩 중이 아니고 에러가 없으며, 데이터를 받아왔으면 해당 데이터를 담은 날씨 카드 보여주기
    return <>{data && <WeatherInfoCard isDay={true} data={data} />}</>;
  }
  // state가 없으면 -> 아직 데이터를 받아오고 있다는 뜻이므로 skeleton ui 보여준다
  return <Skeleton />;
};

export default DetailDayInfo;
