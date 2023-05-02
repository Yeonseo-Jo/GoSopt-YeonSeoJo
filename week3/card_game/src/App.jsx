import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import { GlobalStyle } from "./styles/GlobalStyle";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <Main />
    </ThemeProvider>
  );
}

export default App;
