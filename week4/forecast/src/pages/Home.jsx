import React from "react";
import { Outlet } from "react-router-dom";
import PageLayout from "../components/common/PageLayout";

const Home = () => {
  // 기본 홈이 되는 페이지
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
};

export default Home;
