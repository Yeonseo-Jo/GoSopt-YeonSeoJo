// import React, { useEffect, useState } from "react";
import axios from "axios";

import { useEffect } from "react";
import { useReducer } from "react";

// const useGetAxios = (url) => {
//   // axios로 api 값을 get하는 custom hook

//   // 받아온 데이터를 저장하는 state
//   const [data, setData] = useState(null);
//   // 로딩 중 플래그 state
//   const [isLoading, setIsLoading] = useState(true);
//   // 에러 저장 state.
//   const [error, setError] = useState(null);

//   // 데이터 받아오는 함수 try로 데이터를 받고, 없으면 catch문에서 error 넘겨준다.
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(url);
//       setData(response.data);
//     } catch (err) {
//       setError(err.message);
//     }
//     setIsLoading(false);
//   };

//   // hook에 url이 들어올 때마다 실행한다
//   useEffect(() => {
//     setData(null);
//     setIsLoading(true);
//     setError("");
//     fetchData();
//   }, [url]);

//   console.log(data);
//   // axios로 get한 api data, 로딩 중 플래그, 에러를 반환한다.
//   return { data, isLoading, error };
// };

// export default useGetAxios;

const reducer = (state, action) => {
  switch (action.type) {
    case "loding":
      return { ...state, isLoding: true };
    case "success":
      return { isLoding: false, isError: false, data: action.data };
    case "error":
      return { isLoding: false, isError: true, data: action.error };
  }
};
const useGetAxios = (url) => {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    isLoding: false,
    isError: null,
  });
  console.log(url);

  const fetchData = async () => {
    dispatch({ type: "loading" });
    try {
      const response = await axios.get(url);
      dispatch({ type: "success", data: response.data });
    } catch (err) {
      dispatch({ type: "error", data: err });
    }
  };
  useEffect(() => {
    fetchData();
  }, [url]);
  return state;
};

export default useGetAxios;
