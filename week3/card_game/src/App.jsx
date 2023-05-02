import styled, { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import { GlobalStyle } from "./styles/GlobalStyle";
import Header from "./components/Header";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <StContainer>
        <Header />
      </StContainer>
    </ThemeProvider>
  );
}

const StContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.lightYellow};
`;

export default App;
