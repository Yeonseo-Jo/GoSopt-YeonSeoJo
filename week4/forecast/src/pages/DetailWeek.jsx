import React, { useState } from "react";
import PageLayout from "../components/PageLayout";
import { Outlet } from "react-router-dom";
import useGetAxios from "../hooks/useGetAxios";

const DetailWeek = () => {
  let url = `https://api.openweathermap.org/data/2.5/forecast?q=Seoul&appid=${
    import.meta.env.VITE_APP_WEATHER
  }&units=metric`;
  const { data, isLoading, error } = useGetAxios(url);
  console.log(data, isLoading, error);
  if (data) {
    console.log(data.city.name);
  }

  return (
    <PageLayout>
      <Outlet />
      <div>주간 날씨 페이지</div>
    </PageLayout>
  );
};

export default DetailWeek;
