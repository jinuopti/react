import './App.css';
import SignInSide from "./pages/Signin";
import * as React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import KakaoRedirectHandler from "./login/KakaoRedirect";
import KakaoLoginComplete from "./login/KakaoLoginComplete";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<SignInSide/>}/>
                <Route path={"/oauth/kakao"} element={<KakaoRedirectHandler/>}/>
                <Route path={'/login/oauth'} element={<KakaoLoginComplete/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
