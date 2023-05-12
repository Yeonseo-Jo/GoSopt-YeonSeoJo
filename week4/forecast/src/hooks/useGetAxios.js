import React, { useEffect, useState } from "react";
import axios from "axios";

const useGetAxios = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setData(null);
    setIsLoading(true);
    setError("");
    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useGetAxios;
