import React from "react";
import { Outlet } from "react-router-dom";
import PageLayout from "../components/PageLayout";

const DetailDay = () => {
  return (
    <PageLayout>
      <Outlet />
      <div>일간 날씨 페이지</div>
    </PageLayout>
  );
};

export default DetailDay;
