import React, { useRef, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  // day or week 검색 범위를 저장하는 state
  // const [weatherRange, setWeatherRange] = useState();
  const selectRef = useRef();
  // // 검색할 지역을 저장하는 state
  // const [weatherArea, setWeatherArea] = useState("");
  const inputRef = useRef();

  const navigate = useNavigate();

  // select 박스 option 선택 시 검색 범위 변경
  // const handleRangeChange = (e) => {
  //   // setWeatherRange(e.target.value);
  // };

  // input으로 지역 검색 시 지역 변경
  // const handleAreaChange = (e) => {
  //   setWeatherArea(e.target.value);
  // };

  // 검색 버튼 클릭시 해당되는 페이지로 이동
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const weatherArea = inputRef.current.value;
    const weatherRange = selectRef.current.value;
    if (weatherRange && weatherArea)
      navigate(`/${weatherRange}/${weatherArea}`);
  };

  return (
    <St.FormWrapper>
      <St.SearchFormArea>
        <St.SearchSelectBox name="weatherRange" ref={selectRef}>
          <option value="day">오늘</option>
          <option value="week">주간</option>
        </St.SearchSelectBox>
        <St.SearchInput
          placeholder="영어로 도시명 ex)seoul"
          ref={inputRef}
          vlaue={inputRef}
        />
        <St.SearchBtn type="submit" onClick={handleSubmitForm}>
          날씨 검색
        </St.SearchBtn>
      </St.SearchFormArea>
    </St.FormWrapper>
  );
};

export default SearchForm;

const St = {
  FormWrapper: styled.section`
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 2rem;
  `,

  SearchFormArea: styled.form`
    display: flex;
    gap: 1rem;
  `,

  SearchSelectBox: styled.select`
    padding: 0.3rem;
    border: 0.3rem solid ${({ theme }) => theme.colors.lightPink};
    border-radius: 1rem;
    font-size: 1.8rem;
    font-weight: ${({ theme }) => theme.fontWeights.light};
    text-align: center;
  `,

  SearchInput: styled.input`
    padding: 1rem;
    background-color: ${({ theme }) => theme.colors.darkerBlue};
    border: none;
    border-radius: 1rem;
    font-size: 3rem;
    ${({ theme }) => theme.fontWeights.normal};
    text-align: center;
  `,
  SearchBtn: styled.button`
    padding: 1rem;
    background-color: ${({ theme }) => theme.colors.darkestBlue};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    border-radius: 1rem;
    font-size: 3rem;
    font-weight: ${({ theme }) => theme.fontWeights.normal};
  `,
};
