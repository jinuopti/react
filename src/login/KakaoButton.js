import {useEffect, useState} from "react";
import * as React from "react";

const {Kakao} = window;

//const getCodeUrl = "/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code"

const KakaoButton = ({onSocial}) => {
  const jsKey = "269452c2c061a2bece2fd47cbdaabe63";

  const initKakao = () => {
    console.log("kakao: ", Kakao.isInitialized(), Kakao)
    if (Kakao && !Kakao.isInitialized()) {
      Kakao.init(jsKey);
      if (Kakao.isInitialized()) {
        console.log("Kakao Inited");
      }
    }
  };

  useEffect(() => {
    console.log("KakaoButton useEffect")
    initKakao()
  }, [])

  const kakaoLogin = () => {
    Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000/oauth/kakao',
    });
  };

  return (
    <>
      <img src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
           width="222" height="50" alt="카카오 로그인" className="btnLink" onClick={kakaoLogin}/>
    </>
  )
}

export default KakaoButton;