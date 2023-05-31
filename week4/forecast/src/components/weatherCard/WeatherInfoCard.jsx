import React from "react";
import { styled } from "styled-components";
import { WEATER_TYPE } from "../../assets/weatherType";

const WeatherInfoCard = ({ data, isDay }) => {
  // 각 날씨 데이터를 받아와서 구조분해 할당
  // 받아와서 필터링 한 일간 데이터와 주간 데이터의 데이터 구조가 달라 일간 데이터에는 dx_txt 값이 없고, 주간 데이터에는 name 값이 없다.
  const {
    dt_txt,
    name,
    weather: [{ description }],
    main: { temp, feels_like, temp_min, temp_max },
    clouds: { all },
  } = data;

  // 가져온 데이터에서 날씨 설명에 따라 WEATHER_TYPE 상수 파일에서 일치하는 항목을 가져온다.
  const targetWeather = WEATER_TYPE.find(
    (data) => data.description === description
  );

  // 일치하는 항목에서 이미지를 가져온다. 매칭되는 이미지가 없을 시 default 이미지로 보여준다.
  const targetImgSrc = targetWeather
    ? targetWeather.imgURL
    : "https://www.alpha.co.kr/common/img/noimage/268.png";

  return (
    // 일간 데이터에서는 타이틀이 지역 이름(name), 주간 데이터에서는 날짜(dx_txt)값이 된다.
    // 날짜 값은 월-일만 parsing
    <St.WeatherCardContainer>
      <St.WeatherCardTitle>
        <h3>{isDay ? name : dt_txt.slice(5, 10)}</h3>
      </St.WeatherCardTitle>
      {description && (
        <St.WeatherCardImg
          src={new URL(targetImgSrc, import.meta.url).href}
          alt={description}
        />
      )}
      <St.WeatherCardItems>
        <span>현재 온도</span>
        <p>{temp}</p>
      </St.WeatherCardItems>
      <St.WeatherCardItems>
        <span>체감 기온</span>
        <p>{feels_like}</p>
      </St.WeatherCardItems>
      <St.WeatherCardItems>
        <span>최저/최고 온도</span>
        <p>
          {temp_min} / {temp_max}
        </p>
      </St.WeatherCardItems>
      <St.WeatherCardItems>
        <span>구름</span>
        <p> {all} %</p>
      </St.WeatherCardItems>
    </St.WeatherCardContainer>
  );
};

export default WeatherInfoCard;

const St = {
  WeatherCardContainer: styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 3rem;
    background-color: ${({ theme }) => theme.colors.mint};
    border-radius: 1rem;
  `,

  WeatherCardTitle: styled.header`
    width: 100%;
    text-align: center;
    & > h3 {
      color: ${({ theme }) => theme.colors.white};
      font-size: 3rem;
      font-weight: ${({ theme }) => theme.fontWeights.bold};
    }
  `,

  WeatherCardImg: styled.img`
    width: 15rem;
    border-radius: 1rem;
  `,

  WeatherCardItems: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 1rem;
    & > * {
      font-size: 1.8rem;
      font-weight: ${({ theme }) => theme.fontWeights.normal};
    }
  `,
};
