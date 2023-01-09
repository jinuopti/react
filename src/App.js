import './App.css';
import * as React from "react";
import {Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import SignInSide from "./pages/Signin";
import {KakaoRedirectHandler} from "./login/KakaoButton";
import {NaverRedirectHandler} from "./login/NaverLogin";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Main/>}/>
        <Route path={"/login"} element={<SignInSide/>}/>
        <Route path={"/oauth/kakao"} element={<KakaoRedirectHandler/>}/>
        <Route path={"/oauth/naver"} element={<NaverRedirectHandler/>}/>
      </Routes>
    </>
  )
}

export default App;
