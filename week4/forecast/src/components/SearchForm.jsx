import React, { useState } from "react";
import { styled } from "styled-components";

const SearchForm = () => {
  const [weatherRange, setWeatherRange] = useState("");
  const [weatherArea, setWeatherArea] = useState("");

  const handleRangeChange = (e) => {
    console.log(e.target.value);
    const selectedRange = e.target.value;
    setWeatherRange(selectedRange);
  };

  const handleAreaChange = (e) => {
    console.log(e.target.value);
    setWeatherArea(e.target.value);
  };

  console.log(weatherArea, weatherRange);

  return (
    <St.FormWrapper>
      <St.SearchFormArea>
        <St.SearchSelectBox onChange={handleRangeChange}>
          <option value="오늘">오늘</option>
          <option value="주간">주간</option>
        </St.SearchSelectBox>
        <St.SearchInput
          placeholder="영어로 도시명 ex)seoul"
          value={weatherArea}
          onChange={handleAreaChange}
        />
        <St.SearchBtn type="submit">날씨 검색</St.SearchBtn>
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
    gap: 1rem;
  `,

  SearchFormArea: styled.form`
    display: flex;
    gap: 1rem;
  `,

  SearchSelectBox: styled.select`
    padding: 0.3rem;
    border: 0.3rem solid ${({ theme }) => theme.colors.borderGrey};
    border-radius: 1rem;
    text-align: center;
  `,

  SearchInput: styled.input`
    padding: 1rem;
    background-color: ${({ theme }) => theme.colors.formInputBlue};
    border: none;
    border-radius: 1rem;
    text-align: center;
  `,
  SearchBtn: styled.button`
    background-color: ${({ theme }) => theme.colors.formBtnBlue};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    border-radius: 1rem;
  `,
};
