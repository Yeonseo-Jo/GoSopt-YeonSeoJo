import React from "react";
import { useParams } from "react-router-dom";

const DetailDayInfo = () => {
  const params = useParams();
  const { weatherArea } = params;

  return <div>{weatherArea}의 일간 날씨 디테일 페이지</div>;
};

export default DetailDayInfo;
