import styled from "styled-components";

export const Header = () => {
  return (
    <>
      <StHeaderContainer>
        <StTitle>💖 앙꼬를 맞춰주세요 💖</StTitle>
        <StScore>0/5</StScore>
      </StHeaderContainer>
    </>
  );
};

export default Header;

const StHeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  width: 100%;
  height: 25vh;
  background-color: ${({ theme }) => theme.colors.lightPurple};
`;

const StTitle = styled.h1`
  margin-bottom: 1.5rem;
  font-size: 6rem;
  color: ${({ theme }) => theme.colors.purple};
`;

const StScore = styled.h3`
  font-size: 5rem;
  color: ${({ theme }) => theme.colors.purple};
`;
