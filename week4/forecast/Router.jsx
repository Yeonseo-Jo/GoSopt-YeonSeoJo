import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./src/pages/Home";
import DetailDay from "./src/pages/DetailDay";
import DetailWeek from "./src/pages/DetailWeek";
import DetailDayInfo from "./src/components/DetailDayInfo";
import DetailWeekInfo from "./src/components/DetailWeekInfo";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/day" element={<DetailDay />}>
          <Route path=":weatherArea" element={<DetailDayInfo />} />
        </Route>
        <Route path="/week" element={<DetailWeek />}>
          <Route path=":weatherArea" element={<DetailWeekInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
