import { Outlet, useParams } from "react-router-dom";
import { styled } from "styled-components";
import DetailDayInfo from "../components/DetailDayInfo";
import DetailWeekInfo from "../components/DetailWeekInfo";

const DetailWeather = () => {
  const { weatherRange, weatherArea } = useParams();

  const range = weatherRange === "day" ? "오늘" : "주간";

  return (
    <>
      <St.DetailWeatherTitle>
        {weatherArea}의 {range} 날씨입니다💙
      </St.DetailWeatherTitle>
      {weatherRange === "day" ? <DetailDayInfo /> : <DetailWeekInfo />}
      <Outlet />
    </>
  );
};

export default DetailWeather;

const St = {
  DetailWeatherTitle: styled.h2`
    color: ${({ theme }) => theme.colors.darkerBlue};
    font-size: 3rem;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  `,
};
