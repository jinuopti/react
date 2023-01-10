import './App.css';
import * as React from "react";
import {Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import SignInSide from "./pages/Signin";
import {KakaoRedirectHandler} from "./login/KakaoButton";
import {NaverRedirectHandler} from "./login/NaverLogin";
import {createTheme, ThemeProvider} from "@mui/material/styles";

function App() {
  const theme = createTheme()

  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path={"/"} element={<Main/>}/>
          <Route path={"/login"} element={<SignInSide/>}/>
          <Route path={"/oauth/kakao"} element={<KakaoRedirectHandler/>}/>
          <Route path={"/oauth/naver"} element={<NaverRedirectHandler/>}/>
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App;
