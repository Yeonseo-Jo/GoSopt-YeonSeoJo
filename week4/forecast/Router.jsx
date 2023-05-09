import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./src/pages/Home";
import Day from "./src/pages/Day";
import Week from "./src/pages/Week";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/day" element={<Day />} />
        <Route path="/week" element={<Week />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
