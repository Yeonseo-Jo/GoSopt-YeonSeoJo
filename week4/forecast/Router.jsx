import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./src/pages/Home";
import DetailDay from "./src/pages/DetailDay";
import DetailWeek from "./src/pages/DetailWeek";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/day" element={<DetailDay />} />
        <Route path="/week" element={<DetailWeek />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
