import {useEffect, useState} from "react";
import * as React from "react";
import {useNavigate} from "react-router";
import {useLocalStorage} from "../hooks/useLocalStorage";
import axios from "axios";
import {LOGIN_URL} from "../configs/Url";
import {LilpopLoginRequest} from "./LilpopLogin";

const jsKey = "269452c2c061a2bece2fd47cbdaabe63";
const restApiKey = "d53cdf809c405924e3997a0729a8ef66"
const redirUrl = "http://localhost:3000/oauth/kakao"
const logoutRedirUrl = "http://localhost:3000"

let accessToken
let payload

export const KakaoLogout = () => {
  axios.post(
    'https://kapi.kakao.com/v1/user/logout',
    {
      "target_id_type": "user_id",
      "target_id": `${payload.sub}`,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${accessToken}`,
      },
    }
  )
    .then(res => {
      console.log("kakao logout success: ", res)
    })
    .catch(err => {
      console.log("Err: ", err)
    })
}

export const KakaoLogoutWithRedirect = () => {
  axios.get(
    `https://kauth.kakao.com/oauth/logout?client_id=${restApiKey}&logout_redirect_uri=${logoutRedirUrl}`
  ).then(res => {
    console.log("logout res: ", res)
  }).catch(err => {
    console.log("logout err: ", err)
  })
}

export const KakaoRedirectHandler = () => {
  const navigate = useNavigate()

  useEffect(() => {
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get("code");
    let grant_type = "authorization_code";
    let client_id = "d53cdf809c405924e3997a0729a8ef66";
    let baseUrl = "http://localhost:3000"
    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${baseUrl}/oauth/kakao&code=${code}`,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((res) => {
        console.log("res: ", res);
        accessToken = res.data.access_token
        const base64Url = res.data.id_token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        payload = JSON.parse(jsonPayload)
        console.log("payload: ", payload)
        console.log("kakao access token: ", accessToken)
        LilpopLoginRequest("kakao", accessToken)
      })
      .catch((err) => {
        console.log("Err: ", err)
      });
  }, []);

  return (
    <>
      {navigate("/")}
    </>
  )
};

const KakaoButton = ({props}) => {
  useEffect(() => {
    console.log("KakaoButton useEffect")
  }, [])

  return (
    <>
      <a href={`https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirUrl}&response_type=code`}>
        <img src="images/kakao_login_medium_narrow.png" alt="카카오 로그인"/>
      </a>
    </>
  )
}

export default KakaoButton;