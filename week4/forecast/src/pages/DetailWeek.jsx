import React from "react";
import PageLayout from "../components/PageLayout";
import { Outlet } from "react-router-dom";

const DetailWeek = () => {
  return (
    <PageLayout>
      <Outlet />
      <div>주간 날씨 페이지</div>
    </PageLayout>
  );
};

export default DetailWeek;
