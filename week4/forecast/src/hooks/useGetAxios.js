import React, { useEffect, useState } from "react";
import axios from "axios";

const useGetAxios = (url) => {
  // axios로 api 값을 get하는 custom hook

  // 받아온 데이터를 저장하는 state
  const [data, setData] = useState(null);
  // 로딩 중 플래그 state
  const [isLoading, setIsLoading] = useState(true);
  // 에러 저장 state.
  const [error, setError] = useState(null);

  // 데이터 받아오는 함수 try로 데이터를 받고, 없으면 catch문에서 error 넘겨준다.
  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  // hook에 url이 들어올 때마다 실행한다
  useEffect(() => {
    setData(null);
    setIsLoading(true);
    setError("");
    fetchData();
  }, [url]);

  // axios로 get한 api data, 로딩 중 플래그, 에러를 반환한다.
  return { data, isLoading, error };
};

export default useGetAxios;
