import React from "react";
import { useParams } from "react-router-dom";

const DetailWeekInfo = () => {
  const params = useParams();
  const { weatherArea } = params;

  return <div>{weatherArea}의 주간 날씨 디테일 페이지</div>;
};

export default DetailWeekInfo;
