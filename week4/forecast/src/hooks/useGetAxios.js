import axios from "axios";

import { useEffect } from "react";
import { useReducer } from "react";

// async-await로 비동기로 받아 온 값을 state에 넣으면 값을 제대로 받아올 수 없으므로, reducer를 사용해 전역으로 api 통신 시 필요한 데이터의 상태를 관리한다!!
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

// axios로 data 받아와서 통신 상태 및 데이터를 reducer로 보내준다
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

// 이 주석 처리 된 부분은 원래 제가 짰던 코드인데용,, 나중에 공부 용으로 남겨두기 위해 지우지 않겠습니다!
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
//  -> 문제점이었던 것: axios로 데이터가 받아와서 state에 저장되기 전, 원래 state 값이 여기서 먼저 return된다
// 그래서 처음 데이터를 불러왔을 때 null로 받아지고, 뷰에 데이터가 하나씩 밀려서 보여졌던 것 !!!
// -> 그래서 데이터로 통신한 값을 여기가 아닌 hook을 불러온 각 컴포넌트에서 관리를 해야 되는데,, 그럼 너무 중복되는 코드가 많아지고 비효율적이니 -> 서희 언니가 reducer로 전역 상태 관리를 하는 코드를 알려주었다!!
//   return { data, isLoading, error };
// };

// export default useGetAxios;
