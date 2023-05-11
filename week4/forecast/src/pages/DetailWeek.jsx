import React, { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import { Outlet, useParams } from "react-router-dom";

const DetailWeek = () => {
  // if (data) {
  //   const tempData = data.list.filter((target) =>
  //     target.dt_txt.includes("12:00:00")
  //   );
  //   // console.log(tempData);
  //   const testData = tempData.map((data) => data.dt_txt);
  //   // setWeekData(testData);
  //   console.log(testData);
  // }

  return (
    <PageLayout>
      <Outlet />
      <div>주간 날씨 페이지</div>
    </PageLayout>
  );
};

export default DetailWeek;
