import React, { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const [weatherRange, setWeatherRange] = useState("day");
  const [weatherArea, setWeatherArea] = useState("");

  const navigate = useNavigate();

  const handleRangeChange = (e) => {
    setWeatherRange(e.target.value);
  };

  const handleAreaChange = (e) => {
    setWeatherArea(e.target.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    navigate(`/${weatherRange}/${weatherArea}`);
  };

  return (
    <St.FormWrapper>
      <St.SearchFormArea>
        <St.SearchSelectBox name="weatherRange" onChange={handleRangeChange}>
          <option value="day">오늘</option>
          <option value="week">주간</option>
        </St.SearchSelectBox>
        <St.SearchInput
          placeholder="영어로 도시명 ex)seoul"
          value={weatherArea}
          onChange={handleAreaChange}
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
