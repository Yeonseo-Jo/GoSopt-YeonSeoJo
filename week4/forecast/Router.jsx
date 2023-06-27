import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailWeather from "./src/pages/DetailWeather";
import ErrorPage from "./src/pages/ErrorPage";
import Home from "./src/pages/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route
            path="/:weatherRange/:weatherArea"
            element={<DetailWeather />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
